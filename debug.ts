import { unwrapFunctionBody } from "./src/js-parser";

const one = () => {
  console.log("one");
};

const two = () => console.log("two");

function three() {
  console.log("three");
}

console.log(unwrapFunctionBody(one.toString()));
console.log(unwrapFunctionBody(two.toString()));
console.log(unwrapFunctionBody(three.toString()));
