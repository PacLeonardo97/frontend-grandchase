import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    plugins: ['eslint-plugin-import-helpers'],
    rules: {
      'import-helpers/order-imports': [
        'warn',
        {
          // example configuration
          newlinesBetween: 'always',
          groups: [
            ['/^react/', '/^next/'],
            [, 'module', '/^@mui/'],
            '/^@shared/',
            ['parent', 'sibling', 'index', '/^@/'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
  }),
];

export default eslintConfig;
