import type { TCraftableArrayValue } from "./array-base";

import { CArrayBase } from "./array-base";
import { CArraySlice } from "./array-slice";

export type TArrayMapTransformFn<T, U> = (value: T, index: number, obj: CArrayMap<T, U>) => U;

export class CArrayMap<T, U> extends CArrayBase<T, U> {
  private _ref: TCraftableArrayValue<T>;
  private _transformfn: TArrayMapTransformFn<T, U>;

  constructor(ref: TCraftableArrayValue<T>, transformfn: TArrayMapTransformFn<T, U>) {
    super();

    this._length = ref.length;
    this._ref = ref;
    this._transformfn = transformfn;
  }

  at(index: number) {
    if (index >= this._length) return undefined;

    const value = this._ref instanceof CArrayBase ? this._ref.at(index) : this._ref[index];

    return this._transformfn(value, index, this);
  }

  slice(start: number, end: number = this._length): TCraftableArrayValue<U> {
    return new CArraySlice(this, start, end);
  }
}
