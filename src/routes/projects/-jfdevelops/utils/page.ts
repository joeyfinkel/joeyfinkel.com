import { createProjectLayout } from '../../-utils/layout/states/default';

export const JfdevelopsPage = createProjectLayout({
  resource: 'jfdevelops',
  name: 'JfdevelopsPage',
  presentation: 'docs',
  title: 'jfdevelops',
  description:
    'My open-source libraries for layouts, forms, developer tools, and typed errors.',
  meta: {
    source: 'npm',
    label: 'Browse on npm',
    package: '@jfdevelops',
  },
});
