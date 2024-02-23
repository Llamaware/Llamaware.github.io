// Disable self if not needed
if (
	process.platform !== 'darwin'
	&& (
		process.platform !== 'linux'
		&& (
			process.arch !== 'x64'
			&& process.arch !== 'ia32'
		)
	)
) {
	$tomb.mods = $tomb.mods.filter(mod => mod.id !== 'multiplatform');
}

// Make sure we're not a .zip
if ($tomb.mods.find(mod => mod.id === 'multiplatform').type !== 'folder')
	throw new Error('Multiplatform mod must be extracted into a folder');
