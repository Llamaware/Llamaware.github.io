{
	const fs = require('fs');

	// Tomb doesn't support replacing `require`s yet.
	// I'm not sure if I'll ever even be able to implement it, since nested `require` calls don't seem to get hooked.
	$tomb.lib.spitroast.instead('require', window, ([path], orig) => {
		if (path === './greenworks/greenworks') {
			const { path } = $tomb.mods.find(mod => mod.id === 'multiplatform');
			return orig(`../tomb/mods/${path}/greenworks/greenworks`);
		}

		return orig(path);
	});
	
	// The game tries to delete this if not running in dev mode, but for some reason it doesn't. Maybe the relative path is different.
	// We cannot just put a value in the greenworks.js file, since the native module reads this file too.
	if (!fs.existsSync('steam_appid.txt'))
		fs.writeFileSync('steam_appid.txt', '2378900');
}
