import React, { useEffect, useState } from "react"
import {
  debounce,
  isBasicallySame,
  markdownToOutline,
  outlineToMarkdown,
} from "../utils"

import Editor from "rich-markdown-editor"
import prettier from "prettier/standalone"
import prettierMd from "prettier/parser-markdown"
import { vsCodeTheme } from "./theme"

function formatText(text = "") {
  return prettier.format(text, {
    parser: "markdown",
    plugins: [prettierMd],
  })
}

export function App({ vscode }: { vscode: any }) {
  const defaultValue = vscode.getState()?.outlineText || ""
  const [value, setValue] = useState(defaultValue)

  const handleChange = debounce((getVal: () => string) => {
    const outlineText = getVal()

    const text = outlineToMarkdown(outlineText)
    const formattedText = formatText(text)
    vscode.setState({ outlineText })
    vscode.postMessage({
      type: "add",
      text: formattedText,
    })
  }, 200)

  useEffect(() => {
    function messageHandler(event: MessageEvent) {
      const message = event.data // The json data that the extension sent
      const currentText = vscode.getState()?.outlineText
      const { type, text } = message
      switch (type) {
        case "update":
          // NOTE: if this gets triggered, the editor will re-render and lose the cursor position
          // Try to avoid if possible
          if (
            !isBasicallySame(formatText(outlineToMarkdown(currentText)), text)
          ) {
            const outlineText = markdownToOutline(text)
            console.log("update")
            console.log({
              current: currentText?.trim(),
              newtext: outlineText?.trim(),
            })
            vscode.setState({ outlineText: outlineText })
            setValue(outlineText)
          }
          return
      }
    }
    // Handle messages sent from the extension to the webview
    window.addEventListener("message", messageHandler)
    return () => window.removeEventListener("message", messageHandler)
  }, [])

  return (
    <div style={{ padding: 40, maxWidth: 825, margin: "0 auto" }}>
      <Editor
        placeholder={"Blank canvas..."}
        theme={vsCodeTheme}
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
        onClickLink={(href) => {
          vscode.postMessage({
            type: "openLink",
            text: href
          })}
        }
        autoFocus
      />
    </div>
  )
}
