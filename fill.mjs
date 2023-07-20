import fs from 'fs';

const SPONSOR_AMOUNT_REGULAR = '1';
const SPONSOR_AMOUNT_FOUNDATIONAL = '2';

function toKey(row) {
	const key = row.split(',')[0].trim();
	return key;
}

function isTrueish(row) {
	if (!row) {
		return false;
	}

	return /,\d$/.test(row) && parseInt(row.split(',').at(-1), 10) > 0;
}

function toMap(rows) {
	const m = new Map();

	for (let i = 1; i < rows.length; i++) {
		if (!rows[i].trim()) {
			continue;
		}

		m.set(toKey(rows[i]), rows[i].trim());
	}

	return m;
}

const codeContributions = fs.readFileSync('code-contributions.csv', 'utf8').trim().toString().split('\n');
const foundationalWork = fs.readFileSync('foundational-work.csv', 'utf8').trim().toString().split('\n');
let exported = fs.readFileSync('export.csv', 'utf8').toString().trim().split('\n');
const additional = fs.readFileSync('additional.csv', 'utf8').toString().trim().split('\n');

const codeContributionsMap = toMap(codeContributions);
const foundationalWorkMap = toMap(foundationalWork);

for (let i = 1; i < exported.length; i++) {
	const z = exported[i];
	if (!z) {
		continue;
	}

	const weDoCodeContributions = isTrueish(codeContributionsMap.get(toKey(z)));
	const isFoundationalToOurWork = isTrueish(foundationalWorkMap.get(toKey(z)));

	if (weDoCodeContributions) {
		// We contribute time/code
		exported[i] = z;
		continue;
	}

	if (isFoundationalToOurWork) {
		// This is foundational to our work and needs more support
		exported[i] = z.trim() + SPONSOR_AMOUNT_FOUNDATIONAL;
		continue;
	}

	exported[i] = z.trim() + SPONSOR_AMOUNT_REGULAR;
}

exported.push(...additional.slice(1))

exported = [
	exported[0],
	...exported.slice(1).sort((a, b) => {
		return a.localeCompare(b);
	}).filter(isTrueish),
]

// Bulk sponsoring has a limit of 100 rows
// They might increase this limit in the future
// fs.writeFileSync('sponsor-log.csv', exported.join('\n') + '\n', 'utf8');

{
	const chunks = [];
	let chunk = [exported[0]];
	for (let i = 1; i < exported.length; i++) {
		if (i % 99 === 0) {
			chunks.push(chunk);
			chunk = [exported[0]];
		}

		chunk.push(exported[i]);
	}

	chunks.push(chunk);

	for (let i = 0; i < chunks.length; i++) {
		fs.writeFileSync(`sponsor-log-${i}.csv`, chunks[i].join('\n') + '\n', 'utf8');
	}
}
