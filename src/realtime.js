'use strict'

import engine from 'socket.io'

export default function realtime (server) {
  const io = engine(server)

  io.on('connection', onConnection)

  function onConnection (socket) {
    socket.on('echo', message => {
      socket.emit('echo', `${message}++`)
    })
  }

  return io
}