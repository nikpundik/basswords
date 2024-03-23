import {
  short,
  twoVowel,
  long,
  threeSameLetters,
  threeSameLettersCombo,
  symbolic,
  space,
  theSameCase,
  babyDigits,
  pointillism,
  qwerty,
  emojis,
  email,
} from "./rules";

export const levels = [
  {
    index: 1,
    rules: [short],
  },
  {
    index: 2,
    rules: [short, twoVowel],
  },
  {
    index: 3,
    rules: [long, threeSameLetters],
  },
  {
    index: 4,
    rules: [babyDigits, theSameCase],
  },
  {
    index: 5,
    rules: [space, symbolic, threeSameLettersCombo],
  },
  {
    index: 6,
    rules: [pointillism, qwerty, emojis],
  },
  {
    index: 7,
    rules: [
      babyDigits,
      threeSameLetters,
      space,
      symbolic,
      qwerty,
      pointillism,
      email,
    ],
  },
];
