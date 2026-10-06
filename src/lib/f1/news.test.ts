import { describe, expect, it } from "vitest";

import { decodeEntities } from "./news";

describe("decodeEntities", () => {
  it("decodes numeric entities in the FIA headline fixture", () => {
    expect(decodeEntities("FIA explain &#8220;unprecedented&#8221; glitch")).toBe(
      "FIA explain \u201Cunprecedented\u201D glitch",
    );
  });

  it("decodes hex numeric entities and nbsp", () => {
    expect(decodeEntities("a&#x2014;b&nbsp;c")).toBe("a—b c");
  });

  it("keeps the named entities working", () => {
    expect(decodeEntities("a &amp; b &lt;c&gt;")).toBe("a & b <c>");
  });
});
