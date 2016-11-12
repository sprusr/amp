var P2P = require('socket.io-p2p');
var io = require('socket.io-client');

window.play = function() {
  navigator.getUserMedia({audio:true}, function(stream) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);
    var mediaStreamDestination = audioContext.createMediaStreamDestination();
    mediaStreamSource.connect(mediaStreamDestination);

    var socket = io();
    var p2p = new P2P(socket, {peerOpts: {stream: mediaStreamDestination.stream}});

    p2p.on('ready', function() {
      p2p.usePeerConnection = true;
    });

    p2p.emit('ready', { peerId: p2p.peerId });
  }, function(err) {
    console.log(err);
  });
};

window.listen = function() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioContext = new AudioContext();

  var socket = io();
  var p2p = new P2P(socket);

  p2p.on('ready', function() {
    p2p.usePeerConnection = true;
  });

  p2p.on('stream', function(stream) {
    var audio = document.querySelector('audio');
    console.log(stream);
    window.stream = stream;
    audio.src = window.URL.createObjectURL(stream);
    audio.play();
  });

  p2p.emit('ready', { peerId: p2p.peerId });
};
