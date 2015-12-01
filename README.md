# mqtt-sender

Node module for sending a set of specified messages.

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
  messages: messages
};

sender.start(options);
```
