import { LArrayBase, LArrayConcat, LArrayExtend, LArrayMock, LArraySlice, LArrayWrap, LArrayMap } from "./classes";

export * from "./classes";

export const concat = <T>(...args: ConstructorParameters<typeof LArrayConcat<T>>) => new LArrayConcat<T>(...args);
export const extend = <T>(...args: ConstructorParameters<typeof LArrayExtend<T>>) => new LArrayExtend<T>(...args);
export const mock = <T>(...args: ConstructorParameters<typeof LArrayMock<T>>) => new LArrayMock<T>(...args);
export const slice = <T>(...args: ConstructorParameters<typeof LArraySlice<T>>) => new LArraySlice<T>(...args);
export const wrap = <T>(...args: ConstructorParameters<typeof LArrayWrap<T>>) => new LArrayWrap<T>(...args);
export const map = <T, U>(...args: ConstructorParameters<typeof LArrayMap<T, U>>) => new LArrayMap<T, U>(...args);
export const isLazyArray = <T>(obj: unknown): obj is LArrayBase<T> => obj instanceof LArrayBase;
