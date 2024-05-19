import prettier from "prettier/standalone"
import prettierMd from "prettier/parser-markdown"

const STRIP_SLASH_REG = new RegExp(/^\\$/gm)
const ADD_SLASH_REG = new RegExp(/^\n(\n+)/gm)
const NEW_LINE_REG = new RegExp(/\n/g)
const SLASH_REG = new RegExp(/\\/g)

export function getNonce() {
  let text = ""
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export function debounce(func: (...args: any) => any, timeout = 300) {
  let timer: NodeJS.Timeout | undefined
  return (...args: any) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
      func.apply(this, args)
    }, timeout)
  }
}

// https://github.com/outline/rich-markdown-editor/issues/532
// https://github.com/outline/rich-markdown-editor/blob/3540af9f811a687c46ea82e0274a6286181da4f2/src/nodes/Paragraph.ts#L30
export function outlineToMarkdown(outlineText = "") {
  return outlineText.replace(STRIP_SLASH_REG, "")
}

export function markdownToOutline(markdownText: string) {
  return markdownText.replace(ADD_SLASH_REG, (match, p1, offset, str) => {
    const newSegment = p1.replace(NEW_LINE_REG, "\\\n")
    return `\n${newSegment}`
  })
}

export function isBasicallySame(a = "", b = "") {
  // Remove slashes and trailing whitespace, normalize EOL-characters to compare outline and vanilla markdown strings
  return a.replace(SLASH_REG, "").replace(/\r\n/g, "\n").trim() === b.replace(SLASH_REG, "").replace(/\r\n/g, "\n").trim()
}

export function formatText(text = "") {
  return prettier.format(text, {
    parser: "markdown",
    plugins: [prettierMd],
  })
}
