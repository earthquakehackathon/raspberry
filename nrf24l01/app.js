var spiDev = '/dev/spidev0.0';
var cePin = 17;
var irqPin = 4;
var radio = require('nrf').connect(spiDev, cePin, irqPin);
radio.channel(0x4c).dataRate('1Mbps').crcBytes(2).autoRetransmit({count:15, delay:4000});
radio.begin(function () {
    var rx = radio.openPipe('rx', 0xF0F0F0F0E1),
        tx = radio.openPipe('tx', 0xF0F0F0F0D2);
    rx.pipe(tx);        // echo back everything
});
