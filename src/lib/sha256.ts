import { createHash } from 'node:crypto';

export function sha256(data: ArrayBuffer): string {
	const hasher = createHash('sha256');

	hasher.setEncoding('hex');
	hasher.write(new Uint8Array(data));
	hasher.end();

	return hasher.read();
}