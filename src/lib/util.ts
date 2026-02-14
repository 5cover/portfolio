export const throwf = (x: unknown) => {
    throw x instanceof Error ? x : new Error(String(x));
};
export const stripTags = (value: string) => value.replace(/<[^>]*>/g, '');

export const capitalize = (value: string) => value[0].toUpperCase() + value.slice(1);

export const typedObjectFromEntries = <const T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(
    entries: T
): { [K in T[number] as K[0]]: K[1] } => {
    return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] };
};

export function mapById<T extends { id: PropertyKey }>(entries: readonly T[]): Map<T['id'], T> {
    const result = new Map<T['id'], T>();
    for (const entry of entries) {
        result.set(entry.id, entry);
    }
    return result;
}

export const mapValues = <K extends PropertyKey, V, W>(o: Record<K, V>, map: (value: V, key: K) => W) =>
    typedObjectFromEntries(plainEntries<K, V>(o).map(([k, v]) => [k, map(v, k)] as const));

export const formatDate = (date: Date, locale: Intl.LocalesArgument) =>
    new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date);

export const plainEntries = <K extends PropertyKey, V>(o: Partial<Record<K, V>>) => Object.entries(o) as [K, V][];

export const cls = (...classes: readonly (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');

export const isArray = (x: unknown): x is readonly unknown[] => Array.isArray(x);

export const map =
    <T, U>(map: (t: T) => U) =>
    (t: T | undefined) =>
        t === undefined ? undefined : map(t);
