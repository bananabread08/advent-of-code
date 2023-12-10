import { getData } from '../getdata';

// a reimagined solution based on help threads online.

function getNextValueInRow(data: number[]) {
  let result = data[data.length - 1];
  while (!data.every((v) => v === 0)) {
    let prev = data[0];
    data = data.slice(1).map((next) => {
      const tmp = next - prev;
      prev = next;
      return tmp;
    });
    result += data.length > 0 ? data[data.length - 1] : 0;
  }
  return result;
}

function getTotal(data: number[][]) {
  return data.map(getNextValueInRow).reduce((acc, curr) => acc + curr, 0);
}

function parseInput(lines: string[]) {
  return lines.map((l) => l.split(' ').map((v) => parseInt(v)));
}

function solve(file: string) {
  const input = getData(9, file).split('\n');
  const data = parseInput(input);

  const part1 = getTotal(data);
  // do the same but in reverse to get total easier.
  const part2 = getTotal(data.map((arr) => arr.reverse()));
  return { part1, part2 };
}

console.log(solve('test.txt'));
console.log(solve('input.txt'));
