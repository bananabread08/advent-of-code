import { getData } from '../getdata';

// oneight1 => 181
// twoneight => 218

function solve(file: string, isPartTwo: boolean) {
  const arr = getData(1, file).split('\n');
  const digitWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  const getFirstAndLastValue = (line: string) => {
    const digits = line
      .split('')
      .map((char, idx) => {
        if (parseInt(char)) return parseInt(char);
        if (!isPartTwo) return;
        return digitWords.findIndex((word) => line.slice(idx).startsWith(word)) + 1;
      })
      .filter((x) => x);
    return parseInt(`${digits[0]}${digits.at(-1)}`);
  };

  return arr.map((line) => getFirstAndLastValue(line)).reduce((a, b) => a + b, 0);
}

console.table(solve('input.txt', true));
