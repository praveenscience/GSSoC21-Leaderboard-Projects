const fs = require("fs");
const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const getOrdinalNum = n =>
  n +
  (n > 0
    ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
    : "");
const timeInIndia = new Date(new Date().getTime() + 270 * 60000);
const CurTime = `${getOrdinalNum(timeInIndia.getDate())} ${
  Months[timeInIndia.getMonth()]
} ${timeInIndia.getHours() % 12}:${("0" + timeInIndia.getMinutes()).slice(
  -2
)} ${timeInIndia.getHours() >= 12 ? "pm" : "am"} IST`;
console.log(CurTime);
fs.writeFileSync("./UpdatedTime.txt", CurTime);
