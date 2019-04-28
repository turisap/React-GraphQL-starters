describe('sample test', () => {
    it('works as expected', () => {
        expect(1).toEqual(1);
    });

    it('handles ranges well', () => {
        const age = 100;
        expect(age).toBeGreaterThan(50);
    });

    it('makes a list of dogs', () => {
        const dogs = ['snikers', 'lola'];
        expect(dogs).toContain('lola');
    })
});