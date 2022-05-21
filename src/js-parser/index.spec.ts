import { unwrapFunctionBody } from "./index";

describe("Function unwrapper", () => {
  test('Should unwrap "fat" function', async () => {
    function FatFn() {
      console.log("Test");
    }

    const unwrappedFnStr = unwrapFunctionBody(FatFn.toString());

    expect(unwrappedFnStr).not.toContain("() =>");
    expect(unwrappedFnStr).toContain('console.log("Test")');
  });

  test("Should unwrap implicit return arrow function", async () => {
    const Implicit = () => console.log("Test");

    const unwrappedFnStr = unwrapFunctionBody(Implicit.toString());

    expect(unwrappedFnStr).not.toContain("function");
    expect(unwrappedFnStr).toContain('console.log("Test")');
  });

  test("Should unwrap explicit return arrow function", async () => {
    const Explicit = () => {
      console.log("Test");
    };

    const unwrappedFnStr = unwrapFunctionBody(Explicit.toString());

    expect(unwrappedFnStr).not.toContain("() =>");
    expect(unwrappedFnStr).toContain('console.log("Test")');
  });
});
