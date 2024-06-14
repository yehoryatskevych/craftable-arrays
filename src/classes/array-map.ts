import { LArrayBase, TLArrayValue } from "./array-base";
import { LArraySlice, ILArraySliceable } from "./array-slice";

export type TArrayMapTransformFn<T, U> = (value: T, index: number, obj: LArrayMap<T, U>) => U;

export class LArrayMap<T, U> extends LArrayBase<T, U> implements ILArraySliceable<U> {
  private _ref: TLArrayValue<T>;
  private _transformfn: TArrayMapTransformFn<T, U>;

  constructor(ref: TLArrayValue<T>, transformfn: TArrayMapTransformFn<T, U>) {
    super();

    this._ref = ref;
    this._length = ref.length;
    this._transformfn = transformfn;
  }

  public at(index: number) {
    if (index >= this._length) return undefined;

    return this._transformfn(this._ref.at(index), index, this);
  }

  public slice(start: number, end: number = this._length): TLArrayValue<U> {
    return new LArraySlice(this, start, end);
  }

  public transform(value: T, index: number): U {
    return this._transformfn(value, index, this);
  }

  public toArray(): U[] {
    if (this._ref instanceof LArrayBase) {
      return super.toArray();
    }

    return this._ref.map((v, i) => this._transformfn(v, i, this));
  }
}
