// import { getData } from '../getdata';

// type Color = 'red' | 'blue' | 'green';
// type Cube = {
//   [K in Color]: number;
// };

// function solvePartTwo(file: string) {
//   const games = getData(2, file).split('\n');
//   games
//     .map((game) => {
//       return game
//         .substring(game.indexOf(':') + 2)
//         .split('; ')
//         .map((set) => {
//           const obj: Cube = { red: 0, blue: 0, green: 0 };
//           set.split(', ').map((cube) => {
//             const split = cube.split(' ');
//             const v = split[0];
//             const k = split[1] as Color;
//             obj[k] = { ...obj }[k] + parseInt(v);
//           });
//           return obj;
//         });
//     })
//     .reduce((total: number, set) => {
//       total = total + set.blue * set.green * set.red;
//       return total;
//     }, 0);
// }

// console.log(solvePartTwo('test.txt'));
// console.log(solvePartTwo('input.txt'));
