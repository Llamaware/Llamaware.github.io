# Llamaware Web Site

## Adding Your Mod!
The Llamaware website offers a convenient repository for TCOAAL mods in the [Tomb](https://codeberg.org/basil/tomb) modloader format. By sharing your mod here, you can make it easier for others to find and install your mod.


**To add your mod to Llamawa.re:**
1. Host your mod file (`.zip`) for download (and optionally, source code and/or an icon) - [GitHub](https://www.github.com) and [Codeberg](https://codeberg.org) are good for these.
2. Make a new `.json` file that matches the format below. 
3. Make a pull request and add your file to the `src/content/mods/` directory.
4. Everytime you update your mod, you will have to make another pull request. **This is to prevent malicious code, as all mod processing must go through us in this repository.**

<br/>**The `mod.json` format:**
```jsonc
{
	"lastUpdate": "2024-01-01T00:00:00Z",
	"url": "https://example.com/path/to/your/mod.zip",
	"source": "https://example.com/path/to/the/source/code",
	"sha256": "The sha256 hash of your zip file"
}
```

<br>**The fields:**
- `tags (optional)` - An array of strings that contain information about your mod - see below.
- `lastUpdate` - When the last update to this mod. Every time you update it, The date format is `YYYY-MM-DD`, along with the `T00:00:00Z` string at the end.
- `url` - The URL to your ZIP file, which will be automatically downloaded and a copy will be hosted on the website.
- `source (optional)` - A link to the source code of the mod. Ideally, hosted on either [Github](https://www.github.com) or [Codeberg](https://www.codeberg.org).
- `sha256` - The sha256 hash of the ZIP file. The hash of the retrieved file in `url` must match this. (You can get this by running `Get-FileHash <path>` on Windows or `sha256sum <path>` on Linux.)

<br/>**Tagging your mod:**<br/>
Tags are a quick way to organise mods into various categories. **They are optional, except for gen-ai. (if applicable)** Here are some tags that you can apply:
- `gen-ai` - If your mod contains the output of generative AI, defined here as LLM-generated text, artwork/images, music/sounds, or assets *other than code*, **add this tag.** If your mod contains LLM-generated code, simply let us know in your PR.
- `content` - Mods that extend the gameplay of the game (for example, adding new dialogue or interactions).
- `dev` - Mods that are intended for developers/to aid in the development in content surrounding the game.
- `qol` - Mods intended for quality of life features (for example, bug fixes or accessibility features).
- `lib` - Mods intended to be a shared code library for other mods.
- `mature` - Mods that contain more mature themes that require viewer discretion.

<br>**Here is how you would apply tags:**
```jsonc
{
	"tags": ["gen-ai", "content"],
	// The rest of the JSON
}
```

## Repository API
Llamaware provides a single JSON file with all the mods in the repository. For each entry, the repository json contains data from the [mod entry in the repository](https://github.com/Llamaware/Llamaware.github.io/tree/main/src/content/mods) and the [mod.json spec](https://coffin-wiki.basil.cafe/modding/mod-json). Simply make a GET request to `llamawa.re/repo.json` to get the repository data.

## Sources

- http://textfiles.com/underconstruction
- https://github.com/markjames/famfamfam-silk-icons
- All web buttons under "Members" are courtesy and copyright of those they link to.
- https://www.keshikan.net/fonts-e.html

  
## License

All code is licensed as per the `LICENSE` file, but all files in `public/` are property of their copyright holders.