import React from "react";

declare module "*.css" {
    declare const Comp: React.FC<never>;
    export default Comp;
}
