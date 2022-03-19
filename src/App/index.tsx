import React, { useEffect, useState } from "react"

import Editor from "rich-markdown-editor"

export function App({ vscode }: { vscode: any }) {
  const { text: defaultValue } = vscode.getState()
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
      const { text: currentText } = vscode.getState()
      const { type, text: newText } = message
      switch (type) {
        case "update":
          // If the update came from another window, trigger editor rerender
          if (newText !== currentText) {
            setValue(message.text)
            vscode.setState({ text: newText })
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
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
        onSave={() => console.log("save!")}
      />
    </div>
  )
}
