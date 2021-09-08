import moment from "moment";

// let m = moment("2021-08-01T20:00:00");
// m = moment("20/6/2021", "DD/MM/YYY")

// console.log(m);
// console.log("ISO", m.toISOString());

//// GET  &  SET
let m = moment();

console.log(m.toString());
console.log(m.hours());
console.log(m.minutes());
console.log(m.days());
console.log(m.get("hours")); // dynamisk

//setters
