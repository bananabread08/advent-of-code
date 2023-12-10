import { getData } from '../getdata';

function getPredictions(history: number[][]) {
  if (history[history.length - 1].every((val) => val === 0)) return history;
  const predictions: number[] = [];
  for (const [index, val] of history[history.length - 1].entries()) {
    if (index === history[history.length - 1].length - 1) break;
    predictions.push(history[history.length - 1][index + 1] - val);
  }
  history.push(predictions);
  return getPredictions(history);
}

function solve(file: string) {
  const input = getData(9, file).split('\n');
  const histories = input.map((line) => line.split(' ').map((n) => parseInt(n)));
  const predictions = histories.map((history) => getPredictions([history]));
  const nextValues = predictions.map((prediction) =>
    prediction.reduce((acc, curr) => {
      return acc + curr[curr.length - 1];
    }, 0),
  );
  return nextValues.reduce((acc, curr) => acc + curr);
}

console.log(solve('test.txt'));
console.log(solve('input.txt'));
