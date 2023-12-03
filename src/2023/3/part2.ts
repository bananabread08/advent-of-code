import { getData } from '../getdata';
// @#$%&*+-=/
type Match = {
  num: number;
  start: number;
  end: number;
  line: number;
};

type SpecialMatch = Pick<Match, 'start' | 'line'> & { maxX: number; maxY: number };

const getAllMatches = (lines: string[], nums: Match[] = [], specials: SpecialMatch[] = []) => {
  const maxX = lines.length;
  lines.map((line, index) => {
    const numbers = [...line.matchAll(/(\d+)/g)];
    const chars = [...line.matchAll(/[*]/g)];
    numbers.map((match) => {
      if (!match) return;
      const start = match?.index as number;
      const end = start + match[0].length - 1;
      nums.push({ num: parseInt(match[0]), start, end, line: index });
    });
    chars.map((match) => {
      if (!match) return;
      const start = match?.index as number;
      specials.push({ start, line: index, maxX, maxY: line.length });
    });
  });
  return [nums, specials];
};

const isValidTarget = (i: number, j: number, maxX: number, maxY: number) => {
  return i >= 0 && i <= maxY - 1 && j >= 0 && j <= maxX - 1;
};

const getTargetIndices = (char: SpecialMatch) => {
  const hits: number[][] = [];
  for (let i = -1; i < 2; i++) {
    if (isValidTarget(char.line - 1, char.start + i, char.maxX, char.maxY))
      hits.push([char.line - 1, char.start + i]);
    if (i !== 0 && isValidTarget(char.line, char.start + i, char.maxX, char.maxY)) {
      hits.push([char.line, char.start + i]);
    }
    if (isValidTarget(char.line + 1, char.start + i, char.maxX, char.maxY))
      hits.push([char.line + 1, char.start + i]);
  }
  return hits;
};

function solve(file: string) {
  const lines = getData(3, file).split('\n');
  const [nums, specials] = getAllMatches(lines) as [Match[], SpecialMatch[]];

  const targets = specials.map((char) => {
    return getTargetIndices(char);
  });

  return targets
    .map((target) => {
      const match: number[] = [];
      nums.map((num) => {
        for (let i = num.start; i <= num.end; i++) {
          if (
            target.some((t) => {
              return t[0] === num.line && t[1] === i;
            })
          )
            if (!match.includes(num.num)) {
              match.push(num.num);
            }
        }
      });
      return match;
    }, 0)
    .reduce((total, curr) => {
      if (curr.length > 1) {
        total = total + curr[0] * curr[1];
      }
      return total;
    }, 0);
}

console.log(solve('test.txt'));
console.log(solve('input.txt'));
