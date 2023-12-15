import { getFileData } from '../getdata';

interface Mapping {
  destStart: number;
  destEnd: number;
  srcStart: number;
  srcEnd: number;
}

function parseInput(): {
  seeds: number[];
  mapMatrix: Mapping[][];
} {
  const lines = getFileData('input.txt').trim().split('\n\n');
  const seeds = lines.shift()!.split(':')[1].trim().split(' ').map(Number);
  const mapMatrix = lines.map((line) =>
    line
      .split('\n')
      .slice(1)
      .map((s) => s.split(' ').map(Number))
      .map(([destStart, srcStart, length]) => ({
        destStart,
        destEnd: destStart + length - 1,
        srcStart,
        srcEnd: srcStart + length - 1,
      })),
  );
  return { seeds, mapMatrix };
}

function lookupLocation(mapMatrix: Mapping[][], val: number) {
  return mapMatrix.reduce((curr, mappings) => {
    for (let i = 0; i < mappings.length; i++) {
      const m = mappings[i];
      if (curr >= m.srcStart && curr <= m.srcEnd) {
        return m.destStart + (curr - m.srcStart);
      }
    }
    return curr;
  }, val);
}

function lookupSeed(mapMatrix: Mapping[][], val: number) {
  return mapMatrix.reduceRight((curr, mappings) => {
    for (let i = 0; i < mappings.length; i++) {
      const m = mappings[i];
      if (curr >= m.destStart && curr <= m.destEnd) {
        return m.srcStart + (curr - m.destStart);
      }
    }
    return curr;
  }, val);
}

export function solvePart1() {
  const { seeds, mapMatrix } = parseInput();
  return Math.min(...seeds.map((s) => lookupLocation(mapMatrix, s)));
}

export function solvePart2() {
  const { seeds, mapMatrix } = parseInput();
  const validSeed = (seed: number) => {
    for (let i = 0; i < seeds.length; i += 2) {
      if (seed >= seeds[i] && seed < seeds[i] + seeds[i + 1]) return true;
    }
    return false;
  };
  const candidateSeeds = mapMatrix
    .flatMap((mappings, i) =>
      mappings.map((m) => lookupSeed(mapMatrix.slice(0, i + 1), m.destStart)),
    )
    .filter(validSeed);

  return Math.min(...candidateSeeds.map((s) => lookupLocation(mapMatrix, s)));
}

console.time('part1');
console.log(solvePart1());
console.timeEnd('part1');

console.time('part2');
console.log(solvePart2());
console.timeEnd('part2');
