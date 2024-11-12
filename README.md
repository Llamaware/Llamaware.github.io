# Llamaware Web Site

## Mod Depository

Llamaware's main offering is a page for downloading mods for The Coffin of Andy and Leyley. By sharing your mod here, you can make it easier for others to find and install it. The mods listed use the standard [`mod.json` format](https://coffin-wiki.basil.cafe/modding/mod-json) (the format used by the [Tomb](https://codeberg.org/basil/tomb) modloader); any submitted mods must be in that format as well.

### Adding Your Mod

1. Host your mod file (`.zip`) for download (and optionally, the source code)—[GitHub](https://www.github.com) and [Codeberg](https://codeberg.org) are good places to do so.
2. Make a new `.json` file that matches the format below. 
3. Make a pull request and add your file to the `src/content/mods/` directory.
4. Everytime you update your mod, you will have to make another pull request. **This is to prevent malicious code, as all mod processing must go through us in this repository.**

#### The Mod Entry Format

This is an example of what a JSON file for a mod looks like:

```json
{
	"lastUpdate": "2024-01-01T00:00:00Z",
	"url": "https://example.com/path/to/your/mod.zip",
	"source": "https://example.com/path/to/the/source/code",
	"sha256": "The SHA-256 hash of your zip file",
}
```

These are the fields that the file can contain:

- `url` - The URL to your ZIP file, which will be automatically downloaded and a copy will be hosted on the website.
- `sha256` - The SHA-256 hash of the ZIP file, which must match the hash of the file fetched from the `url` field. (You can get this by running `Get-FileHash <path>` on Windows or `sha256sum <path>` on Linux.)
- `lastUpdate` - When the last update to this mod. Every time you update it, The date format is `YYYY-MM-DD`, along with the `T00:00:00Z` string at the end.
- `source` (optional (but recommended!)) - A link to the source code of the mod. Ideally, hosted on either [Github](https://www.github.com) or [Codeberg](https://www.codeberg.org).
- `tags` (optional) - An array of strings that contain information about your mod - see below.

#### Tagging Your Mod

Tags are a quick way to organise mods into various categories. **They are optional, except for `gen-ai`** (if applicable). Here are some tags that you can apply:

- `gen-ai` - If your mod contains the output of generative AI, defined here as LLM-generated text, artwork/images, music/sounds, or assets *other than code*, **add this tag.** If your mod contains LLM-generated code, simply let us know in your PR.
- `content` - Mods that extend the gameplay of the game (for example, adding new dialogue or interactions).
- `dev` - Mods that are intended for developers/to aid in the development in content surrounding the game.
- `qol` - Mods intended for quality of life features (for example, bug fixes or accessibility features).
- `lib` - Mods intended to be a shared code library for other mods.
- `mature` - Mods that contain more mature themes that require viewer discretion.

To apply tags, add the tag field with an array of tags to the mod entry JSON, like so:

```jsonc
{
	// the rest of the JSON
	"tags": ["gen-ai", "content"],
}
```

### Getting the Mods List

If you're writing a tool, i.e. a mod installer, it might be useful to access a list of all of the mod entries in the depository alongside their `mod.json`s. Said information can be fetched from the following URL: https://llamawa.re/repo.json

## Sources

- http://textfiles.com/underconstruction
- https://github.com/markjames/famfamfam-silk-icons
- All web buttons under "Members" are courtesy and copyright of those they link to.
- https://www.keshikan.net/fonts-e.html

## License

All code is licensed as per the `LICENSE` file, but all files in `public/` are property of their copyright holders.
