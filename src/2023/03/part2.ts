import { getFileData } from '../getdata';
// @#$%&*+-=/
type Match = { num: number; coords: { x: number; y: number }[] };
type SpecialMatch = { start: number; line: number; maxX: number; maxY: number };

const getAllMatches = (lines: string[], nums: Match[] = [], specials: SpecialMatch[] = []) => {
  const maxX = lines.length;
  lines.map((line, index) => {
    const numbers = [...line.matchAll(/(\d+)/g)];
    const chars = [...line.matchAll(/[*]/g)];
    numbers.map((match) => {
      if (!match) return;
      const start = match?.index as number;
      const end = start + match[0].length - 1;
      nums.push({
        num: parseInt(match[0]),
        coords: [
          { x: index, y: start },
          { x: index, y: start + 1 },
          { x: index, y: end },
        ],
      });
    });
    chars.map(
      (match) =>
        match &&
        specials.push({ start: match?.index as number, line: index, maxX, maxY: line.length }),
    );
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
  const lines = getFileData(file).split('\n');
  const [nums, specials] = getAllMatches(lines) as [Match[], SpecialMatch[]];

  const targets = specials
    .map((char) => {
      return getTargetIndices(char);
    })
    .map((target) => {
      const match: number[] = [];
      nums.map((num) => {
        num.coords.map((coord) => {
          if (target.some((t) => t[0] === coord.x && t[1] === coord.y)) {
            if (!match.includes(num.num)) {
              match.push(num.num);
            }
          }
        });
      });
      return match;
    });

  return targets.reduce((total, curr) => {
    if (curr.length > 1) {
      total = total + curr[0] * curr[1];
    }
    return total;
  }, 0);
}

console.log(solve('test.txt'));
console.log(solve('input.txt'));
