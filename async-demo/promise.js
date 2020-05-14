const p = new Promise((resolve, reject) => {
    // async work
    setTimeout(() => {
        //resolve(1); goes from pending to
                      // resolved/fulfilled
        reject(new Error('message')); // goes from
                                      // pending to
                                      // rejected
    }, 2000);
    //resolve(1);
    //reject(new Error('message'));
});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));