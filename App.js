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
const UsersPRs = AllPRs.reduce((acc, pr) => {
  // Need to return a structure, that contains:
  // Username: [
  //   {
  //     PRTitle:
  //     PRLink:
  //     Label:
  //     Score:
  //   }
  // ]
  // Find if this user is already there.
  // Create an empty array if this user is not there.
  if (typeof acc[pr.user.login] === "undefined") {
    acc[pr.user.login] = [];
  }
  const PRTitle =
    pr.repository_url.replace("https://api.github.com/repos/", "") +
    "#" +
    pr.number +
    ": " +
    pr.title;
  acc[pr.user.login].push({ PRTitle });
  return acc;
}, {});
console.log(UsersPRs);
