import socketio from 'socket.io-client'

const socket = socketio('http://192.168.0.104:3333', {
    autoConnect: false
})

function subToNewDevs(subFunc) {
    socket
        .on('newDev', subFunc)
}

function connect(lat, long, techs) {
    socket.io.opts.query = {
        lat,
        long,
        techs
    }
    socket
        .connect()
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect()
    }
}

export {
    connect,
    disconnect,
    subToNewDevs
}