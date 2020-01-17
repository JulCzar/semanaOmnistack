const socketio = require('socket.io')
const parseStrAsArr = require('./utils/parseStrAsArr')
const calcDist = require('./utils/calcDist')

let io
const connections = []

exports
  .setupWebsocket = (server ) => {
    io = socketio(server)

    io.on('connection', socket => {
      const { lat, long, techs } = socket.handshake.query

      connections
        .push({
          id : socket.id,
          coords: {
            lat: Number(lat),
            long: Number(long),
          },
          techs: parseStrAsArr(techs)
        })
    })
  }

exports
  .findConnections = (coords, techs) => {
    
    return connections
      .filter(connection => {
        console.log(calcDist(coords, connection.coords))

        return calcDist(coords, connection.coords) < 10 
          && connections.techs.some(techs.include)
    })
  }

exports
  .sendMessage = (to, message, data) => {
    to.forEach(connection => {
      io
        .to(connection.id)
        .emit(message, data)
    })
  }