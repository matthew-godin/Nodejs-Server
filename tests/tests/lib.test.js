const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');
/*test('Our first test', () => {
    throw new Error('Something failed');
});*/
describe('absolute', () => {
    it('should return a positive number if '
         + 'input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
        // Try to use simple number rather than
        // non simple ones for no reason
    });

    it('should return a positive number if '
        + 'input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return 0 '
        + 'input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should the greeting message', () => {
        const result = lib.greet('Mosh');
        //expect(result).toBe('Welcome Mosh');
        //expect(result).toMatch(/Mosh/);
        expect(result).toContain('Mosh');
    });
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();
        //expect(result).toBeDefined(); // Too general, bad
        //expect(result).not.toBeNull(); // Useless test
        //expect(result[0]).toBe('USD'); // Too specific, bad
        //expect(result[1]).toBe('AUD');
        //expect(result[2]).toBe('EUR');
        /*expect(result.length).toBe(3); // Proper way,
        expect(result).toContain('USD'); // but not ideal
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');*/
        expect(result).toEqual( // Ideal way
            expect.arrayContaining(['EUR', 'USD', 'AUD']));
    });
});

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1);
        // Below test fails because of
        // different memory locations
        //expect(result).toBe({ id: 1, price: 10 });
        // Below is the right test
        //expect(result).toEqual({ id: 1, price: 10 });
        // Below is less restricitve which can be a good
        // alternative for more complex objects for
        // which we don't care about every single property
        //expect(result).toMatchObject({ id: 1, price: 10 });
        // Below is another way of doing it
        expect(result).toHaveProperty('id', 1);
    });
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        // Null, undefined, NaN, '', 0, false
        // Below is not the right approach, it will not work
        /*const result = lib.registerUser(null);
        expect(result).toThrow();*/
        // Below is the right way of doing it
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow();
        });
    });

    it('should return a user object if valid username'
       + ' is passed', () => {
        const result = lib.registerUser('mosh');
        expect(result).toMatchObject({ username: 'mosh' });
        expect(result.id).toBeGreaterThan(0);
    });
});

/*test('absolute - should return a positive number if '
     + 'input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
    // Try to use simple number rather than
    // non simple ones for no reason
});

test('absolute - should return a positive number if '
     + 'input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
});

test('absolute - should return 0 '
     + 'input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
});*/

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has '
       + 'more than 10 points', () => {
       // Mock function
       db.getCustomerSync = function(customerId) {
           console.log('Fake reading customer...');
           return { id: customerId, points: 20 };
       }
       const order = { customerId: 1, totalPrice: 10 };
       lib.applyDiscount(order);
       expect(order.totalPrice).toBe(9);
    });
});

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        // Jest has a better approach for Mock function
        //const mockFunction = jest.fn();
        //mockFunction.mockReturnValue(1);
        //mockFunction.mockResolvedValue(1);
        //mockFunction.mockRejectedValue(new Error('...'));
        //const result = mockFunction();
        //const result = await mockFunction();
        db.getCustomerSync = jest.fn().mockReturnValue({
            email: 'a'
        });
        mail.send = jest.fn();
        /*// Mock function
        db.getCustomerSync = function(customerId) {
            return { email: 'a' };
        }
        let mailSent = false;
        // Mock function
        mail.send = function(email, message) {
            mailSent = true;
        }*/
        lib.notifyCustomer({ customerId: 1 });
        //expect(mailSent).toBe(true);
        expect(mail.send).toHaveBeenCalled();
        // Better to not check for exact equality for strings
        // but ok ofr numbers
        //expect(mail.send).toHaveBeenCalledWith('a', '...');
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});