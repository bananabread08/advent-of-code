import { getData } from '../getdata';

function getMatches(card: string) {
  const extractNums = (str: string) => [...str.matchAll(/\d+/g)].map((r) => r[0]);
  const [left, right] = card.split(': ')[1].split(' | ');
  const winningNums = extractNums(left);
  return extractNums(right).filter((n) => winningNums.includes(n));
}

function solvePartOne(file: string) {
  const matches = getData(4, file).split('\n').map(getMatches);
  return matches.reduce((total, wins) => (wins.length ? total + 2 ** (wins.length - 1) : total), 0);
}

function solvePartTwo(file: string) {
  const lines = getData(4, file).split('\n');
  const copies = Array(lines.length).fill(1);
  return lines.map(getMatches).reduce((total, wins, idx) => {
    for (let i = 0; i < wins.length; i++) copies[i + idx + 1] += copies[idx];
    return total + copies[idx];
  }, 0);
}

console.log(solvePartOne('test.txt'));
console.log(solvePartOne('input.txt'));
console.log(solvePartTwo('test.txt'));
console.log(solvePartTwo('input.txt'));
