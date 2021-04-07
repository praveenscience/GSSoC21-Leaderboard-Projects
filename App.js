console.clear();
const fs = require("fs");
const Data = require("./Data.json");
console.log("Null Valus Updater!");
const score = {
  level0: 5,
  level1: 10,
  level2: 25,
  level3: 45
};
const need = Object.keys(score);
const calcScore = labels => {
  labels = labels.map(l => l.name.toLowerCase()).sort();
  labels = labels.filter(value => need.includes(value))[0];
  if (!labels) return ["No Label", 0];
  return [labels, score[labels]];
};
const AllPRs = Object.values(Data).flat();
const UsersPRs = AllPRs.reduce((acc, pr) => {
  if (typeof acc[pr.user.login] === "undefined") {
    acc[pr.user.login] = [];
  }
  const PRTitle =
    pr.repository_url.replace("https://api.github.com/repos/", "") +
    "#" +
    pr.number +
    ": " +
    pr.title;
  const PRLink = pr.pull_request.html_url;
  const [Label, Score] = calcScore(pr.labels);
  acc[pr.user.login].push({ PRTitle, PRLink, Label, Score });
  return acc;
}, {});
console.log("--- Files ---");
const nullValues = [];
const UsersTable = Object.keys(UsersPRs).map(Username => {
  if (!UsersPRs[Username].reduce((a, b) => a + +b.Score, 0)) {
    nullValues.push(UsersPRs[Username].map(u => ({ Username, ...u })));
  }
  return {
    Username,
    PRCount: UsersPRs[Username].length,
    Score: UsersPRs[Username].reduce((a, b) => a + +b.Score, 0)
  };
});
console.log("Writing nullValues file...");
fs.writeFileSync("nullValues.txt", JSON.stringify(nullValues.flat()));
console.log(
  "Successfully written " +
    JSON.stringify(nullValues.flat()).length +
    " bytes nullValues file."
);
