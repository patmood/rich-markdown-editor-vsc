import { App } from "./App"
import React from "react"
import ReactDOM from "react-dom"

// @ts-expect-error cannot find name
const vscode = acquireVsCodeApi()

const el = document.getElementById("app")
ReactDOM.render(<App vscode={vscode} />, el)
