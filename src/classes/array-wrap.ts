import { LArrayBase, TLArrayValue } from "./array-base";
import { LArraySlice, ILArraySliceable } from "./array-slice";

export class LArrayWrap<T> extends LArrayBase<T> implements ILArraySliceable<T> {
  private _value: T | TLArrayValue<T>;
  private _isSingleValue: boolean;

  constructor(ref: TLArrayValue<T> | T) {
    super();
    
    this._value = ref;
    this._isSingleValue = !(ref instanceof LArrayBase) && !Array.isArray(ref);
    this._length = this._isSingleValue ? 1 : (ref as TLArrayValue<T>).length;
  }

  public at(index: number): T {
    if (index >= this.length) return undefined;

    if (this._isSingleValue) {
      return this._value as T;
    }

    return (this._value as TLArrayValue<T>).at(index);
  }

  public slice(start: number, end: number = this._length): TLArrayValue<T> {
    return new LArraySlice(this, start, end);
  }
}
