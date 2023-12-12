
function getData() {
    let fs = require('fs');
    let data = fs.readFileSync(__dirname + '/input.txt');
    return data.toString();
}

function parseRows(data) {
    return data.split("\n");
} 

function getSymbolsMap(rows) {
    let symbolMap = {};

    rows.forEach((row,rowInd) => {
        let symbols = row.split("");
        symbols.forEach((symbol,colInd) => {
            if(symbol != '.' && isNaN(symbol)) {
                if(!symbolMap[rowInd]) symbolMap[rowInd] = {};
                symbolMap[rowInd][colInd] = symbol;
            }
        });
    });

    return symbolMap;
}

function processRows(rows,map) { 
    let digits = [];
    rows.forEach((row, rowInd) => {
        let p1=-1
        let p2=-1;

        let rowSymbols = row.split("");

        for(let i=0; i<rowSymbols.length; i++) {
            let symbol = rowSymbols[i];
            if(isNaN(symbol) || i == rowSymbols.length-1) { // is not digit
                if(p2>p1) {
                    p1 ++;
                    let valid = false;
                    if(map[rowInd] && map[rowInd][p1-1]) valid = true;
                    if(map[rowInd] && map[rowInd][p2+1]) valid = true;

                    for(let p=p1-1; p<=p2+1; p++) {
                        if(map[rowInd-1] && map[rowInd-1][p]) valid = true;
                        if(map[rowInd+1] && map[rowInd+1][p]) valid = true;
                    }

                    let digit = row.substring(p1,p2+1);
                    digits.push({
                        value: digit-0,
                        row: rowInd,
                        start: p1,
                        end: p2,
                        valid
                    });
                }
                p1 = i;
                p2 = i;
            } else {
                p2 = i;
            }
        }

    });

    return digits;
}


let rows = parseRows(getData());
let map = getSymbolsMap(rows);
let res = processRows(rows,map);
let answer = res.reduce((acc,val)=>{
    if(val.valid) return acc+val.value;
    else return acc;
},0);

console.dir(map[1],{depth: null});
console.dir(res,{depth: null});
console.log("Answer:",answer);