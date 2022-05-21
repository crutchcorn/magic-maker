import React from "react";

export interface ScriptProps {
  contents: string;
}

export const BodyScript: React.FC<ScriptProps> = ({ contents }) => {
  return <script data-location="body" dangerouslySetInnerHTML={{ __html: contents }} />;
};

export const HeadScript: React.FC<ScriptProps> = ({ contents }) => {
  return <script data-location="head" dangerouslySetInnerHTML={{ __html: contents }} />;
};
