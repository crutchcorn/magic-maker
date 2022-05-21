import React from "react";

const Props = () => {
  return <h1>Props</h1>;
};

export default Props;

export function getStaticPaths() {
  return {
    paths: ["test", "testing"],
  };
}
