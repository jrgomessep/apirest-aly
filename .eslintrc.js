module.exports = {
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            extends: 'standard-with-typescript',
            parserOptions: {
                project: ['./tsconfig.json']
            },
            plugins: ['jest'],
            rules: {
                '@typescript-eslint/consistent-type-definitions': 'off',
                '@typescript-eslint/no-namespace': 'off',
                "@typescript-eslint/unbound-method": 'off',
                "@typescript-eslint/no-misused-promises": 'off',
                '@typescript-eslint/no-floating-promises': 'off'
            }
        },
    ]
};
