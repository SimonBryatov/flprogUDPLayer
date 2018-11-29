const dgram = require('dgram');
const udpSocket = dgram.createSocket('udp4');
const {parseIn, parseOut} = require('./flprogUDPParser')
const jsonfile = require('jsonfile');

async function main() {

let config = await jsonfile.readFile('./config.json');  

udpSocket.on('error', (err) => {
  console.log(`udpSocket error:\n${err}`);
  udpSocket.close();
});

udpSocket.on('message', (msg, rinfo) => {
  console.log(`udpSocket got: ${msg} from ${rinfo.address}:${rinfo.port}`, Math.random());
  sSender(msg.toString());
});

udpSocket.on('listening', () => {
  const address = udpSocket.address();
  console.log(`udpSocket listening ${address.address}:${address.port}`);
});

udpSocket.bind(8888);


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