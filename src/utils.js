const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const shuffleString = (str) => {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
};

export const randomLetter = () => {
  const index = Math.floor(Math.random() * alphabet.length);
  return alphabet[index];
};

export const randomDistinctLetters = (count) => {
  const input = shuffleString(alphabet);
  return input.substring(0, count).split("");
};
