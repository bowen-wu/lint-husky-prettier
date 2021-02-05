module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:bowen-lint/reactLint',
        'plugin:bowen-lint/tsLint',
        'plugin:bowen-lint/prettierLint',
    ],
    rules: {},
};
