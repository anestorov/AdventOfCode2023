const {getData, process, sumValid, validate}  = require("./lib.js");


//only 12 red cubes, 13 green cubes, and 14 blue cubes
let conditions = { red: 12, green: 13, blue: 14 }

let games = process(getData());
games = validate(games, conditions);
let answer = sumValid(games);

console.dir(games, { depth: 4 });
console.log("Answer:", answer);


