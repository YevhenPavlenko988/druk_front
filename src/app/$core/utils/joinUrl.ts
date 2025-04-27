export function joinUrl(...parts: string[]): string {
    return parts
        .filter(Boolean)
        .map(part => part.replace(/^\/+|\/+$/g, ''))
        .join('/');
}
