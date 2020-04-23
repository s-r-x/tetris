export const mapNumber = (
  x: number,
  a: number,
  b: number,
  c: number,
  d: number
) => (x - a) * ((d - c) / (b - a)) + c;

export function rotateMatrix<T>(matrix: Array<T[]>): Array<T[]> {
  let result = [];
  for (let i = 0; i < matrix[0].length; i++) {
    let row = matrix.map((e) => e[i]).reverse();
    result.push(row);
  }
  return result;
}
