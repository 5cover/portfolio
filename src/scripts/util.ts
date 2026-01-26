export function requireElementById(id: string) {
    const e = document.getElementById(id)
    if (!e) {
        throw new Error(`missing element: id: ${id}`)
    }
    return e;
}