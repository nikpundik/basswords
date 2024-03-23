import {
  shuffleString,
  randomLetter,
  randomDistinctLetters,
  shuffleArray,
} from "./utils";

export const short = {
  name: "Hey shorty",
  length: 5,
  check: function (password) {
    return Math.min(Math.round((password.length / this.length) * 100), 100);
  },
  generate: function () {
    let randomString = "";
    for (let i = 0; i < this.length; i++) {
      randomString += randomLetter();
    }
    return randomString;
  },
  strict: false,
};

export const twoVowel = {
  name: "Vo-Vo-Voweeels",
  length: 2,
  check: function (password) {
    const vowelRegex = /[aeiou]/gi;
    const vowelCount = (password.match(vowelRegex) || []).length;
    const percentage =
      vowelCount >= this.length ? 100 : (vowelCount / this.length) * 100;
    return Math.min(Math.round(percentage), 100);
  },
  generate: function () {
    const alphabet = "aeiou";
    let randomString = "";
    for (let i = 0; i < this.length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomString += alphabet[randomIndex];
    }
    return randomString;
  },
  strict: false,
};

export const long = {
  name: "Not that short",
  length: 25,
  check: function (password) {
    return Math.min(Math.round((password.length / this.length) * 100), 100);
  },
  generate: function () {
    let randomString = "";
    for (let i = 0; i < this.length; i++) {
      randomString += randomLetter();
    }
    return randomString;
  },
  strict: false,
};

export const threeSameLetters = {
  name: "Three's company",
  length: 3,
  check: function (password) {
    const letters = password.split("");
    const counter = {};
    let max = 0;
    letters.forEach((letter) => {
      if (!counter[letter]) counter[letter] = 0;
      counter[letter] += 1;
      if (counter[letter] > max) max = counter[letter];
    });
    const percentage = Math.min((max / 3) * 100, 100);
    return Math.round(percentage);
  },
  generate: function () {
    let randomString = "";
    for (let i = 0; i < this.length; i++) {
      randomString += randomLetter().repeat(3);
    }
    return randomString;
  },
  strict: false,
};

export const space = {
  name: "I need SPACE",
  length: 5,
  check: function (password) {
    const letters = password.split("");
    let counter = 0;
    letters.forEach((letter) => {
      if (letter === " ") counter += 1;
    });
    const percentage = Math.min((counter / this.length) * 100, 100);
    return Math.round(percentage);
  },
  generate: function () {
    return " ".repeat(this.length);
  },
  strict: false,
};

export const symbolic = {
  name: "Stay symbolic",
  check: function (password) {
    const regex = /[^a-zA-Z0-9\s]/gi;
    const count = (password.match(regex) || []).length;
    const percentage = Math.min((count / 1) * 100, 100);
    return Math.round(percentage);
  },
  generate: function () {
    return String.fromCharCode(Math.floor(Math.random() * 15 + 33));
  },
  strict: false,
};

export const threeSameLettersCombo = {
  name: "Three's combo",
  length: 3,
  check: function (password) {
    const consecutiveRegex = /([a-zA-Z])\1{2,}/g;
    const consecutiveMatches = password.match(consecutiveRegex);
    const matches = consecutiveMatches ? consecutiveMatches.length : 0;
    const percentage = Math.min((matches / this.length) * 100, 100);
    return Math.round(percentage);
  },
  generate: function () {
    return randomDistinctLetters(this.length)
      .map((l) => l.repeat(3))
      .join("");
  },
  strict: true,
};

export const babyDigits = {
  name: "Baby digits",
  check: function (password) {
    const digits = "123456789";
    let found = "";
    for (let i = 0; i < digits.length; i++) {
      const digit = digits[i];
      if (password.includes(digit)) {
        found += digit;
      }
    }
    const percentage = (found.length / digits.length) * 100;
    return Math.round(percentage);
  },
  generate: function () {
    return shuffleString("123456789");
  },
  strict: false,
};

export const theSameCase = {
  name: "Same case",
  check: function (password) {
    const lowercase = password.match(/([a-z])/g);
    const lowerCounts = lowercase ? lowercase.length : 0;
    const uppercase = password.match(/([A-Z])/g);
    const upperCounts = uppercase ? uppercase.length : 0;
    const value = Math.abs(lowerCounts - upperCounts);
    const total = lowerCounts + upperCounts;
    if (total === 0) return 0;
    const percentage = Math.min(100 - (value / total) * 100, 100);
    return Math.round(percentage);
  },
  generate: function () {
    const length = Math.floor(Math.random() * 2 + 1);
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const randomCharCode = Math.floor(Math.random() * 25 + 65);
      randomString += String.fromCharCode(randomCharCode);
    }
    for (let i = 0; i < length; i++) {
      const randomCharCode = Math.floor(Math.random() * 25 + 97);
      randomString += String.fromCharCode(randomCharCode);
    }
    return shuffleString(randomString);
  },
  strict: false,
};

export const pointillism = {
  name: "Pointillism",
  length: 4,
  check: function (password) {
    const letters = password.split("");
    const counter = {};
    letters.forEach((letter) => {
      if (!counter[letter]) counter[letter] = 0;
      counter[letter] += 1;
    });
    const p1 = counter["."] || 0;
    const p2 = counter[":"] || 0;
    const total = p1 + p2;
    let percentage = p1 > 0 && p2 > 0 ? 50 : 0;
    percentage += Math.min((total / this.length) * 50, 50);
    return Math.round(percentage);
  },
  generate: function () {
    let result = ":.";
    for (let index = 2; index < this.length; index++) {
      result += Math.random() > 0.5 ? ":" : ".";
    }
    return shuffleString(result);
  },
  strict: false,
};

export const qwerty = {
  name: "Cliché",
  length: 6,
  check: function (password) {
    let max = 0;
    const pieces = ["q", "qw", "qwe", "qwer", "qwert", "qwerty"];
    pieces.forEach((s) => {
      if (password.includes(s)) {
        max = s.length;
      }
    });
    return Math.floor((max / this.length) * 100);
  },
  generate: function () {
    return "qwerty";
  },
  strict: true,
};

export const emojis = {
  name: ";-P ;-P",
  length: 2,
  data: [
    ":)",
    ":-)",
    ":D",
    ":-D",
    ";)",
    ";-)",
    ":P",
    ":-P",
    ";-P",
    ":o",
    ":O",
    ":(",
    ":-(",
    ":'(",
    ":,-(",
    ":/",
    ":-/",
    "B-)",
    "O.o",
    ">:)",
    ">:-)",
    ":*",
    ":-*",
    "<3",
  ],
  check: function (password) {
    let found = 0;
    for (let index = 0; index < this.data.length; index++) {
      const emoji = this.data[index];
      if (password.includes(emoji)) found += 1;
      if (found >= this.length) break;
    }
    return Math.floor((found / this.length) * 100);
  },
  generate: function () {
    const [e1, e2] = shuffleArray([...this.data]);
    return [e1, e2].join("");
  },
  strict: true,
};

export const palindrome = {
  name: "Racecar",
  check: function (password) {
    if (password.length < 5) return 0;
    function isPalindrome(str) {
      return str === str.split("").reverse().join("");
    }
    for (let i = 0; i < password.length; i++) {
      for (let j = i + 1; j <= password.length; j++) {
        const substring = password.slice(i, j);
        if (substring.length > 2 && isPalindrome(substring)) {
          return 100;
        }
      }
    }
    return 0;
  },
  generate: function () {
    const len = Math.floor(Math.random() * 2) + 3;
    let result = "";
    for (let index = 0; index < len; index++) {
      result += randomLetter();
    }
    result += result.split("").reverse().join("");
    return result;
  },
  strict: true,
};

export const email = {
  name: "So digital",
  check: function (password) {
    const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
    const containsEmail = emailRegex.test(password);
    return containsEmail ? 100 : 0;
  },
  generate: function () {
    const mlength = Math.floor(Math.random() * 2) + 2;
    const dlength = Math.floor(Math.random() * 2) + 2;
    return `${[...Array(mlength).keys()].map(() => randomLetter()).join("")}@${[
      ...Array(dlength).keys(),
    ]
      .map(() => randomLetter())
      .join("")}.${[0, 1].map(() => randomLetter()).join("")}`;
  },
  strict: true,
};
