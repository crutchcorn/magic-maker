/**
The following should be unwrapped to `console.log("Test");`:

```
function Test() {
    console.log("Test");
}
```

```
const Test = () => {
    console.log("Test");
}
```

```
const Test = () => console.log("Test");
```
 */

import babelParser from "@babel/parser";
import trav, { Node } from "@babel/traverse";
import gen from "@babel/generator";

// Typings are incorrect
const traverse =
  (trav as never as { default: never }).default ?? (trav as typeof trav);
const generate =
  (gen as never as { default: never }).default ?? (gen as typeof gen);

const unwrapErrMsg =
  "You must only call `unwrapFunctionBody` on `function.toString()` calls";

export const unwrapFunctionBody = (jsString: string) => {
  const ast = babelParser.parse(jsString);

  let fnBodyArr = [] as Node[];
  traverse(ast, {
    Program: {
      enter(path) {
        const program = path.node;
        if (!program.body.length) {
          throw new Error(unwrapErrMsg);
        }
        const fnNode = program.body[0];
        // Arrow function of some kind
        if (fnNode.type === "ExpressionStatement") {
          if (fnNode.expression.type === "ArrowFunctionExpression") {
            const arrowFnBody = fnNode.expression.body;
            if (arrowFnBody.type === "BlockStatement") {
              // () => {}
              fnBodyArr = arrowFnBody.body;
              return;
            } else {
              // () =>
              fnBodyArr = [arrowFnBody];
              return;
            }
          }
        }
        // function () {}
        if (fnNode.type === "FunctionDeclaration") {
          fnBodyArr = fnNode.body.body;
          return;
        }

        // Unrecognized
        throw new Error(unwrapErrMsg);
      },
    },
  });

  const astToGenerate: Node = {
    type: "Program",
    body: fnBodyArr,
  } as never;

  const { code } = generate(astToGenerate);

  return code;
};
