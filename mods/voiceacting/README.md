Voice acting mod for the Tomb mod loader. Does not come with any audio by itself, but instead allows you to supply audio to play the lines that characters say.

To add your own voicelines, make a folder called `voicelines` in the `www` folder. In `voicelines`, make a new folder for whatever language you want to to add voicelines for, i.e. `english` for English. For fan translations of the game, I believe it has to be named the same as the folder. Then, inside of that language folder, put the audio files for the voicelines.

The audio files should be .ogg files (Ogg Vorbis, specifically) named after the the localization `linesLUT` entry. For example, for the line that corresponds with the id `F6mK5ZQ0`, you would have a file called `F6mK5ZQ0.ogg`, encoded in Ogg Vorbis.

Should work for all base-game lines, but the implementation relies on text being formatted a specific way (one line, just like the game), so it has the potential to break on modded content.
