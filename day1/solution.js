const fs = require('fs');



function fixDigits(row) {
    
    row = row.replaceAll('one','o1e');
    row = row.replaceAll('two','t2o');
    row = row.replaceAll('three','t3e');
    row = row.replaceAll('four','f4r');
    row = row.replaceAll('five','f5e');
    row = row.replaceAll('six','s6x');
    row = row.replaceAll('seven','s7n');
    row = row.replaceAll('eight','e8t');
    row = row.replaceAll('nine','n9e');
    
    return row
}
function process(data) {
    let rows = data.split("\r\n");
    rows = rows.map(row=>{
        //console.log(row); one, two, three, four, five, six, seven, eight, and nine
    
        
        row = fixDigits(row);
        //console.log(row);
        let letters = row.split('');
        if(letters.length<=0) return 0;
            
        letters = letters.filter(letter => !isNaN(letter));
        if(letters.length == 1) letters.push(letters[0]);
        if(letters.length>2) letters = [letters[0], letters.pop()];
        //console.log(letters[0] * 10 + (letters[1] - 0));
        return letters[0] * 10 + (letters[1] - 0)
    })
    //console.log(rows);
    let ans = rows.reduce((acc,val)=>acc+val,0);
    console.log("Answer:",ans);
}


let data = fs.readFileSync(__dirname+'/input.txt');
process(data.toString());

    
