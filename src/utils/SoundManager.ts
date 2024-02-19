const SoundManager = {
	playSound: (soundFilePath: string) => {
		const audio = new Audio(soundFilePath);
		audio.play();

		return audio;
	},

	stopSound: (audioObj: HTMLAudioElement) => {
		console.log("stopping music...", audioObj);
		audioObj.pause();
	},
};

export default SoundManager;
