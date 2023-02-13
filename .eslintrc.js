module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig*.json'],
  },
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'turisap'],
  root: true,
  overrides: [
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.ts', '*.tsx'],
      rules: {
        curly: 'error',
        'import/first': 'off',
        'import/order': 'off',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'no-console': ['off'],
        'no-magic-numbers': 'off',
        'no-unused-vars': 'off',
        'no-async-promise-executor': 'warn',
        'no-prototype-builtins': 'error',
        'no-constant-condition': 'error',
        'require-await': 'off',
        'simple-import-sort/exports': 'error',
        'space-before-blocks': 'off',
        'padding-line-between-statements': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/padding-line-between-statements': [
          'error',
          {
            blankLine: 'always',
            prev: '*',
            next: 'return',
          },
          {
            blankLine: 'always',
            prev: '*',
            next: ['interface', 'type'],
          },
          {
            blankLine: 'always',
            prev: ['interface', 'type'],
            next: '*',
          },
          {
            blankLine: 'always',
            prev: '*',
            next: ['if', 'switch', 'while', 'function', 'block-like', 'export'],
          },
          {
            blankLine: 'always',
            prev: ['if', 'switch', 'while', 'function', 'block-like'],
            next: '*',
          },
          {
            blankLine: 'always',
            prev: 'multiline-expression',
            next: '*',
          },
          {
            blankLine: 'always',
            next: 'multiline-expression',
            prev: '*',
          },
          {
            blankLine: 'always',
            next: 'break',
            prev: '*',
          },
          {
            blankLine: 'always',
            next: 'throw',
            prev: '*',
          },
        ],
        '@typescript-eslint/space-before-blocks': ['error'],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'explicit',
            overrides: {
              constructors: 'off',
              accessors: 'off',
            },
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          // Enforce that private members are prefixed with an underscore
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
          {
            selector: 'variable',
            filter: {
              regex: '^__*__$',
              match: true,
            },
            format: ['camelCase', 'UPPER_CASE'],
          },
          {
            selector: 'property',
            modifiers: ['private', 'public', 'protected', 'static', 'readonly'],
            format: ['UPPER_CASE', 'camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'method',
            format: ['camelCase'],
          },
          {
            selector: 'enum',
            format: ['UPPER_CASE', 'PascalCase'],
          },
        ],
        'simple-import-sort/imports': 'error',
        'turisap/no-magic-numbers': [
          'error',
          {
            ignore: [-1, 0, 3005],
            ignoreEnums: true,
            ignoreNumericLiteralTypes: true,
            ignoreArrayIndexes: true,
            ignoreReadonlyClassProperties: true,
            allowRGBa: true,
            allowedCalls: [
              'setTimeout',
              'httpServer.listen',
              'httpsServer.listen',
            ],
          },
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/no-empty-interface': [
          'error',
          {
            allowSingleExtends: false,
          },
        ],
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/restrict-template-expressions': 'warn',
        '@typescript-eslint/unbound-method': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/restrict-plus-operands': 'warn',
        '@typescript-eslint/ban-types': 'error',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
      },
    },
    {
      files: '*.json',
      parser: 'jsonc-eslint-parser',
      rules: {},
    },
  ],
};
