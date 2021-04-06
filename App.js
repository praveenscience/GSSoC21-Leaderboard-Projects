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
  return [
    labels.filter(value => need.includes(value))[0],
    score[labels.filter(value => need.includes(value))[0]]
  ];
};
const AllPRs = Object.values(Data).flat();
AllPRs.length = 5;
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
console.log(UsersPRs);
const UsersTable = Object.keys(UsersPRs).map(Username => ({
  Username,
  PRCount: UsersPRs[Username].length,
  Score: UsersPRs[Username].reduce((a, b) => a + +b.Score, 0)
}));
console.log(UsersTable.sort((a, b) => b.Score - a.Score));
