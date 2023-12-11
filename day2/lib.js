const fs = require('fs');

function process(data) {
    let rows = data.split("\r\n");

    rows = rows.map(row => {
        let vals = row.split(':');
        let plays = vals[1].split(';');

        plays = plays.map(game => {
            let elms = game.trim().split(',').map(elm => {
                let vals = elm.trim().split(' ');
                let res = {};
                res[vals[1]] = vals[0].trim() - 0;
                return res;
            });
            let res = elms.reduce((acc, val) => {
                let key = Object.keys(val)[0];
                acc[key] = val[key];
                return acc;
            }, {});
            return res;
        });

        return {
            id: vals[0].split(' ')[1] - 0,
            name: vals[0],
            plays,
        };
    })
    return rows;
}

function validate(games, conditions) {
    games.map(game => {
        let valid = game.plays.reduce((acc, play) => {
            if (play.red > conditions.red) return false;
            if (play.green > conditions.green) return false;
            if (play.blue > conditions.blue) return false;
            return acc;
        }, true);
        game['valid'] = valid;
        return game;
    });
    return games;
}

function sumValid(games) {
    return games.reduce((acc, game) => {
        if (game.valid) acc += game.id;
        return acc;
    }, 0);
}

function getData() {
    let data = fs.readFileSync(__dirname + '/input.txt');
    return data.toString();
}

function calcMinCubes(games) {
    games.map(game => {
        let red = 0;
        let green = 0;
        let blue = 0;

        game.plays.forEach(play => {
            if(play.red>0) red = Math.max(red, play.red);
            if(play.green>0) green = Math.max(green, play.green);
            if(play.blue>0) blue = Math.max(blue, play.blue);
        });

        game['power'] = red * green * blue;
        return game;
    });
    return games;
}

function sumPowers(games) {
    return games.reduce((acc, game) => {
        acc += game.power;
        return acc;
    }, 0);
}

module.exports = {process, validate, sumValid, getData, calcMinCubes, sumPowers}