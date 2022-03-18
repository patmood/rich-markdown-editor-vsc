import * as vscode from "vscode"

import { RichMarkdownEditor } from "./richMarkdownEditor"

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(RichMarkdownEditor.register(context))
}
