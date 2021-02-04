module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:bowen-lint/baseLint',
        'plugin:bowen-lint/importLint',
        'plugin:bowen-lint/reactLint',
        'plugin:bowen-lint/tsLint',
    ],
    rules: {},
};
