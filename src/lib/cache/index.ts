import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import url from './url';

const path = (id: string) => join('.cache', id);
const ensureCache = () => !existsSync('.cache') && mkdirSync('.cache');

const has = (id: string) => existsSync(path(id));
const read = (id: string): ArrayBuffer => readFileSync(path(id));
const write = (id: string, data: ArrayBuffer) => { ensureCache(); writeFileSync(path(id), new Uint8Array(data)); }

export default { has, read, write, url };
