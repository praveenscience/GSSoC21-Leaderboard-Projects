console.clear();
const fs = require("fs");
const Data = require("./Data.json");

console.log("GSSoC 21 Leaderboard Generator!");
console.log("--- Stats ---");
console.log("Total Eligible Projects: " + Object.keys(Data).length);

const score = {
  level0: 5,
  level1: 10,
  level2: 25,
  level3: 45
};

const levels = Object.keys(score);

const calcScore = labels => {
  labels = labels.map(l => l.name.toLowerCase()).sort();
  labels = labels.filter(value => levels.includes(value))[0];
  if (!labels) return ["No Label", 0];
  return [labels, score[labels]];
};

const AllPRs = Object.values(Data).flat();
console.log("Total Eligible PRs: " + AllPRs.length);


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


console.log("Total Users Contributed: " + Object.keys(UsersPRs).length);
console.log("--- Files ---");
console.log("Writing UsersPRs file...");


fs.writeFileSync("UsersPRs.json", JSON.stringify(UsersPRs));
console.log(
  "Successfully written " +
    JSON.stringify(UsersPRs).length +
    " bytes UsersPRs file."
);

const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
}

const UsersTable = Object.keys(UsersPRs).map(Username => ({
  Username,
  PRCount: UsersPRs[Username].length,
  Score: UsersPRs[Username].reduce((a, b) => a + +b.Score, 0),
  Levels: UsersPRs[Username].map(eachPr => eachPr["Label"]).filter(distinct).filter((ele) => {
    if(ele === "No Label") return false;
    else return true;
  })
}));


console.log("Writing UsersTable file...");

fs.writeFileSync(
  "UsersTable.json",
  JSON.stringify(UsersTable.sort((a, b) => {
    if(b.Score - a.Score > 0) return 1;
    else if(b.Score - a.Score < 0) return -1;
    else if(b.Score - a.Score === 0) {
      // get their levels array 
     if(b.Levels.length - a.Levels.length > 0) return 1;
     else if(b.Levels.length - a.Levels.length < 0) return -1;
     else if(b.Levels.length - a.Levels.length === 0) {
       // now check the number of PRs
       if(b.PRCount - a.PRCount > 0) return 1;
       else if(b.PRCount - a.PRCount < 0) return -1;
       else if(b.PRCount - a.PRCount === 0) {
         var a_name = a.Username.toLowerCase();
         var b_name = b.Username.toLowerCase();
         // compare on username - for now
         if(a_name < b_name) return -1;
         else if(a_name > b_name) return 1;
         else return 0;
       }
     }
    }
  }))
);


console.log(
  "Successfully written " +
    JSON.stringify(UsersTable.sort((a, b) => b.Score - a.Score)).length +
    " bytes UsersTable file."
);
