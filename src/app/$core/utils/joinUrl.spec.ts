import {joinUrl} from './joinUrl';

describe('#joinUrl', () => {
    it('should join multiple paths', () => {
        expect(joinUrl('a/', '/b/', 'c')).toBe('a/b/c');
    });

    it('should handle extra slashes', () => {
        expect(joinUrl('a//', '//b/', 'c//')).toBe('a/b/c');
    });

    it('should ignore empty or null values', () => {
        expect(joinUrl('a//', null, '', 'b/')).toBe('a/b');
    });

    it('should handle one part', () => {
        expect(joinUrl('a//')).toBe('a');
    });
});
