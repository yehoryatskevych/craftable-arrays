import { LArrayBase, TLArrayValue } from "./array-base";

export interface ILArraySliceable<T> {
  slice(start: number, end?: number): TLArrayValue<T>;
}

export class LArraySlice<T> extends LArrayBase<T> implements ILArraySliceable<T> {
  private _ref: TLArrayValue<T>;
  private _start: number;
  private _end: number;

  constructor(ref: TLArrayValue<T>, start = 0, end = ref.length) {
    super();

    if (ref instanceof LArraySlice) {
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

  public slice(start: number, end: number = this._length): TLArrayValue<T> {
    return new LArraySlice(this, start, end);
  }

  public toArray(): T[] {
    if (this._ref instanceof LArrayBase) {
      return super.toArray();
    }

    return this._ref.slice(this._start, this._end);
  }
}
