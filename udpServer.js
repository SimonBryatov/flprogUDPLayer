const dgram = require('dgram');
const udpSocket = dgram.createSocket('udp4');
const {parseIn, parseOut} = require('./utils/flprogUDPParser');
const socketController = require('./controllers/socketController');
const jsonfile = require('jsonfile');

async function main() {

const config = await jsonfile.readFile('./config.json');

console.log(config)

const SocketController = new socketController(config, udpSocket);

udpSocket.on('error', (err) => {
  console.log(`udpSocket error:\n${err}`);
  throw 1
});

udpSocket.on('message', (msg, rInfo) => {
  console.log(`udpSocket got: ${msg} from ${rInfo.address}:${rInfo.port}`, Math.random());
  let controllerId = config.controllers[rInfo.address]
  if (controllerId) {
    let data = parseIn(msg, controllerId);
    SocketController.emitAction(data);
  } 
});

udpSocket.on('listening', () => {
  const address = udpSocket.address();
  console.log(`udpSocket listening ${address.address}:${address.port}`);
});

udpSocket.bind(config.port);


// setInterval(() => {
//       udpSocket.send("\u0001" + "23" + "\u0002" + a + "\u0003" + 133169674 + "\u0004", "8888", destIP, function(err) {
//         if (err) {
//           return console.log('Error on write: ', err.message);
//         }
//         a = Number(!a);
//         //console.log('message written', a);
//       });
//    // udpSocket.send("alive", "41234")
// }, 500)
}

main();