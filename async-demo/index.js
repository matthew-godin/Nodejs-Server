console.log('Before');
/*setTimeout(() => {
    console.log('Reading a user from a database...');
}, 2000);*/
//const user = getUser(1);
/*getUser(1, /*function*///(user) => {
    //console.log('User', user);
    //getRepositories(user.githubUsername,
                //displayRepositories);/*(repos) => {
        //console.log('Repos', repos);
        // With many nested callbacks, we call this
        // callback hell or christmas tree problems
    //});*/
//});
// Using named functions to save ouselves from
// the above issue
//getUser(1, displayUsername);
// Actually, we can use promises to make
// this even better

//console.log(user); // will print undefined as
                   // the function is executed
                   // 2 seconds in the future
// Using promises below
//const p = getUser(1);
//p.then(user => console.log(user));
/*getUser(1)
    .then(user => /*console.log(user)*/
                //getRepositories(user.githubUsername))
    //.then(... next promise)
    //.then(repos => console.log('Repos', repos))
    //.catch(err => console.log('Error', err.message));
// Async and Await just like C# :)
async function displayRepos() {
    try {
        const user = await getUser(1); // functions
                                // called
                                // with await must be
                                // declared as async,
                                // just like in C#
                                // basically
        const repos = await getRepositories(
                                user.githubUsername);
        console.log(repos);
    } catch (err) {
        console.log('Error', err.message);
    }
}
displayRepos();
console.log('After');

/*function displayUsername(user) {
    console.log('User', user);
    getRepositories(user.githubUsername,
        displayRepositories);
}

function displayRepositories(repos) {
    console.log('Repos', repos);
}*/

// Synchronous
//console.log('Before');
//const user = getUser(1);
//const repos = getRepositories(user.githubUsername);
//const commits = getCommits(repos[0]);
//console.log('After');

/*function getUser(id, callback) {
    setTimeout(() => {
        console.log(
            'Reading a user from a database...');
        callback({ id: id, githubUsername: 'mat302' });
        //return { id: id, githubUsername: 'mat302' };
    }, 2000);
    //return 1;
}*/
// Let's do it with promises
function getUser(id) {
    return new Promise((resolve, reject) => {
        // async work
        setTimeout(() => {
            console.log(
                'Reading a user from a database...');
            resolve(
                { id: id, githubUsername: 'mat302' });
        }, 2000);
    });
}
// There is 3 patterns to deal with asynchronous code
// 1. Callbacks
// 2. Promises
// 3. Async/Await (basically some syntactical sugar
//                 over promises)
/*function getRepositories(username, callback) {
    setTimeout(() => {
        console.log(
            'Calling Github API...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}*/

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(
                'Calling Github API...');
            //resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('error'));
        }, 2000);
    });
}