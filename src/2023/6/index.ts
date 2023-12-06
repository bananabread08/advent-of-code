import { getData } from '../getdata';

/**
 * t = max time, b = button hold time, d = distance.
 * Since velocity is just equal to the time the button is held,
 * we can assume that the formula is (t - b)(v) = d
 * which is derived from v = Δd / Δt
 *  v = t then (t-b)(t) = d
 */

const extractNums = (str: string) => [...str.matchAll(/\d+/g)].map((r) => parseInt(r[0]));

function getPossibleRecords(dist: number[]) {
  return (t: number, idx: number) => {
    const wins: number[] = [];
    for (let i = 0; i <= t; i++) {
      if (dist[idx] < (t - i) * i) {
        wins.push(idx);
      }
    }
    return wins.length;
  };
}

function solve(file: string) {
  const input = getData(6, file).split('\n');
  const [time, dist] = input.map((line) => extractNums(line));
  const part1 = time.map(getPossibleRecords(dist)).reduce((acc, curr) => acc * curr);
  const part2 = [parseInt(time.join(''))]
    .map(getPossibleRecords([parseInt(dist.join(''))]))
    .reduce((acc, curr) => acc * curr);

  return { part1, part2 };
}

console.log(solve('test.txt'));
console.log(solve('input.txt'));
