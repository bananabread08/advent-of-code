import { getFileData } from '../getdata';

/**
 * <========= strongest to weakest =======>
 * A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2
 * AAAAA
 * AAAAT
 * AAATT
 * AAAxy
 * AATTx
 * AAxyz
 * vwxyz
 */

interface IHash {
  [v: string]: number;
}

type TLine = [string, number, number];

const isFour = (hand: string, hash: IHash = {}) =>
  hand.split('').filter((v) => (hash[v] = (hash[v] || 0) + 1) === 4)[0];
const isThree = (hand: string, hash: IHash = {}) =>
  hand.split('').filter((v) => (hash[v] = (hash[v] || 0) + 1) === 3)[0];

const checkHandType = (hand: string) => {
  const cardSet = new Set(hand);
  switch (cardSet.size) {
    case 1:
      return 7;
    case 2: // can be AAAAx(6pts) or AAAxx(5pts)
      return isFour(hand) ? 6 : 5;
    case 3: // can be AAAxy(4pts) or xxyyz(3pts)
      return isThree(hand) ? 4 : 3;
    case 4:
      return 2;
    case 5:
      return 1;
    default:
      return 0;
  }
};

const sortByRank = (a: TLine, b: TLine) => {
  const ranks = '23456789TJQKA';
  if (a[2] !== b[2]) return a[2] - b[2];
  if (a[2] === b[2]) {
    for (let i = 0; i < 5; i++) {
      if (ranks.indexOf(a[0][i]) < ranks.indexOf(b[0].split('')[i])) return -1;
      else if (ranks.indexOf(a[0][i]) > ranks.indexOf(b[0].split('')[i])) return 1;
    }
  }
  return 0;
};

const parseLine = (line: string): TLine => {
  const [hand, bet] = line.split(' ');
  return [hand, +bet, checkHandType(hand)];
};

function solve(file: string) {
  const input = getFileData(file).split('\n').map(parseLine);
  const sorted = input.sort(sortByRank);
  return sorted.reduce((acc, curr, index) => acc + curr[1] * (index + 1), 0);
}

console.log(solve('input.txt'));
