"use strict";
const Graph = require('node-dijkstra')
const mqtt = require('mqtt');
const fs = require('fs');

const KEY = __dirname + '/private.pem.key';
const CERT = __dirname + '/certificate.pem.crt';

const connectOptions = {
    host: "yout_iot_endpoint.amazonaws.com",
    port: 8883,
    protocol: "mqtts",
    keepalive: 10,
    clientId: "RaspberryPi3",
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 2000,
    connectTimeout: 2000,
    key: fs.readFileSync(KEY),
    cert: fs.readFileSync(CERT),
    rejectUnauthorized: false,
};

var route = new Graph()
 
route.addNode('A', { B:1, F: 2 })
route.addNode('B', { A:1, G:4, C: 5 })
route.addNode('C', { B:5, D:1 })
route.addNode('D', { C:1, E:2 })
route.addNode('F', { A:1, M:2 })
route.addNode('G', { B:4, H:2, N: 5 })
route.addNode('H', { G:2, I:3 })
route.addNode('I', { H:3, D:6, L:10,P:2 })
route.addNode('L', { I:10, Q:3 })
route.addNode('M', { F:2, N:3 })
route.addNode('N', { M:3, G:5, O:2 })
route.addNode('O', { N:2, P:1 })
route.addNode('P', { O:1, I:2, Q:1 })
route.addNode('Q', { P:1, L:3 })

var client = mqtt.connect(connectOptions);
client.on('connect', function () {
  client.subscribe('graph')
  client.publish('graph', JSON.stringify({"node":"T",neighbors:{ F:2, N:3 }}))
})
