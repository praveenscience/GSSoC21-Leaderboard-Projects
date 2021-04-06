console.clear();
const Data = require("./Data.json");
console.log("Hello!");
console.log("Total Projects: " + Object.keys(Data).length);
console.log(Data[Object.keys(Data)[0]][0].labels);
const score = {
  level0: 5,
  level1: 10,
  level2: 25,
  level3: 45
};
const need = Object.keys(score);
const calcScore = labels => {
  labels = labels.map(l => l.name.toLowerCase()).sort();
  return score[labels.filter(value => need.includes(value))[0]];
};
console.log("Score of PR: " + calcScore(Data[Object.keys(Data)[0]][0].labels));
