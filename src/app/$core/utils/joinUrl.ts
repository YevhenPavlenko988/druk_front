export function joinUrl(...parts: Array<string>): string {
    return parts
        .filter(Boolean)
        .map(part => part.replace(/^\/+|\/+$/g, ''))
        .join('/');
}
