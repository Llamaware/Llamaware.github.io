import cache from '.';
import { sha256 } from '../sha256';

export default async function url(url: string, expectedHash: string): Promise<ArrayBuffer> {
	if (cache.has(expectedHash)) return cache.read(expectedHash);

	const res = await fetch(url);
	const data = await res.arrayBuffer();
	const hash = sha256(data);

	if (expectedHash.toLowerCase() !== hash)
		throw new Error(`Hash mismatch when fetching "${url}": Expected hash ${expectedHash} but got hash ${hash}`);

	cache.write(expectedHash, data);

	return data;
}
