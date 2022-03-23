import { markdownToOutline, outlineToMarkdown } from "../utils"

import { FIXTURES } from "./fixtures"

for (const name in FIXTURES) {
  const content = FIXTURES[name]
  it(`"${name}" markdown should convert to outline and back`, () => {
    expect(outlineToMarkdown(markdownToOutline(content))).toEqual(content)
  })
}
