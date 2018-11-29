const dgram = require('dgram');
const udpSocket = dgram.createSocket('udp4');

udpSocket.bind(8889);


setInterval(() => {
      udpSocket.send("\u0001" + "23" + "\u0002" + Math.random() + "\u0003" + 133169674 + "\u0004", "8888", '127.0.0.1', function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
        //a = Number(!a);
        console.log('message written');
      });
}, 500)
