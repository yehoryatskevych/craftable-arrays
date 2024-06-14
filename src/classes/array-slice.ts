import type { TCraftableArrayValue } from "./array-base";

import { CArrayBase } from "./array-base";

export class CArraySlice<T> extends CArrayBase<T> {
  private _ref: TCraftableArrayValue<T>;
  private _start: number;
  private _end: number;
  private _allowFlat: boolean;

  constructor(ref: TCraftableArrayValue<T>, start = 0, end = ref.length, allowFlat = true) {
    super();

    if (allowFlat && ref instanceof CArraySlice) {
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

    this._allowFlat = allowFlat;
    this._length = this._end - this._start;
  }

  at(index: number): T | undefined {
    if (index >= this._length) return undefined;

    if (this._ref instanceof CArrayBase) {
      return this._ref.at(this._start + index);
    }

    return this._ref[this._start + index];
  }

  slice(start: number, end: number = this._length): TCraftableArrayValue<T> {
    return new CArraySlice(this, start, end, this._allowFlat);
  }
}
