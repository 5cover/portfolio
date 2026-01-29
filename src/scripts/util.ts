interface Constructor<T> {
    new (): T;
    prototype: T;
}

export function requireElementById(id: string): HTMLElement
export function requireElementById<T extends HTMLElement>(id: string, c: Constructor<T>): T
export function requireElementById<T extends HTMLElement>(id: string, c?: Constructor<T>): T {
    const e = document.getElementById(id);
    if (!e) {
        throw new Error(`missing element: id: ${id}` + (c === undefined ? '' : ` (${c.name || c})`));
    }
    if (c !== undefined && !(e instanceof c)) {
        throw new Error(`element of id: ${id}: must be a ${c.name || c}, got ${e}`);
    }
    return e as T;
}
