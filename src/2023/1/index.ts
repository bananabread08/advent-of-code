import { getData } from '../getdata';

// oneight1 => 181
// twoneight => 218

// const arr = getData(1, 'input.txt').split('\n');
// export default function partOne(inputArray: string[]): number {
//   return inputArray
//     .map((line) => {
//       const match = line.match(/\d/g);
//       return match ? parseInt(match[0] + match[match.length - 1]) : 0;
//     })
//     .reduce((a, b) => a + b, 0);
// }

// console.log(partOne(arr));

function solve(file: string) {
  const arr = getData(1, file).split('\n');

  const digitWords = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];

  const getFirstAndLastValue = (line: string) => {
    const digits = line
      .split('')
      .map((char, idx) => {
        if (parseInt(char)) return parseInt(char);
        // if(!partTwo) return;
        return (
          digitWords.findIndex((word) => line.slice(idx).startsWith(word)) + 1
        );
      })
      .filter((x) => x);
    return parseInt(`${digits[0]}${digits.at(-1)}`);
  };

  return arr
    .map((line) => {
      return getFirstAndLastValue(line);
    })
    .reduce((a, b) => a + b, 0);
}

console.table(solve('input.txt'));
