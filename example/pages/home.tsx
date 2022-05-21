import React, { useId } from "react";

import CSSComp from "../pageComponents/home.css";
import { BodyScript, HeadScript } from "../../src/components/script";
import useUniqueId from "../../src/hooks/useUniqueId";

const Home = () => {
  const id = useUniqueId();

  return (
    <>
      <CSSComp />
      <BodyScript
        contents={`
            const el = document.querySelector("#${id}");
            el.addEventListener('click', () => {
                alert("HELLO");
            })
        `}
      />
      <HeadScript
        contents={`
        alert("Test");
      `}
      />
      <h1 id={id}>Home</h1>
    </>
  );
};

export default Home;
