export type TCraftableArrayValue<T> = CArrayBase<T> | Array<T>;

export abstract class CArrayBase<T, U = T> {
  protected _length: number = 0;
  
  public get length() {
    return this._length;
  }
  
  public abstract at(index: number): U | undefined;
  public abstract slice(start: number, end?: number): TCraftableArrayValue<U>;
  
  *[Symbol.iterator]() {
    for (let i = 0; i < this._length; ++i) {
      yield this.at(i);
    }
  }
  
  toArray(): U[] {
    return [...this] as U[];
  }
}
