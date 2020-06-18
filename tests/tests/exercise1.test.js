const exercise1 = require('../exercise1');
/*test('Our first test', () => {
    throw new Error('Something failed');
});*/
describe('FizzBuzz', () => {
    it('should return FizzBuzz if '
         + 'input is divisible by 3 and 5', () => {
        const result = exercise1.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if '
         + 'input is divisible by 3 but not 5', () => {
        const result = exercise1.fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if '
         + 'input is divisible by 5 but not 3', () => {
        const result = exercise1.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });

    it('should return the input if '
         + 'input is not divisible by 5 and 3', () => {
        const result = exercise1.fizzBuzz(1);
        expect(result).toBe(1);
    });

    it('should throw if input is not a number', () => {
        const args = ['string', { property: 'property' },
                      null, undefined, NaN, '', false ];
        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow();
        });
    });
});