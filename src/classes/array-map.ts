import { CArrayBase, TCArrayValue } from "./array-base";
import { CArraySlice, ICArraySliceable } from "./array-slice";

export type TArrayMapTransformFn<T, U> = (value: T, index: number, obj: CArrayMap<T, U>) => U;

export class CArrayMap<T, U> extends CArrayBase<T, U> implements ICArraySliceable<U> {
  private _ref: TCArrayValue<T>;
  private _transformfn: TArrayMapTransformFn<T, U>;

  constructor(ref: TCArrayValue<T>, transformfn: TArrayMapTransformFn<T, U>) {
    super();

    this._length = ref.length;
    this._ref = ref;
    this._transformfn = transformfn;
  }

  public at(index: number) {
    if (index >= this._length) return undefined;

    const value = this._ref instanceof CArrayBase ? this._ref.at(index) : this._ref[index];

    return this._transformfn(value, index, this);
  }

  public slice(start: number, end: number = this._length): TCArrayValue<U> {
    return new CArraySlice(this, start, end);
  }
}
