import React, { useEffect, useState } from "react"

import Editor from "rich-markdown-editor"
import { debounce } from "../utils"
import { vsCodeTheme } from "./theme"

export function App({ vscode }: { vscode: any }) {
  const defaultValue = vscode.getState()?.text
  const [value, setValue] = useState(defaultValue)

  const handleChange = debounce((getVal: () => string) => {
    const text = getVal()
    vscode.setState({ text })
    vscode.postMessage({
      type: "add",
      text,
    })
  }, 300)

  useEffect(() => {
    function messageHandler(event: MessageEvent) {
      const message = event.data // The json data that the extension sent
      const currentText = vscode.getState()?.text
      const { type, text } = message
      switch (type) {
        case "update":
          // NOTE: if prettier is enabled, this will likely be triggered each save
          if (text !== currentText) {
            console.log("update")
            vscode.setState({ text })
            setValue(text)
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
        autoFocus
      />
    </div>
  )
}
