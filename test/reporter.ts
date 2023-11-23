import { Transform, TransformCallback } from "node:stream";
import { TestEvent } from "node:test/reporters";
import { inspect } from "node:util";

type TestFailError = Error & {
  failureType: "testCodeFailure" | "subtestsFailed";
};

export default class Reporter extends Transform {
  constructor() {
    super({ writableObjectMode: true });
  }

  _transform(event: TestEvent, _encoding: BufferEncoding, callback: TransformCallback) {
    callback(null, this.#handleEvent(event));
  }

  #handleEvent(event: TestEvent) {
    const { type } = event;

    switch (type) {
      case "test:fail":
        return this.#handleTestFailed(event.data);
    }
  }

  #handleTestFailed(data: TestFail) {
    process.exitCode = 1;
    const error = data.details.error as TestFailError;
    if (error.failureType !== "subtestsFailed") {
      const stack = inspect(error.cause, { breakLength: Infinity, colors: true });
      return `${stack}\n`;
    }
  }
}
