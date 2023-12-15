import { getFileData } from '../getdata';

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

function checkHandType2(hand: string) {
  if (hand.indexOf('J') > -1) {
    return Math.max(
      ...[...new Set(hand)].map((letter) => checkHandType(hand.replaceAll('J', letter))),
    );
  }
  return checkHandType(hand);
}
function parseLine(line: string): TLine {
  const [hand, bet] = line.split(' ');
  return [hand, +bet, checkHandType2(hand)];
}

const sortByRank = (a: TLine, b: TLine) => {
  const ranks = 'J23456789TQKA';
  if (a[2] !== b[2]) return a[2] - b[2];
  if (a[2] === b[2]) {
    for (let i = 0; i < 5; i++) {
      if (ranks.indexOf(a[0][i]) < ranks.indexOf(b[0].split('')[i])) return -1;
      else if (ranks.indexOf(a[0][i]) > ranks.indexOf(b[0].split('')[i])) return 1;
    }
  }
  return 0;
};

function solve(file: string) {
  const input = getFileData(file).split('\n').map(parseLine);
  const sorted = input.sort(sortByRank);
  console.log(sorted);
  return sorted.reduce((acc, curr, index) => acc + curr[1] * (index + 1), 0);
}

console.log(solve('test.txt'));
console.log(solve('input.txt'));
//251773524 high
//251731742 high
