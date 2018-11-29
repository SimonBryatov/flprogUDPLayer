const io = require('socket.io-client');
const { parseOut } = require('../utils/flprogUDPParser')

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

class SocketController {
    
    constructor(config, udpSocket) {
        this.socket = io(config.mainHost);
        this.socket.on('connection', () => {
            this.socket.sendBuffer = [];
        })
        this.socket.on('controller data', (data) => {
            let controllerIP = getKeyByValue(config, data.controllerId);
            if (controllerIP) udpSocket.send(parseOut(data.ind, data.value, config.flprogCheckValue), '8888', controllerIP, (err) => {})
        })
            
        this.emitAction = (data) => {
            this.socket.emit('controller data', data)
        }
    
    }
}

module.exports=SocketController;