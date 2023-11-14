//use case is , implement something like promise.all() where all the promises will be executed and will resolve only after all ends, iky get the idea


//this function reolves or rejects promise randomly and there is a delay to do that which is also random
const promiseResolver = async () => {
    const delay = Math.floor(Math.random() * 10);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (delay > 5) resolve(`value : ${delay}`)
            else reject(`Error: ${delay}`);
        }, delay * 1000);
    })
    // .catch((error) => {
    //     // Handle the rejection locally
    //     console.error(`Caught rejection in promiseResolver(${num}):`, error);
    //     throw error; // Rethrow the error to maintain the rejection in the chain
    // });

}


const asyncTasks = [promiseResolver(), promiseResolver(), promiseResolver(), promiseResolver(), promiseResolver(), promiseResolver(), fetch('http://localhost:3500/json').then(data=>data.json())];

const myPromiseDotAll = (tasks, callBack)=>{
    let resolved = [];
    let rejected = [];
    let completed = 0;
    tasks.forEach(task =>
        task
            .then((data) => {
                resolved.push(data)
                // console.log('Resolved in .then', resolved);
            })
            .catch((err) => {
                rejected.push(err)
                // console.log('Rejected in .catch', rejected);

            })
            .finally(() => {
                // console.log('completed', completed);
                completed =completed + 1;
                if (completed  === tasks.length) {
                    // console.log('Called');
                    callBack(resolved, rejected);
                }
            })
    )
}

myPromiseDotAll(asyncTasks, (resolved, rejected) => {
    console.log('Resolved', JSON.stringify(resolved))
    console.log('Rejected', JSON.stringify(rejected))

})

async function f() {
    const data = await Promise.all([promiseResolver() , promiseResolver()]);
    console.log('Data ', data);
}
// f();
// to run this function , you need all of the promises to be resolved , so in the promiseResolver function , change the if statement


process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the error or log it as needed
});