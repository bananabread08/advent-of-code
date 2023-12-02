import { getData } from '../getdata';

type Color = 'red' | 'blue' | 'green';
type Cube = {
  [K in Color]: number;
};

const limit: Cube = { red: 12, green: 13, blue: 14 };

function solve(file: string) {
  const games = getData(2, file).split('\n');
  return games.reduce((total, game, index) => {
    const bool = game
      .substring(game.indexOf(':') + 2)
      .split('; ')
      .every((set) => {
        const obj: Cube = { red: 0, blue: 0, green: 0 };
        return set.split(', ').every((cube) => {
          const split = cube.split(' ');
          const v = split[0];
          const k = split[1] as Color;
          obj[k] = { ...obj }[k] + parseInt(v);
          return limit.green >= obj.green && limit.red >= obj.red && limit.blue >= obj.blue;
        });
      });
    return bool ? (total = total + index + 1) : total;
  }, 0);
}

console.log(solve('test.txt'));
console.log(solve('input.txt'));
