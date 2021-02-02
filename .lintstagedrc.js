module.exports = {
    '**/*.{js,jsx,tsx,ts,scss,md,json}': ['prettier --write', 'git add'],
    '**/*.{js,jsx,ts,tsx}': 'yarn lint-staged:js',
};
