
const chat = socket => {
    socket.on('add friend', msg => {
        console.log(msg)
    });
    socket.on('delete friend', msg => {
        console.log(msg)
    });
    socket.on('send msg', msg => {
        console.log(msg)
    });
}

module.exports =  chat;