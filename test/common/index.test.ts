import { helloWorld } from "@common/index";
import assert from "node:assert";
import { describe, it } from "node:test";

describe("helloWorld", () => {
    it("should return 'hello world'", () => {
        const result = helloWorld();
        assert.strictEqual(result, "hello world");
    });
});
