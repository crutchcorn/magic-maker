import React, { useId } from "react";

import CSSComp from "../pageComponents/home.css";
import { BodyScript, HeadScript } from "../../src/components/script";
import useUniqueId from "../../src/hooks/useUniqueId";
import { unwrapFunctionBody } from "../../src/js-parser";

function alertTest() {
  alert("Test");
}

function addHelloClickButton(id: string) {
  // This doesn't work because `id` is transformed to a minified result (say, `t`), but is left within the template literal
  // When the function is stringified. This means that, without additional compiler work (like a webpack plugin), this
  // will never work as we expect it to.
  return () => {
    const el = document.querySelector(`#${id}`);
    el!.addEventListener("click", () => {
      alert("HELLO");
    });
  };
}

const Home = () => {
  const id = useUniqueId();

  return (
    <>
      <CSSComp />
      <BodyScript
        contents={unwrapFunctionBody(addHelloClickButton(id).toString())}
      />
      <HeadScript contents={unwrapFunctionBody(alertTest.toString())} />
      <h1 id={id}>Home</h1>
    </>
  );
};

export default Home;
