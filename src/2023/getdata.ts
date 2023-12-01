import path from 'path';
import fs from 'fs';

export function getData(day: number, file: string) {
  return fs.readFileSync(path.join(__dirname, `/${day}/${file}`)).toString();
}
