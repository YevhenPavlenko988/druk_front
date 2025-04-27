import {getFileName} from './getFileName';

describe('order#getFileName', () => {
    it('should return null for invalid input', () => {
        expect(getFileName(null)).toBeNull();
        expect(getFileName('')).toBeNull();
    });

    it('should return correct file name', () => {
        expect(getFileName('file.pdf')).toBe('file.pdf');
        expect(getFileName('121212_file.pdf')).toBe('file.pdf');
        expect(getFileName('34343_file_4.pdf')).toBe('file_4.pdf');
    });
});
