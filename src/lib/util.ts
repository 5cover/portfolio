export function throwf(x: unknown): never {
    throw x instanceof Error ? x : new Error(x);
}
export function stripTags(value: string): string {
    return value.replace(/<[^>]*>/g, '');
}
