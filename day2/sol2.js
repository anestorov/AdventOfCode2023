const {getData, process, calcMinCubes, sumPowers}  = require("./lib.js");


let games = process(getData());
games = calcMinCubes(games);
let answer = sumPowers(games);


console.dir(games, { depth: 4 });
console.log("Answer:", answer);

