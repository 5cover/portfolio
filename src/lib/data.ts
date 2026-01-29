export function jsonResponse(data: unknown): Response {
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function indexById<T extends { id: string; data: unknown }>(entries: T[]): Record<string, unknown> {
    return entries.reduce<Record<string, unknown>>((acc, entry) => {
        acc[entry.id] = entry.data;
        return acc;
    }, {});
}
