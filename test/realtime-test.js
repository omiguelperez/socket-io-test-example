'use strict'

import io from 'socket.io-client'
import http from 'http'
import realtime from '../src/realtime'

let socket
let httpServer
let httpServerAddr
let ioServer

describe('Realtime Server', () => {
  before((done) => {
    httpServer = http.createServer().listen()
    httpServerAddr = httpServer.address()
    ioServer = realtime(httpServer)
    done()
  })
  
  after((done) => {
    httpServer.close()
    ioServer.close()
    done()
  })
  
  beforeEach((done) => {
    let url = `http://localhost:${httpServerAddr.port}`
    socket = io.connect(url)
  
    socket.on('connect', () => {
      done()
    })
  })

  afterEach((done) => {
    if (socket.connected) {
      socket.disconnect()
    }

    done()
  })

  it('send message', (done) => {
    socket.emit('echo', 'Hello World!')

    socket.on('echo', (message) => {
      expect(message).to.be.ok
        .and.to.be.an('string')
        .and.to.equal('Hello World!++')
      done()
    })
  })
})
