#!/usr/bin/env node

const writeBufferFile = require('../../src/write-buffer-file');
const writeJsonFile = require('write-json-file');
const getObj = require('./gltf.js');

const data = {
	vertices: [
		0, 0, 0,
		0, 1, 0,
		1, 0, 0,
		1, 1, 0
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

const nodes = setNodes();

writeBufferFile(data);
const obj = getObj(data, nodes);
(async () => {
	await writeJsonFile('model.gltf', obj);
})();


function getNode (
		translation = [1,1,1],
		rotation = [0,0,0,1],
		scale = [1,1,1]
) {
	return {
		mesh: 0,
		translation,
		rotation,
		scale
	};
}

function getQuaternions (v, a) {
	x = v[0] * Math.sin(a / 2);
	y = v[1] * Math.sin(a / 2);
	z = v[2] * Math.sin(a / 2);
	w = Math.cos(a / 2);
	return [x, y, z, w];
}

function setNodes () {
	const N = 5;
	const translations = [];
	const rotations = [];
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			translations.push([i * 1.3, j * 1.3, 0]);
			rotations.push(getRandomRotation());
		}
	}
	return translations.map((el, i) => getNode(translations[i], rotations[i]));
}

function getRandomRotation () {
	const a = randomFloat(Math.PI / 4, Math.PI);
	const v = [1,0,0];
	return getQuaternions(v, a);
}

function randomFloat (min = 0, max = 1) {
	return min + Math.random() * (max - min);
}