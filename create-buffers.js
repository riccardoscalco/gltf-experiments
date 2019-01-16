#!/usr/bin/env node

// const fs = require('fs');
const program = require('commander');
const ora = require('ora');
// const btoa = require('btoa-lite');
const writeBufferFile = require('./write-buffer-file');

const spinner = ora();
spinner.color = 'blue';

let outputFile;

program
	.version('1.0.0')
	.option('-o, --out <out.bin>', 'the out file')
	.action(() => {
		outputFile = program.out;
	})
	.parse(process.argv);

const l = .01;

const data = {
	vertices: [
		l, 0., 0,
		0., l, 0.,
		0., 0., 0.,
		l, l, 0.
	],
	indexes: [
		1,
		2,
		3,
		0
	]
}

// const data = {
// 	vertices: [
// 		l, 0., 0,
// 		0., l, 0.,
// 		0., 0., 0.,
// 		l, l, 0.
// 	],
// 	indexes: [
// 		1,
// 		2,
// 		3,
// 		2,
// 		0,
// 		3
// 	]
// }


spinner.start();
// const uri = createUri();
writeBufferFile(data);
// console.log(uri);
spinner.succeed('Done!');