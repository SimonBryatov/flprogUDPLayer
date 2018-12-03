const dgram = require('dgram');
const udpSocket = dgram.createSocket('udp4');
const {parseIn} = require('./utils/flprogUDPParser');
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
  let controllerId = config.controllers[rInfo.address]
  //console.log(msg.toString());
  if (controllerId) {
    let data = parseIn(msg, controllerId);
    console.log(`Sending: ${rInfo.address}:${rInfo.port} ==>`, data);
    SocketController.emitAction(data);
  } 
});

udpSocket.on('listening', () => {
  const address = udpSocket.address();
  console.log(`udpSocket listening ${address.address}:${address.port}`);
});

udpSocket.bind(config.port);

}

main();

//setTimeout(() => {throw new Error()}, 1000)

process.on('uncaughtException', function (e) {
  let errors = jsonfile.readFileSync('./errors.json')
  jsonfile.writeFileSync('./errors.json', {...errors, [Date.now()]: e})
});