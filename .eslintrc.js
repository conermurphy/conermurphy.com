module.exports = {
  extends: ['conermurphy'],
  ignorePatterns: ['/**/cdk.out/'],
  root: true,
  overrides: [
    {
      files: ['./*.ts', './*.tsx', './backend/**/*.ts', './backend/**/*.tsx'],
      plugins: ['import', '@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      extends: ['conermurphy'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json', './backend/tsconfig.json'],
      },
      settings: {
        'import/resolver': {
          typescript: {
            tsconfigRootDir: __dirname,
            project: ['./tsconfig.json', './backend/tsconfig.json'],
          },
        },
      },
    },
    {
      files: ['./frontend/**/*.ts', './frontend/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['conermurphy', 'next'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./frontend/tsconfig.json'],
      },
      settings: {
        'import/resolver': {
          typescript: {
            tsconfigRootDir: __dirname,
            project: ['./frontend/tsconfig.json'],
          },
        },
        next: {
          rootDir: './frontend',
        },
      },
    },
  ],
};
