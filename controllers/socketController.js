const io = require('socket.io-client');
const { parseOut } = require('../utils/flprogUDPParser')

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

class SocketController {
    
    constructor(config, udpSocket) {
        this.socket = io(config.mainHost);
        this.socket.on('connect', () => {
            console.log('connected');
        })
        this.socket.on('disconnect', () => {
            this.socket.sendBuffer=[];
            console.log('disconnected')
        })
        this.socket.on('controller data', (data) => {
            try {
            let controllerIP = getKeyByValue(config.controllers, data.controllerId);
            console.log('received', data, '==>', controllerIP)
            if (controllerIP) udpSocket.send(parseOut(data.ind, data.value, config.flprogCheckValue), '8888', controllerIP, (err) => {})
            } catch(err) {
                //console.log(err)
            }
        })
            
        this.emitAction = (data) => {
            this.socket.emit('controller data', data)
        }
    
    }
}

module.exports=SocketController;