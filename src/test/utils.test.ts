import {
  getNonce,
  markdownToOutline,
  outlineToMarkdown,
  stripSlashes,
} from "../utils"

import { FIXTURES } from "./fixtures"

for (const name in FIXTURES) {
  const content = FIXTURES[name]
  it(`"${name}" markdown should convert to outline and back`, () => {
    expect(outlineToMarkdown(markdownToOutline(content))).toEqual(content)
  })
}

it("generates a reasonable nonce", () => {
  const nonce = getNonce()
  expect(nonce.length).toBe(32)
})
