import { CArrayBase, TCArrayValue } from "./array-base";

export interface ICArraySliceable<T> {
  slice(start: number, end?: number): TCArrayValue<T>;
}

export class CArraySlice<T> extends CArrayBase<T> implements ICArraySliceable<T> {
  private _ref: TCArrayValue<T>;
  private _start: number;
  private _end: number;

  constructor(ref: TCArrayValue<T>, start = 0, end = ref.length) {
    super();

    if (ref instanceof CArraySlice) {
      this._ref = ref._ref;
      this._start = ref._start + start;
      this._end = ref._start + end;

      if (this._start > ref._end) {
        this._start = ref._end;
      }

      if (this._end > ref._end) {
        this._end = ref._end;
      }
    } else {
      this._ref = ref;
      this._start = start < ref.length ? start : ref.length;
      this._end = end < ref.length ? end : ref.length;
    }

    this._length = this._end - this._start;
  }

  public at(index: number) {
    if (index >= this._length) return undefined;

    return this._ref.at(this._start + index);
  }

  public slice(start: number, end: number = this._length): TCArrayValue<T> {
    return new CArraySlice(this, start, end);
  }
}
