export async function timeOut(cb, time = 500) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(cb())
        }, time);
    })
}
