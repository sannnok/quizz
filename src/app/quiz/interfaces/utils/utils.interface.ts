export type PartOpt<T extends Record<string, any>, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
