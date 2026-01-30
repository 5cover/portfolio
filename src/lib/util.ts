import type { Entry } from './content';

export function throwf(x: unknown): never {
    throw x instanceof Error ? x : new Error(String(x));
}
export function stripTags(value: string): string {
    return value.replace(/<[^>]*>/g, '');
}
export function capitalize(value: string): string {
    return value[0].toUpperCase() + value.slice(1);
}

export const typedObjectFromEntries = <const T extends ReadonlyArray<readonly [PropertyKey, unknown]>>(
    entries: T
): { [K in T[number] as K[0]]: K[1] } => {
    return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] };
};

export function mapById<T>(entries: readonly Entry<T>[]): Record<string, T> {
    return entries.reduce<Record<string, T>>((acc, [id, d]) => {
        acc[id] = d;
        return acc;
    }, {});
}
