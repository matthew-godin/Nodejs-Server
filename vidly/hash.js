const bcrypt = require('bcrypt');
// We need to put a salt before and 
// after the password (it's simply
// a random string of characters
// to not make it possible for
// hackers to compare the hash
// against password hashes
async function run() {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', salt);
    console.log(salt);
    console.log(hashed);
}

run();