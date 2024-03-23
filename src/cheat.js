import { shuffleArray } from "./utils";

export const cheat = (level) => {
  const stricts = level.rules
    .filter((rule) => rule.strict)
    .map((rule) => rule.generate());
  const others = level.rules
    .filter((rule) => !rule.strict)
    .map((rule) => rule.generate())
    .join("")
    .split("");
  const result = others.concat(stricts);
  shuffleArray(result);
  return result.join("");
};
