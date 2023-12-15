import { getFileData } from '../getdata';

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
    while (currentNode !== 'ZZZ') {
      for (const direction of directions.split('')) {
        currentNode = getNextNode(currentNode, direction === 'L' ? 'left' : 'right', nodes);
        steps++;
      }
    }
    return steps;
  };

  return getSteps();
}

console.log(solve('test.txt'));
console.log(solve('input.txt'));
