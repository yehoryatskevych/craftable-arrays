# ⚒️ Lazy Arrays

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yehoryatskevych/lazy-arrays/blob/main/LICENSE) [![npm](https://img.shields.io/npm/v/lazy-arrays.svg)](https://www.npmjs.com/package/lazy-arrays) ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/yehoryatskevych/lazy-arrays/tests.yml?branch=main)


## 📄 About

**Lazy Arrays** is a high-performance TypeScript library designed for advanced array operations with lazy evaluation. This library provides a set of tools to manipulate arrays in an efficient manner by deferring computations until necessary.

## 📚 Features

- **Lazy Evaluation**: Perform operations only when needed.
- **Array Slicing**: Create subarrays from existing arrays efficiently.
- **Array Concatenation**: Combine multiple arrays or slices into one without immediate computation.
- **Array Mapping**: Apply transformations lazily to each element in the array.
- **Array Wrapping**: Wrap single values into array-like structures.
- **Array Mocking**: Use mock arrays in operations.
- **Array Extension**: Extend arrays with additional values.
- **High Performance**: Avoid unnecessary computations and memory allocations.

## 🔄 Installation

To install Lazy Arrays, use npm:

```bash
npm install lazy-arrays
```

## ▶ Usage

Here's how to use the main features of Lazy Arrays:

### Importing Lazy Arrays

```javascript
import { slice, concat, mock, extend, wrap, map, isLazyArray } from 'lazy-arrays';
```

### Example

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

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

console.log(result); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```

### Merge Sort Example

Lazy Arrays are particularly efficient for sorting algorithms like merge sort because they avoid creating intermediate array instances and defer computations until necessary. Here's an example implementation of merge sort using Lazy Arrays:

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const halfIndex = Math.floor(arr.length / 2);
  const left = slice(arr, 0, halfIndex);
  const right = slice(arr, halfIndex, arr.length);
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < sortedLeft.length && rightIndex < sortedRight.length) {
    if (sortedLeft.at(leftIndex) < sortedRight.at(rightIndex)) {
      result.push(sortedLeft.at(leftIndex++));
    } else {
      result.push(sortedRight.at(rightIndex++));
    }
  }
  
  if (leftIndex < sortedLeft.length) {
    result = concat(result, slice(sortedLeft, leftIndex));
  }
  
  if (rightIndex < sortedRight.length) {
    result = concat(result, slice(sortedRight, rightIndex));
  }
  
  if (!isLazyArray(arr) && isLazyArray(result)) {
    return result.toArray();
  }
  
  return result;
}
```

## 📋 API Documentation

### `LArrayBase<T, U = T>`

An abstract base class representing an array operation.

#### Properties

- `length: number`
  - Gets the length of the array.

#### Methods

- `at(index: number): U | undefined`
  - Gets the element at the specified index.
- `slice(start: number, end?: number): TLArrayValue<U>`
  - Returns a slice of the array from `start` to `end`.
- `toArray(): U[]`
  - Converts the array operation result to a plain array.

### `ArraySlice<T>`

A class representing a slice of an array.

#### Constructor

- `constructor(ref: TLArrayValue<T>, start?: number, end?: number, allowFlat?: boolean)`
  - Creates a slice of the given array or array operation.

### `ArrayConcat<T>`

A class representing the concatenation of two arrays or array operations.

#### Constructor

- `constructor(left: TLArrayValue<T>, right: TLArrayValue<T>)`
  - Creates a concatenation of the given arrays or array operations.

### `LArrayMap<T, U>`

A class representing a mapped array where each element is transformed by a provided function.

#### Constructor

- `constructor(ref: TLArrayValue<T>, transformfn: TArrayMapTransformFn<T, U>)`
  - Creates a mapped array from the given array or array operation.

#### Methods

- `at(index: number): U | undefined`
  - Gets the transformed element at the specified index.
- `slice(start: number, end?: number): TLArrayValue<U>`
  - Returns a slice of the mapped array from `start` to `end`.

### `ArrayWrap<T>`

A class representing a value wrapped in an array-like structure.

#### Constructor

- `constructor(value: T | TLArrayValue<T>)`
  - Wraps the given value.

### `ArrayMock<T>`

A class representing a mock array with no elements.

### `ArrayExtend<T>`

A class representing an array extended with an additional value.

#### Constructor

- `constructor(array: T[], value: T)`
  - Extends the given array with the additional value.

### Utility Functions

#### `slice<T>(ref: TLArrayValue<T>, start?: number, end?: number): TLArrayValue<T>`

Creates a slice of the given array or array operation.

#### `concat<T>(left: TLArrayValue<T>, right: TLArrayValue<T>): TLArrayValue<T>`

Concatenates the given arrays or array operations.

#### `wrap<T>(value: T): TLArrayValue<T>`

Wraps the given value in an array-like structure.

#### `mock<T>(): TLArrayValue<T>`

Creates a mock array with no elements.

#### `extend<T>(array: TLArrayValue<T>, value: T): TLArrayValue<T>`

Extends the given array with the additional value.

#### `map<T, U>(array: TLArrayValue<T>, transformfn: TArrayMapTransformFn<T, U>): TLArrayValue<U>`

Creates a mapped array where each element is transformed by the provided function.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING](CONTRIBUTING.md) file for guidelines.
