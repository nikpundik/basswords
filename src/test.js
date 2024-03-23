const symbolRegex = /[^a-zA-Z0-9\s]/gi;
for (let index = 33; index < 48; index++) {
  const match = String.fromCharCode(index).match(symbolRegex);
  console.log(String.fromCharCode(index), match);
}

for (let index = 65; index < 65 + 50; index++) {
  console.log(String.fromCharCode(index), index);
}
