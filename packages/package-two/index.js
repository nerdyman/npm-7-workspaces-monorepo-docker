import set from "lodash/set";

const obj = {};

set(obj, "deep.nested", { sup: "dawg" });

console.log("package two", obj);
