const request = require('supertest');
const {Genre, genreSchema} = require('../../models/genre');
const {User} = require('../../models/user');
let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => {
        server.close();
        await Genre.remove({});
    });
    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
            ]);
            const res = await request(server).get('/api/genres');
            // This test is a little bit too general
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1'))
                .toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2'))
                .toBeTruthy();
            // Removes all documents in the Genre collection
            //await Genre.remove({});
        });
    });
    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
            ]);
            const res = await request(server).get('/api/genres');
            // This test is a little bit too general
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1'))
                .toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2'))
                .toBeTruthy();
            // Removes all documents in the Genre collection
            //await Genre.remove({});
        });
    });

    describe('GET /:id', () => {
        it('should return a genre if a valid id is passed', async () => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();
            const res = await request(server).get('/api/genres/' + genre._id);
            expect(res.status).toBe(200);
            //expect(res.body).toMatchObject(genre);
            expect(res.body).toHaveProperty('name', genre.name);
        });
        it('should return 404 if invalid id is passed', async () => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        // Define the happy path, and then in each test, we change
        // one parameter that clearly aligns with the name of
        // the test.
        let token;
        let name;
        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                //.send({ name: 'genre1' });
                //.send({ name: name });
                // In ES6, if the key and value
                // are the same, we chan just
                // put the key
                .send({ name });
        }
        beforeEach(() => {
            // Happy Path
            token = new User().generateAuthToken();
            name = 'genre1';
        });
        it('should return 401 if client is not logged in', async () => {
            /*const res = await request(server)
                .post('/api/genres')
                .send({ name: 'genre1' });*/
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });
        it('should return 400 if genre is less than 5 characters', async () => {
            //const token = new User().generateAuthToken();
            /*const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: '1234' });*/
            name = '1234';
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should return 400 if genre is more than 50 characters', async () => {
            //const token = new User().generateAuthToken();
            // 52 for 51 characters as these are separators
            //const name = new Array(52).join('a');
            name = new Array(52).join('a');
            /*const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: name });*/
            const res = await exec();
            expect(res.status).toBe(400);
        });
        it('should save the genre if it is valid', async () => {
            //const token = new User().generateAuthToken();
            /*const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: 'genre1' });*/
            const res = await exec();
            const genre = await Genre.find({ name: 'genre1' });

            expect(genre).not.toBeNull;
        });
        it('should return the genre if it is valid', async () => {
            //const token = new User().generateAuthToken();
            /*const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: 'genre1' });*/
            const res = await exec();
            const genre = await Genre.find({ name: 'genre1' });

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });
});