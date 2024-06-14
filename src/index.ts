import { CArrayBase, CArrayConcat, CArrayExtend, CArrayMock, CArraySlice, CArrayWrap, CArrayMap } from "./classes";

export * from "./classes";

export const concat = <T>(...args: ConstructorParameters<typeof CArrayConcat<T>>) => new CArrayConcat<T>(...args);
export const extend = <T>(...args: ConstructorParameters<typeof CArrayExtend<T>>) => new CArrayExtend<T>(...args);
export const mock = <T>(...args: ConstructorParameters<typeof CArrayMock<T>>) => new CArrayMock<T>(...args);
export const slice = <T>(...args: ConstructorParameters<typeof CArraySlice<T>>) => new CArraySlice<T>(...args);
export const wrap = <T>(...args: ConstructorParameters<typeof CArrayWrap<T>>) => new CArrayWrap<T>(...args);
export const map = <T, U>(...args: ConstructorParameters<typeof CArrayMap<T, U>>) => new CArrayMap<T, U>(...args);
export const isCraftedArray = <T>(obj: unknown): obj is CArrayBase<T> => obj instanceof CArrayBase;
