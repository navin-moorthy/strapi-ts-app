const ESLint = require("eslint").ESLint;

const removeIgnoredFiles = async (files) => {
	const eslint = new ESLint();
	const isIgnored = await Promise.all(
		files.map((file) => eslint.isPathIgnored(file)),
	);
	const filteredFiles = files.filter((_, index) => !isIgnored[index]);

	return filteredFiles.join(" ");
};

const rules = {
	"**/*.{ts,tsx,d.ts,cts,d.cts,mts,d.mts}": () => "yarn lint:types",
	"**/*.{json,yml,yaml,toml,js,jsx,cjs,mjs,ts,tsx,all-contributorsrc,code-workspace}":
		async (files) => {
			const filesToLint = await removeIgnoredFiles(files);

			return [`yarn format:eslint ${filesToLint}`];
		},
	"package.json": "yarn lint:package-json",
};

module.exports = rules;
