# mqtt-sender

Node module for sending a set of specified messages.

## example use
```javascript
var sender = require('mqtt-sender');

var messages = [
  {
    "topic": "test",
    "payload": { "hello": "world" }
  },
  {
    "topic": "another/topic",
    "payload": { "goodbye": "space" }
  }
];

var options = {
  url: 'mqtt://localhost',
  messages: messages,
  delay: 3000
};

sender.start(options);
```

## config
Use environment variable `DEBUG=mqtt-sender` for more verbose output.
