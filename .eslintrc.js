module.exports = {
  root: true,
  ignorePatterns: ['node_modules/', '.next/', 'out/', 'public/', '.git/'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    // import 관련 규칙 ----- 배포 전 삭제
    'import/no-unresolved': 'off',
    'import/default': 'off',
    'import/namespace': 'off',
    'import/no-named-as-default': 'off',

    // unused-vars 관련 규칙
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'warn',

    // React 관련 규칙
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // import 순서 규칙
    // 'import/order': [
    //   'warn',
    //   {
    //     groups: [
    //       'builtin',
    //       'external',
    //       'internal',
    //       ['parent', 'sibling', 'index'],
    //     ],
    //     'newlines-between': 'always',
    //   },
    // ],
  },
};
