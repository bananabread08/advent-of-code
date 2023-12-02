import { getData } from '../getdata';

type Color = 'red' | 'blue' | 'green';
type CubeSet = {
  [K in Color]: number;
};

function solvePartTwo(file: string) {
  const games = getData(2, file).split('\n');
  return games.reduce((total, game) => {
    const max: CubeSet = { red: 0, blue: 0, green: 0 };
    game
      .split(': ')[1]
      .split('; ')
      .map((set) => {
        const cube = set.split(', ');
        return cube.map((pull) => {
          const [count, color] = pull.split(' ') as [string, keyof CubeSet];
          max[color] = max[color] >= parseInt(count) ? max[color] : parseInt(count);
        });
      });
    total = total + max.blue * max.green * max.red;
    return total;
  }, 0);
}

console.log(solvePartTwo('test.txt'));
console.log(solvePartTwo('input.txt'));
