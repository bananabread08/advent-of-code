import { getFileData } from '../getdata';

interface Point {
  x: number;
  y: number;
}

function getEmptyRowAndColumn(mat: string[][]) {
  const size = mat.length;
  const emptyRows: { [key: number]: object } = {};
  const emptyCols: { [key: number]: object } = {};

  for (let i = 0; i < size; i++) {
    let r = true;
    let c = true;
    for (let j = 0; j < size; j++) {
      r = r && mat[i][j] !== '#';
      c = c && mat[j][i] !== '#';
    }
    if (r) {
      emptyRows[i] = {};
    }
    if (c) {
      emptyCols[i] = {};
    }
  }
  return { emptyRows, emptyCols };
}

function findPoints(mat: string[][]): Point[] {
  const p: Point[] = [];

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[i].length; j++) {
      if (mat[i][j] === '#') {
        p.push({ x: i, y: j });
      }
    }
  }

  return p;
}

function shortestGalaxyPathLengthTotal(file: string) {
  const lines = getFileData(file).split('\n');

  const mat: string[][] = lines.map((line) => line.split(''));
  const result = getEmptyRowAndColumn(mat);
  const emptyRows = result.emptyRows;
  const emptyCols = result.emptyCols;
  const points = findPoints(mat);
  const dist: number[] = [];
  const weight = 1000000;

  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const p2 = points[j];
      let x = 0;

      for (let k = Math.min(p1.x, p2.x); k < Math.max(p1.x, p2.x); k++) {
        if (emptyRows[k] !== undefined) {
          x += weight;
        } else {
          x++;
        }
      }

      for (let k = Math.min(p1.y, p2.y); k < Math.max(p1.y, p2.y); k++) {
        if (emptyCols[k] !== undefined) {
          x += weight;
        } else {
          x++;
        }
      }
      dist.push(x);
    }
  }
  return dist.reduce((acc, curr) => acc + curr, 0);
}

console.log(shortestGalaxyPathLengthTotal('test.txt'));
console.log(shortestGalaxyPathLengthTotal('input.txt'));
