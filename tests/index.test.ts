import { slice, concat, wrap, mock, extend, map } from "../src";

describe("Lazy Arrays", () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  
  test("should concatenate arrays", () => {
    const result = concat(slice(arr, 0, 5), slice(arr, 5, 10)).toArray();
    expect(result).toEqual(arr.slice(0, 10));
  });
  
  test("should extend array", () => {
    const result = extend(arr.slice(0, 3), arr[3]).toArray();
    expect(result).toEqual([...arr.slice(0, 3), arr[3]]);
  });
  
  test("should mock array", () => {
    const result = mock().toArray();
    expect(result).toEqual([]);
  });
  
  test("should slice array", () => {
    const result = slice(arr, 0, 5).toArray();
    expect(result).toEqual(arr.slice(0, 5));
  });

  test("should wrap array", () => {
    const result = wrap(arr).toArray();
    expect(result).toEqual(arr);
  });

  test("should wrap value", () => {
    const result = wrap(5).toArray();
    expect(result).toEqual([5]);
  });

  test("should wrap sliced array", () => {
    const result = wrap(slice(arr, 1, 5)).toArray();
    expect(result).toEqual(arr.slice(1, 5));
  });

  test("should map array", () => {
    const transformfn = (v: number) => v * 100;
    const result = map(arr, transformfn).toArray();
    expect(result).toEqual(arr.map(transformfn));
  });
  
  test("should concatenate sliced arrays", () => {
    const part1 = slice(arr, 0, 5);
    const part2 = slice(arr, 5, 10);
    const concatenated = concat(part1, part2);
    const result = concatenated.toArray();
    
    expect(result).toEqual(arr.slice(0, 10));
  });
  
  test("should handle complex operation", () => {
    const result = concat(
      concat(
        slice(arr, 0, 3),
        concat(
          slice(slice(arr, 0, 6), 3, 6),
          slice(
            concat(
              slice(arr, 6, 8),
              slice(arr, 8, 10)
            ),
            0,
            4
          )
        )
      ),
      concat(
        mock(),
        concat(
          extend(
            concat(
                mock(),
                wrap(arr[10]),
            ),
            arr[11]
          ),
          map(
            slice(arr, 13, 15),
            v => v - 1
          )
        ),
      )
    ).toArray();
    
    expect(result).toEqual(arr.slice(0, 14));
  });
});
