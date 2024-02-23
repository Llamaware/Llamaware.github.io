// Set where the game saves data
switch (process.platform) {
	case 'darwin':
		process.env.APPDATA = process.env.HOME + '/Library/Application Support';
		break;
	case 'linux':
		process.env.APPDATA = process.env.HOME + '/.config';
		break;
}
