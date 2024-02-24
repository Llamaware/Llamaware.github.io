import { Show, createEffect, createSignal, onCleanup } from 'solid-js';

import './theme.scss';

const songList = [
	{ title: 'Necros - Point of Departure', file: '/music/Necros - Point of Departure.webm' },
	{ title: 'Jugi - Onward Ride', file: '/music/Jugi - Onward Ride.webm' },
];

function formatPosition(seconds: number) {
	const secs = Math.floor(seconds % 60);
	const mins = Math.floor(seconds / 60);

	return mins.toString().padStart(2, '0')
		+ ':'
		+ secs.toString().padStart(2, '0');
}

export default function Player() {
	const [index, setIndex] = createSignal(0);
	const currentSong = () => songList[index()];

	const [audio, setAudio] = createSignal<HTMLAudioElement|undefined>();
	const [playing, setPlaying] = createSignal(false);
	const [position, setPosition] = createSignal('00:00');

	createEffect(() => {
		const song = currentSong();
		const audio = new Audio(song.file);

		const updatePosition = (time?: number) =>
			setPosition(formatPosition(time ?? audio.currentTime));

		// Will this potentially cause a state mismatch?
		const play = () => setPlaying(true) && updatePosition();
		const pause = () => setPlaying(false) && updatePosition();
		audio.addEventListener('play', play);
		audio.addEventListener('pause', pause);
		audio.addEventListener('ended', forward);

		const int = setInterval(updatePosition, 1000);
		updatePosition(0);
		setAudio(audio);

		audio.volume = 0.25;
		audio.play();

		onCleanup(() => {
			audio.pause();
			audio.removeEventListener('play', play);
			audio.removeEventListener('pause', pause);

			clearInterval(int);
		});
	});

	function togglePlayback() {
		if (playing()) audio()?.pause();
		else audio()?.play();
	}

	function forward() {
		setIndex(index => {
			if (index >= songList.length - 1) return 0;
			return index + 1;
		});
	}

	function backward() {
		setIndex(index => {
			if (index <= 0) return songList.length - 1;
			return index - 1;
		});
	}

	// const song
	return <div class='player'>
		<div class='playerControls'>
			<button onClick={backward}>⏮</button>

			<button onClick={togglePlayback} class='playerBigButton'>
				<Show when={playing()} fallback='⏵'>⏸</Show>
			</button>

			<button onClick={forward}>⏭</button>
		</div>

		<div class='playerMiddle'>
			{/* @ts-expect-error Surprisingly, a <marquee> is the cleanet way to implement this, while also being on-brand! */}
			<marquee class='playerSongTitle'>{currentSong().title}</marquee>
			<span class='playerSoftware'>LlamaPlayer 4.0</span>
		</div>

		<span class='playerProgress'>
			{position()}
		</span>

		{/* volume */}
		{/* playlist */}
	</div>;
}
