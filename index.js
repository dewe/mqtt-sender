var mqtt = require('mqtt');
var debug = require('debug')('mqtt-sender');

exports.start = function(options) {
  if (!options.url) throw new Error('missing options.url');
  if (!options.messages) throw new Error('missing options.messages');

  var url = options.url;
  var messages = options.messages;
  var delay = options.delay || 1000;

  var max = messages.length;
  var current = 0;
  var connected = false;

  console.log('Host url: %s', url);
  debug('Messages: ', messages);

  var client = mqtt.connect(url);
  client.on('connect', onConnected);
  client.on('close', onClose);
  client.on('message', (topic, message) => debug('Received on %s: %s', topic, message.toString()));
  client.on('error', (error) => console.log('error', error));

  function onConnected() {
    connected = true;
    console.log('Connected.');
    client.subscribe('#', onSubscribed);
    setTimeout(nextMessage, delay);
  }

  function onClose() {
    connected = false;
    debug('Closed.');
  }

  function onSubscribed(err, granted) {
    if (err) throw err;
    debug('Subscribed to:', granted);
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
    var topic = message.topic;
    client.publish(topic, payload);
    console.log('Published to %s', topic, payload);
  }
};
