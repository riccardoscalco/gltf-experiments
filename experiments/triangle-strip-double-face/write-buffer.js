#!/usr/bin/env node

const writeBufferFile = require('../../src/write-buffer-file');

const data = {
	vertices: [
		1, 0., 0,
		0., 1, 0.,
		0., 0., 0.
	],
	indexes: [
		0,
		1,
		2,
		0
	]
}

writeBufferFile(data);