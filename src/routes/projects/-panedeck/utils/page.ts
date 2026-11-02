import { createProjectLayout } from '../../-utils/layout/states/default';

export const PaneDeckPage = createProjectLayout({
  resource: 'panedeck',
  name: 'PaneDeckPage',
  presentation: 'article',
  title: 'PaneDeck',
  description:
    'Bring your existing desktop apps into focused workspaces. Split, tab, move, and resize windows together without changing the way those apps work.',
  meta: {
    source: 'github',
    label: 'View on GitHub',
    repo: 'panedeck',
    owner: 'joeyfinkel',
  },
});
