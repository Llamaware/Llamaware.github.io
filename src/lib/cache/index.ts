import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import url from './url';

const l = (id: string) => id.toLowerCase();
const path = (id: string) => join('.cache', l(id));
const ensureCache = () => !existsSync('.cache') && mkdirSync('.cache');

const has = (id: string) => existsSync(path(l(id)));
const read = (id: string): ArrayBuffer => readFileSync(path(l(id)));
const write = (id: string, data: ArrayBuffer) => { ensureCache(); writeFileSync(path(l(id)), new Uint8Array(data)); }

export default { has, read, write, url };
export { l };
