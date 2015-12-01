var mqtt = require('mqtt');

var url = process.env.MQTT_URL || 'mqtt://192.168.99.100';
var messages = require('./messages.json');
var max = messages.length;
var current = 0;
var delay = 1000;
var connected = false;

console.log('Host url: %s', url);
console.log('Messages: ', messages);

var client = mqtt.connect(url);

client.on('connect', onConnected);
client.on('close', onClose);
client.on('message', (topic, message) => console.log('Received on %s: %s', topic, message.toString()));
client.on('error', (error) => console.log('error', error));

function onConnected() {
  connected = true;
  console.log('Connected.');
  client.subscribe('#', onSubscribed);
  setTimeout(nextMessage, delay);
}

function onClose() {
  connected = false;
  console.log('Closed');
}

function onSubscribed(err, granted) {
  if (err) throw err;
  console.log('Subscribed to:', granted);
}

function nextMessage() {
  if (connected) {
    publishMessage(messages[current % max]);
    current = current + 1;
    setTimeout(nextMessage, delay);
  }
}

function publishMessage(message) {
  var payload = JSON.stringify(message.payload);
  client.publish("test/topic", payload);
  console.log('Published', payload);
}
