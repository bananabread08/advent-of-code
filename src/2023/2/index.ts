import { getData } from '../getdata';

type Color = 'red' | 'blue' | 'green';
type Cube = {
  [K in Color]: number;
};

const limit: Cube = { red: 12, green: 13, blue: 14 };

// normalize data to make each game an array of Color
function normalizeGames(games: string[]) {
  return games.map((game) =>
    game
      .substring(game.indexOf(':') + 2)
      .split('; ')
      .map((set) => {
        const obj: Cube = { red: 0, blue: 0, green: 0 };
        set.split(', ').map((cube) => {
          const split = cube.split(' ');
          const v = split[0];
          const k = split[1] as Color;
          obj[k] = { ...obj }[k] + parseInt(v);
        });
        return obj;
      }),
  );
}

function solve(file: string) {
  const games = getData(2, file).split('\n');
  // return Game # if set is less than limit
  function getTotal(normalized: Cube[][]) {
    return normalized
      .map((games, index) =>
        games.every(
          (set) => limit.green >= set.green && limit.red >= set.red && limit.blue >= set.blue,
        )
          ? index + 1
          : 0,
      )
      .reduce((a, b) => a + b, 0);
  }

  return getTotal(normalizeGames(games));
}

function solvePartTwo(file: string) {
  const games = getData(2, file).split('\n');

  function getTotal(normalized: Cube[][]) {
    return normalized
      .map((games) => {
        return games.reduce((acc, set) => {
          let key: keyof Cube;
          for (key in set) {
            set[key] = set[key] >= acc[key] ? set[key] : acc[key];
          }
          return set;
        });
      })
      .reduce((total: number, set) => {
        total = total + set.blue * set.green * set.red;
        return total;
      }, 0);
  }

  return getTotal(normalizeGames(games));
}

console.log(solve('test.txt'));
console.log(solve('input.txt'));
console.log(solvePartTwo('test.txt'));
console.log(solvePartTwo('input.txt'));
