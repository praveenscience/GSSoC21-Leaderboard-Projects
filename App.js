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
