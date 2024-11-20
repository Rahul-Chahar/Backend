function delayLog(message, delay){
    return new Promise(resolve => {
        setTimeout(()=>{
            console.log(message)
            resolve()
        }, delay)
    })
}

async function printSequence(){
    console.log('a');
    console.log('b');

    await delayLog('c', 3000);

    await delayLog('d', 0);

    console.log('e');
}

printSequence();