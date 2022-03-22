import { theme } from "rich-markdown-editor"

// Editor variables: https://github.com/outline/rich-markdown-editor/blob/main/src/styles/theme.ts
// VSCode variables: https://code.visualstudio.com/api/references/theme-color
// CSS variable naming: "var(--vscode-XXX)"
export const vsCodeTheme = {
  ...theme,
  link: "var(--vscode-textLink-foreground)",
  fontFamily: "var(--rich-markdown-editor-font-family)",
  fontFamilyMono: "var(--vscode-editor-font-family)",

  background: "var(--vscode-editor-background)",
  text: "var(--vscode-editor-foreground)",
  code: "var(--vscode-textPreformat-foreground)",
  cursor: "var(--vscode-editorCursor-foreground)",
  divider: "var(--vscode-editorRuler-foreground)",

  toolbarBackground: "var(--vscode-button-background)",
  toolbarHoverBackground: "var(--vscode-button-hoverBackground)",
  toolbarInput: "var(--vscode-button-secondaryForeground)",
  toolbarItem: "var(--vscode-button-foreground)",

  tableDivider: "var(--vscode-editorRuler-foreground)",
  tableSelected: "var(--vscode-editorRuler-foreground)",
  tableSelectedBackground: "var(--vscode-editor-wordHighlightBackground)",

  quote: "var(--vscode-textBlockQuote-background)",
  codeBackground: "var(--vscode-textCodeBlock-background)",
  codeBorder: "transparent",
  horizontalRule: "var(--vscode-editorRuler-foreground)",
  imageErrorBackground: "var(--vscode-textBlockQuote-background)",

  scrollbarBackground: "var(--vscode-scrollbarSlider-background)",
  // scrollbarThumb: colors.greyMid,
}
