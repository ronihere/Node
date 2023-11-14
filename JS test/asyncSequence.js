//create a function that takes a list of asynchronous tasks and completes them one By one

const promiseResolver = (num) => {
    const delay = Math.floor(Math.random() * 10);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (delay > 5) resolve(`${num}Resolved : , ${delay}`);
            else reject(`${num}Rejected : , ${delay}`);
        }, delay * 1000);
    })
    // .catch((error) => {
    //     // Handle the rejection locally
    //     console.error(`Caught rejection in promiseResolver(${num}):`, error);
    //     throw error; // Rethrow the error to maintain the rejection in the chain
    // });

}

const asyncTasks = [promiseResolver(0), promiseResolver(1), promiseResolver(2), promiseResolver(3)];

const synchronousPromises = async (tasks, callback) => {//callback will be called once all the tasks are performed with the results 
    let resolved = [];
    let rejected = [];

    for (let task of tasks) {
        try {
            const response = await task;
            resolved.push(response);
        } catch (error) {
            rejected.push(error);
        }
    }

    callback(resolved, rejected);
}

synchronousPromises(asyncTasks, (resolved, rejected) => {
    console.error('Rejected ', rejected);
    console.log('Resolved', resolved);
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the error or log it as needed
});