export function getFileName(s3key: string): string {
    if (!s3key) {
        return null;
    }
    return s3key.includes('_')
        ? s3key.split('_').slice(1).join('_')
        : s3key;
}
