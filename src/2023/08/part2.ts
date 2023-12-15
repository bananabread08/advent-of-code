import { getFileData } from '../getdata';

// From stackoverflow. Got to read about Least Common Multiple

const gcdBase = (a: number, b: number): number => (b === 0 ? a : gcdBase(b, a % b));
const lcmBase = (a: number, b: number) => (a * b) / gcdBase(a, b);
const lcm = (numbers: number[]) =>
  numbers.reduce((acc, currentValue) => lcmBase(acc, currentValue));

const getNextNode = (
  currentNode: string,
  direction: 'left' | 'right',
  nodes: {
    start: string;
    left: string;
    right: string;
  }[],
) => {
  const startNode = nodes.find(({ start }) => start === currentNode);
  if (!startNode) throw new Error('Invalid node');

  return startNode[direction];
};

function solve(file: string) {
  const input = getFileData(file);
  const blocks = input.split('\n\n');
  const AtoZ = /[A-Z]{3}/g;
  const directions = blocks[0];
  const nodes = blocks[1]
    .slice(0)
    .split('\n')
    .map((l) => l.match(AtoZ) ?? [])
    .map(([start, left, right]) => ({
      start,
      left,
      right,
    }));

  const getSteps = (currentNode = 'AAA', steps = 0) => {
    while (!currentNode.endsWith('Z')) {
      for (const direction of directions.split('')) {
        currentNode = getNextNode(currentNode, direction === 'L' ? 'left' : 'right', nodes);
        steps++;
        if (currentNode.endsWith('Z')) break;
      }
    }
    return steps;
  };

  const startNodes = nodes.map((n) => n.start).filter((n) => n.endsWith('A'));
  const steps = startNodes.map((cn) => getSteps(cn));
  return lcm(steps);
}

console.log(solve('test.txt'));
console.log(solve('input.txt'));
