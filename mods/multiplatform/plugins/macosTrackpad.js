if (process.platform == 'darwin') {
	// Disable the two finger dragging around
	document.body.style.overflow = 'hidden';
	
	// Disable zooming with trackpad
	document.addEventListener('wheel', e => {
		// Spews
		if (e.ctrlKey) return e.preventDefault();
	}, { passive: false });

	// Prevent the game from adding its own wheel listener (which isn't even used), because otherwise the console prints:
	// [Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/feature/6662647093133312
	$tomb.lib.spitroast.instead('addEventListener', document, (args, orig) => {
		if (args[0] === 'wheel') return;

		return orig(...args);
	});
}
