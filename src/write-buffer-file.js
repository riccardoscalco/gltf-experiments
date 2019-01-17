const fs = require('fs');

module.exports = function (data) {
	const {
		indexes,
		vertices
	} = data;

	const UNSIGNED_SHORT_BYTES = 2;
	const FLOAT_BYTES = 4;
	const verticesBytes = vertices.length * FLOAT_BYTES;
	const indexesBytes = indexes.length * UNSIGNED_SHORT_BYTES;
	const remainder = indexesBytes % FLOAT_BYTES
	const paddingBytes = remainder ? FLOAT_BYTES - remainder : 0;
	console.log(paddingBytes);
	const byteLength = indexesBytes + paddingBytes + verticesBytes;

	let buf = new ArrayBuffer(byteLength);
	let dat = new DataView(buf, 0, byteLength);

	for (let i = 0; i < indexesBytes; i+= UNSIGNED_SHORT_BYTES) {
		dat.setUint16(i, indexes[i / UNSIGNED_SHORT_BYTES], true);
	}

	for (let j = indexesBytes + paddingBytes; j < byteLength; j += FLOAT_BYTES) {
		dat.setFloat32(j, vertices[(j - indexesBytes - paddingBytes) / FLOAT_BYTES], true);
	}

	// Base64 string on browser
	// const decoded = String.fromCharCode(...new Uint8Array(buf));
	// const b64 = btoa(decoded);

	// Base64 string on node
	// const b64 = Buffer.from(buf).toString('base64');

	fs.writeFile('buffer.bin', Buffer.from(buf), 'binary', function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log('Saved binary file buffer.bin');
			console.log('Expected byte length:', byteLength);
			console.log('Actual byte length:', Buffer.byteLength(buf));
		}
	});

	// return `data:application/gltf-buffer;base64,${b64}`;
}