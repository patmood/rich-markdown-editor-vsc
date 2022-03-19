import React, { useEffect, useState } from "react"

import Editor from "rich-markdown-editor"
import { vsCodeTheme } from "./theme"

const PLACEHOLDER = "Enjoy that new doc smell..."

export function App({ vscode }: { vscode: any }) {
  const defaultValue = vscode.getState()?.text
  const [value, setValue] = useState(defaultValue)

  function handleChange(getVal: () => string) {
    const text = getVal()
    vscode.setState({ text })
    vscode.postMessage({
      type: "add",
      text,
    })
  }

  useEffect(() => {
    function messageHandler(event: MessageEvent) {
      const message = event.data // The json data that the extension sent
      const currentText = vscode.getState()?.text
      const { type, text } = message
      switch (type) {
        case "update":
          // If the update came from another window, trigger editor rerender
          if (text !== currentText) {
            setValue(text)
            vscode.setState({ text })
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
        placeholder={PLACEHOLDER}
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
