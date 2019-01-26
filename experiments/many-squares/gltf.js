module.exports = getObj;

function getObj (data, nodes) {
	return {
		scenes: getScenes(nodes),
		nodes: getNodes(nodes),
		meshes: getMeshes(),
		buffers: getBuffers(data),
		bufferViews: getBufferViews(data),
		accessors: getAccessors(data),
		materials: getMaterials(),
		asset: getAsset()
	};
}

function getScenes (nodes) {
	return [
		{
			nodes: nodes.map((_, index) => index)
		}
	];
}

function getNodes (nodes) {
	return nodes;
}

function getMeshes () {
	return [
		{
			primitives: [
				{
					attributes: {
						"POSITION": 1
					},
					indices: 0,
					mode : 5,
					material: 0
				}
			]
		}
	];
}

function getBuffers (data) {
	const {verticesBytes, indexesBytes, paddingBytes} = getBytes(data);
	const byteLength = indexesBytes + paddingBytes + verticesBytes;
	return [
		{
			uri: 'buffer.bin',
			byteLength
		}
	];
}

function getBufferViews (data) {
	const {verticesBytes, indexesBytes, paddingBytes} = getBytes(data);
	return [
		{
			buffer: 0,
			byteOffset: 0,
			byteLength: indexesBytes,
			target: 34963
		},
		{
			buffer: 0,
			byteOffset: indexesBytes + paddingBytes,
			byteLength: verticesBytes,
			target: 34962
		}
	];
}

function getAccessors (data) {
	const verticesBounds = getVerticesBounds(data.vertices);
	const indexesBounds = getIndexesBounds(data.indexes);
	return [
		{
			bufferView: 0,
			byteOffset: 0,
			componentType: 5123,
			count: data.indexes.length,
			type: 'SCALAR',
			min: indexesBounds.min,
			max: indexesBounds.max
		},
		{
			bufferView: 1,
			byteOffset: 0,
			componentType: 5126,
			count: data.vertices.length / 3,
			type: 'VEC3',
			min: verticesBounds.min,
			max: verticesBounds.max
		}
	];
}

function getMaterials () {
	return [
		{
			pbrMetallicRoughness: {
				baseColorFactor: [0, 0, 0, 1],
				metallicFactor: 0.2,
				roughnessFactor: 0.8
			}
		}
	];
}

function getAsset () {
	return {
		version: '2.0'
	}
}

function getVerticesBounds (vertices) {
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

function getIndexesBounds (indexes) {
	return {
		min: [min(indexes)],
		max: [max(indexes)]
	};
}

function min (a) {
	return a.reduce((p, c) => Math.min(p, c), Infinity);
}

function max (a) {
	return a.reduce((p, c) => Math.max(p, c), -Infinity);
}

function getBytes (data) {
	const {vertices, indexes} = data;
	const UNSIGNED_SHORT_BYTES = 2;
	const FLOAT_BYTES = 4;
	const verticesBytes = vertices.length * FLOAT_BYTES;
	const indexesBytes = indexes.length * UNSIGNED_SHORT_BYTES;
	const remainder = indexesBytes % FLOAT_BYTES
	const paddingBytes = remainder ? FLOAT_BYTES - remainder : 0;
	return {
		verticesBytes,
		indexesBytes,
		paddingBytes
	};
}