import React, { useId } from "react";

import CSSComp from "../pageComponents/home.css";
import { BodyScript, HeadScript } from "../../src/components/script";
import useUniqueId from "../../src/hooks/useUniqueId";
import { unwrapFunctionBody } from "../../src/js-parser";

function alertTest() {
  alert("Test");
}

function addHelloClickButton() {
  const el = document.querySelector(`#__ID__`);
  el!.addEventListener("click", () => {
    alert("HELLO");
  });
}

const Home = () => {
  const id = useUniqueId();

  return (
    <>
      <CSSComp />
      <BodyScript
        contents={unwrapFunctionBody(addHelloClickButton.toString()).replace(
          "__ID__",
          id
        )}
      />
      <HeadScript contents={unwrapFunctionBody(alertTest.toString())} />
      <h1 id={id}>Home</h1>
    </>
  );
};

export default Home;
