const fs = require('fs');

module.exports = writeBufferFile;

function writeBufferFile (data) {
	const buffer = createBuffer(data);
	writeFile(buffer);
}

function createBuffer(data) {
	const {
		indexes,
		vertices
	} = data;

	const minMAx = getMinMax(vertices);

	const UNSIGNED_SHORT_BYTES = 2;
	const FLOAT_BYTES = 4;
	const verticesBytes = vertices.length * FLOAT_BYTES;
	const indexesBytes = indexes.length * UNSIGNED_SHORT_BYTES;
	const remainder = indexesBytes % FLOAT_BYTES
	const paddingBytes = remainder ? FLOAT_BYTES - remainder : 0;
	const byteLength = indexesBytes + paddingBytes + verticesBytes;

	const buf = new ArrayBuffer(byteLength);
	const dat = new DataView(buf, 0, byteLength);

	for (let i = 0; i < indexesBytes; i+= UNSIGNED_SHORT_BYTES) {
		dat.setUint16(i, indexes[i / UNSIGNED_SHORT_BYTES], true);
	}

	for (let j = indexesBytes + paddingBytes; j < byteLength; j += FLOAT_BYTES) {
		dat.setFloat32(j, vertices[(j - indexesBytes - paddingBytes) / FLOAT_BYTES], true);
	}

	// const dataURI = `data:application/gltf-buffer;base64,${Buffer.from(buf).toString('base64')}`;
	// console.log(dataURI);

	console.log('Expected byte length:', byteLength);
	console.log('Actual byte length:', Buffer.byteLength(buf));
	console.log('Max values:', minMAx.max);
	console.log('Min values:', minMAx.min);

	return buf;
}

function writeFile (buf) {
	fs.writeFile('buffer.bin', Buffer.from(buf), 'binary', function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log('Saved binary file buffer.bin');
		}
	});
}

function getMinMax (vertices) {
	return vertices.reduce((p, c, i) => {
		const index = i % 3;
		p.min[index] = Math.min(p.min[index], c);
		p.max[index] = Math.max(p.max[index], c);
		return p;
	}, {
		min: [Infinity, Infinity, Infinity],
		max: [-Infinity, -Infinity, -Infinity]
	});
}