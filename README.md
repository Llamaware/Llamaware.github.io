# Llamaware Web Site

## Sources

- http://textfiles.com/underconstruction
- https://github.com/markjames/famfamfam-silk-icons
- All web buttons under "Members" are courtesy and copyright of those they link to.
- https://www.keshikan.net/fonts-e.html

## License

All code is licensed as per the `LICENSE` file, but all files in `public/` are property of their copyright holders.

## Add a Mod

Want to add a mod? Make a pull request and add a new `.json` file to the `src/content/mods/` file.

Every time you update your mod, you will have to make another pull request. This is to prevent malicious code, as all mod processing must go through us in this repository.

Here is an example:
```jsonc
{
	"lastUpdate": "2024-01-01T00:00:00Z",
	"url": "https://example.com/path/to/your/mod.zip",
	"source": "https://example.com/path/to/the/source/code",
	"sha256": "The sha256 hash of your zip file"
}
```
- `tags` - Optional parameter. An array of strings. See below for more information.
- `lastUpdate` - When the last update to this mod. Every time you update it, The date format is `YYYY-MM-DD`, along with the `T00:00:00Z` string at the end.
- `url` - The URL to your ZIP file, which will be automatically downloaded and a copy will be hosted on the website.
- `source` - Optional parameter (but recommended). A link to the source code of the mod.
- `sha256` The sha256 hash of the ZIP file. The hash of the retrieved file in `url` must match this.

If your mod contains generative AI assets in any form, whether that be GitHub Copilot, LLM-generated text, AI generated art or music, or anything else, include the optional `tags` parameter, and add the `gen-ai` tag:
```jsonc
{
	"tags": ["gen-ai"],
	// The rest of the JSON
}
```
