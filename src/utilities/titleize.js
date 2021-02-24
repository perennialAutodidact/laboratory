export default (text) => {
  let res = [];
  for (let i = 0; i < text.length; i++) {
    if (i === 0) {
      res.push(text[i].toUpperCase());
    } else if (text[i - 1] === " ") {
      res.push(text[i].toUpperCase());
    } else {
      res.push(text[i]);
    }
  }
  return res.join("");
};
