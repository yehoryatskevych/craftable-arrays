# ⚒️ Craftable Arrays

## 📄 About

**Craftable Arrays** is a TypeScript library designed for advanced array operations such as slicing, concatenation, mapping, and more. This library provides a set of tools to manipulate arrays in a functional and efficient manner.

## 📚 Features

- **Array Slicing**: Easily create subarrays from existing arrays.
- **Array Concatenation**: Combine multiple arrays or slices into one.
- **Array Wrapping**: Wrap single values into array-like structures.
- **Array Mapping**: Apply a transformation function to each element in the array.
- **Array Mocking**: Use mock arrays in operations.
- **Array Extension**: Extend arrays with additional values.
- **High Performance**: Avoids the need to create intermediate array instances, ensuring faster operations.

## 🔄 Installation

To install Craftable Arrays, use npm:

```bash
npm install craftable-arrays
```

## ▶ Usage

Here's how to use the main features of Craftable Arrays:

### Importing Craftable Arrays

```javascript
import { slice, concat, mock, extend, wrap, map, isCraftedArray } from 'craftable-arrays';
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

Craftable Arrays are particularly efficient for sorting algorithms like merge sort because they avoid creating intermediate array instances, which can be time-consuming. Here's an example implementation of merge sort using Craftable Arrays:

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
  
  if (!isCraftedArray(arr) && isCraftedArray(result)) {
    return result.toArray();
  }
  
  return result;
}
```

## 📋 API Documentation

### `CArrayBase<T, U = T>`

An abstract base class representing an array operation.

#### Properties

- `length: number`
  - Gets the length of the array.

#### Methods

- `at(index: number): U | undefined`
  - Gets the element at the specified index.
- `slice(start: number, end?: number): TCArrayValue<U>`
  - Returns a slice of the array from `start` to `end`.
- `toArray(): U[]`
  - Converts the array operation result to a plain array.

### `ArraySlice<T>`

A class representing a slice of an array.

#### Constructor

- `constructor(ref: TCArrayValue<T>, start?: number, end?: number, allowFlat?: boolean)`
  - Creates a slice of the given array or array operation.

### `ArrayConcat<T>`

A class representing the concatenation of two arrays or array operations.

#### Constructor

- `constructor(left: TCArrayValue<T>, right: TCArrayValue<T>)`
  - Creates a concatenation of the given arrays or array operations.

### `CArrayMap<T, U>`

A class representing a mapped array where each element is transformed by a provided function.

#### Constructor

- `constructor(ref: TCArrayValue<T>, transformfn: TArrayMapTransformFn<T, U>)`
  - Creates a mapped array from the given array or array operation.

#### Methods

- `at(index: number): U | undefined`
  - Gets the transformed element at the specified index.
- `slice(start: number, end?: number): TCArrayValue<U>`
  - Returns a slice of the mapped array from `start` to `end`.

### `ArrayWrap<T>`

A class representing a single value wrapped in an array-like structure.

#### Constructor

- `constructor(value: T)`
  - Wraps the given value.

### `ArrayMock<T>`

A class representing a mock array with no elements.

### `ArrayExtend<T>`

A class representing an array extended with an additional value.

#### Constructor

- `constructor(array: T[], value: T)`
  - Extends the given array with the additional value.

### Utility Functions

#### `slice<T>(ref: TCArrayValue<T>, start?: number, end?: number): TCArrayValue<T>`

Creates a slice of the given array or array operation.

#### `concat<T>(left: TCArrayValue<T>, right: TCArrayValue<T>): TCArrayValue<T>`

Concatenates the given arrays or array operations.

#### `wrap<T>(value: T): TCArrayValue<T>`

Wraps the given value in an array-like structure.

#### `mock<T>(): TCArrayValue<T>`

Creates a mock array with no elements.

#### `extend<T>(array: TCArrayValue<T>, value: T): TCArrayValue<T>`

Extends the given array with the additional value.

#### `map<T, U>(array: TCArrayValue<T>, transformfn: TArrayMapTransformFn<T, U>): TCArrayValue<U>`

Creates a mapped array where each element is transformed by the provided function.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING](CONTRIBUTING.md) file for guidelines.
