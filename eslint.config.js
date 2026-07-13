import path from 'node:path';

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importX from 'eslint-plugin-import-x';
import { defineConfig, globalIgnores } from 'eslint/config';

const srcDir = path.resolve(process.cwd(), 'src');

const preferAlias = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    schema: [],
    messages: { useAlias: "Импорт '{{ value }}' — используй алиас '{{ alias }}'." },
  },
  create(context) {
    const check = (node) => {
      const source = node.source;
      if (!source || typeof source.value !== 'string') return;
      const value = source.value;
      if (!value.startsWith('../')) return;

      const absolute = path.resolve(path.dirname(context.filename), value);
      const rel = path.relative(srcDir, absolute);
      if (rel.startsWith('..') || path.isAbsolute(rel)) return;

      const alias = '@/' + rel.split(path.sep).join('/');
      context.report({
        node: source,
        messageId: 'useAlias',
        data: { value, alias },
        fix: (fixer) => fixer.replaceText(source, `${source.raw[0]}${alias}${source.raw[0]}`),
      });
    };
    return {
      ImportDeclaration: check,
      ExportNamedDeclaration: check,
      ExportAllDeclaration: check,
    };
  },
};

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'import-x': importX,
      local: { rules: { 'prefer-alias': preferAlias } },
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'local/prefer-alias': 'error',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [{ pattern: '@/**', group: 'internal' }],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
]);
