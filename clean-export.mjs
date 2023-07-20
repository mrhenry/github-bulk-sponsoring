import fs from 'fs';

let exported = fs.readFileSync('export.csv', 'utf8').toString().trim().split('\n');

const columnCount = exported[0].split(',').length;

exported = [
	exported[0],
	...exported.slice(1).sort((a, b) => {
		return a.localeCompare(b);
	}).map(x => {
		const y = x.split(',');

		const first = y[0].trim();
		
		return first + ','.repeat(columnCount - 1);
	}),
]

fs.writeFileSync('export.csv', exported.join('\n') + '\n', 'utf8');
