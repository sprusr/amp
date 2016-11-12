# amp

Wireless amp system using mobile phones. Uses WebRTC for P2P audio streaming.

## Getting started

Generate the JavaScript bundle with `browserify public/js/amp.js -o public/js/bundle.js`. Then do an `npm install`, and finally `node app.js`. You can then access the app on port 8000.

## Current issues

 - Latency over network is too much
 - Mobile audio device latency can be bad
