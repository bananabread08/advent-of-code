import { getFileData } from '../getdata';

type Color = 'red' | 'blue' | 'green';
type CubeSet = {
  [K in Color]: number;
};

function solve(file: string) {
  const limit: CubeSet = { red: 12, green: 13, blue: 14 };
  const games = getFileData(file).split('\n');
  return games.reduce((total, game, index) => {
    const resultPerGame = game
      .split(': ')[1]
      .split('; ')
      .map((set) => {
        const cube = set.split(', ');
        return cube.every((pull) => {
          const [count, color] = pull.split(' ') as [string, keyof CubeSet];
          return limit[color] >= +count;
        });
      })
      .every((s) => s);
    return resultPerGame ? (total = total + index + 1) : total;
  }, 0);
}

console.log(solve('test.txt'));
console.log(solve('input.txt'));
