console.clear();
const Data = require("./Data.json");
console.log("Hello!");
console.log("Total Projects: " + Object.keys(Data).length);
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
const AllPRs = Object.values(Data).flat();
AllPRs.length = 5;
const UsersPRs = AllPRs.reduce(pr => {
  // Need to return a structure, that contains:
  // Username: [
  //   {
  //     PRLink:
  //     Label:
  //     Score:
  //   }
  // ]
}, {});
console.log(UsersPRs);
