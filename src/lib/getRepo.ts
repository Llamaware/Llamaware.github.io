// imports
import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';

// paths (configurable)
const modsFolder = path.resolve('./src/content/mods');
const outputFilePath = path.resolve('./src/content/repos/repo.json');

// data structures
type ModData = {
    lastUpdate: string;
    url: string;
    source: string;
    sha256: string;
    icon?: string;
    [key: string]: any; 
};

type CombinedModData = ModData & {
    modJsonContent: string; 
};

// format based on what kind of vc host you are using
function getGithubJSON(source: string): string {
    // match the url
    const repoPattern = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/tree\/([^\/]+)\/(.+))?/;
    const match = source.match(repoPattern);
    // extract various (and some optional) parameters
    const username = match[1];
    const repoName = match[2]; 
    const branch = match[3] || "main"; 
    const folders = match[4] ? match[4].split('/') : []; 
    // construct the base raw url
    let rawUrl = `https://raw.githubusercontent.com/${username}/${repoName}/refs/heads/${branch}`;
    // append the folders if they exist
    if (folders.length > 0) {
        rawUrl += `/${folders.join('/')}`;
    }
    // append mod json and return
    rawUrl += "/mod.json";
    return rawUrl;
}

function getCodebergJSON(source: string): string {
    // match the url
    const repoPattern = /https:\/\/codeberg\.org\/([^\/]+)\/([^\/]+)(?:\/src\/branch\/([^\/]+)\/(.+))?/;
    const match = source.match(repoPattern);
    // extract various (and some optional) parameters
    const username = match[1]; 
    const repoName = match[2]; 
    const branch = match[3] || "main"; 
    const folders = match[4] ? match[4].split('/') : []; 
    // construct the base raw url
    let rawUrl = `https://codeberg.org/${username}/${repoName}/raw/branch/${branch}`;
    if (folders.length > 0) {
        rawUrl += `/${folders.join('/')}`;
    }
    // append and return
    rawUrl += "/mod.json";
    return rawUrl;
}

function getModJSON(source: string) {
    // support: Github and Codeberg (as of now)
    const githubMatch = source.match(/github.com\/([^/]+)\/([^/]+)/);
    const codebergMatch = source.match(/codeberg.org\/([^/]+)\/([^/]+)/);
    // format based on the match
    if (githubMatch) return getGithubJSON(source);
    if (codebergMatch) return getCodebergJSON(source);
    return "There was an issue with a mod source url!";
}

// main function to generate the repo
async function generateRepoJson() {
    // make the output directory
    await fs.mkdir(path.dirname(outputFilePath), { recursive: true });
    // if repo.json already exists, delete it
    try {
        await fs.unlink(outputFilePath);
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
    }
    // get all files in the mods directory
    const modFiles = await fs.readdir(modsFolder);
    const repoData: CombinedModData[] = [];
    for (const fileName of modFiles) {
        // read and parse each mod JSON file
        const modFilePath = path.join(modsFolder, fileName);
        const modData: ModData = JSON.parse(await fs.readFile(modFilePath, 'utf8'));
        // fetch the mod.json content from the specified URL
        const modJsonUrl = getModJSON(modData.source);
        try {
            // fetch the json
            const response = await fetch(modJsonUrl);
            if (!response.ok) throw new Error(`Failed to fetch mod.json from ${modJsonUrl}`);
            let modJsonContent = await response.json();
            // minify it and convert to string
            modJsonContent = JSON.stringify(modJsonContent);
            // combine data
            const combinedData: CombinedModData = {
                ...modData,
                modJsonContent: String(modJsonContent)
            };

            repoData.push(combinedData);
        } catch (error) {
            console.error(`Error fetching mod.json for ${fileName}:`, error);
        }
    }
    // write the output
    await fs.writeFile(outputFilePath, JSON.stringify(repoData, null, 2), 'utf8');
}

export default generateRepoJson;
