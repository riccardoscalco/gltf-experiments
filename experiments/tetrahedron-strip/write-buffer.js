#!/usr/bin/env node

const writeBufferFile = require('../../src/write-buffer-file');

const r = 1;
const a = r * 3**.5;
const h = a / 3 * 6**.5;

const data = {
	vertices: [
		r, 0, 0,
		-r / 2, 0, r / 2 * 3**.5,
		-r / 2, 0, -r / 2 * 3**.5,
		0, h, 0
	],
	indexes: [
		0,
		1,
		2,
		3,
		0,
		1
	]
}

writeBufferFile(data);