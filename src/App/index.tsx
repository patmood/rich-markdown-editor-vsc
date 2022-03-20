import React, { useEffect, useState } from "react"

import Editor from "rich-markdown-editor"
import { debounce } from "../utils"
import { vsCodeTheme } from "./theme"

export function App({ vscode }: { vscode: any }) {
  const defaultValue = vscode.getState()?.text
  const [value, setValue] = useState(defaultValue)

  const updateDocument = debounce((text) => {
    vscode.postMessage({
      type: "add",
      text,
    })
  }, 200)

  function handleChange(getVal: () => string) {
    const text = getVal()
    vscode.setState({ text })
    updateDocument(text)
  }

  useEffect(() => {
    function messageHandler(event: MessageEvent) {
      const message = event.data // The json data that the extension sent
      const currentText = vscode.getState()?.text
      const { type, text } = message
      switch (type) {
        case "update":
          // The editor trims whitespace, but vscode may add trailing newlines
          // Trim to prevent re-renders
          if (text.trim() !== currentText.trim()) {
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
        onSave={() => console.log("save!")}
        autoFocus
      />
    </div>
  )
}
