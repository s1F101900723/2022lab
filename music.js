"use strict";

var webAudio;

window.onload = function () {
	document.getElementById('startbutton').addEventListener('click', start);
	document.getElementById('stopbutton').addEventListener('click', stop);
}

function start(event) {
	if (!webAudio) {
		webAudio = new WEBAUDIO();
		webAudio.init(startProc);
	} else {
		startProc();
	}
}

function startProc() {
	if (!webAudio) return;
	var freq = document.getElementById('freq').value;
	webAudio.setFrequency(freq);
	webAudio.getAudioContext().resume();
}

function stop() {
	if (!webAudio) return;
	webAudio.getAudioContext().suspend();
}