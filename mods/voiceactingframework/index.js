{
	const fs = require('fs');
	const path = require('path');

	const lineRegex = /\(lines\)\[(.+?)\]/;
	let audio = null;

	// Run once text is wiped
	$tomb.lib.spitroast.after('clear', Game_Message.prototype, function() {
		console.log('end');
		if (audio) {
			audio.stop();
			// Not sure if this'll even do anything, but hopefully it deletes the class
			delete audio;
		}
	});

	$tomb.lib.spitroast.after('command401', Game_Interpreter.prototype, function() {
		// Seems to work, but I believe it'll break if we have multiple lines. The base game doesn't have that though.
		const text = this._list[this._index - 1].parameters[0];

		if (lineRegex.test(text)) {
			const [, id] = text.match(lineRegex);
			const lang = Lang.current();

			if (fs.existsSync(path.join('www/voiceacting', lang, `${id}.ogg`))) {
				// These methods seem to be synchronous
				audio = new WebAudio(`voiceacting/${lang}/${id}.ogg`);
				audio.play();
			}
		}
	});
}
