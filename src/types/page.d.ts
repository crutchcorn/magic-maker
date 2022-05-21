import React from "react";

export interface Page {
  default: React.FC<unknown>;
  getStaticPaths?: () => { paths: string[] };
}
