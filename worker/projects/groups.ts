export const groups = [
	{
		id: 'layouts',
		title: 'React Layout',
		description:
			'Build a consistent page shell, then tailor it to each resource. Add composables, breadcrumbs, and prop validation as your application grows.',
		install: 'pnpm add @jfdevelops/react-layout',
		example: {
			title: 'Define a layout once. Create a page for each resource.',
			language: 'TSX',
			sourceUrl: 'https://github.com/jfdevelops/react-layout#readme',
			code: `import { createProp, defineResourceLayout } from '@jfdevelops/react-layout';

const { createResourceLayout } = defineResourceLayout({
  resources: ['users'],
  options: { title: createProp.string() },
  layout: {
    props: { include: { title: true } },
    render: ({ title }) => <h1>{title}</h1>,
  },
});

const UsersPage = createResourceLayout({
  resource: 'users', name: 'UsersPage', title: 'Users',
});`,
		},
	},
	{
		id: 'forms',
		title: 'Multi-step forms',
		description:
			'Describe steps and fields with types that flow through your form. Use the framework-independent core or React bindings. These packages are pre-release; this example uses the beta API.',
		install: 'pnpm add @jfdevelops/react-multi-step-form@beta',
		example: {
			title: 'Start with a typed step definition.',
			language: 'TypeScript',
			sourceUrl: 'https://github.com/jfdevelops/multi-step-form#readme',
			code: `import { defineMultiStepForm } from '@jfdevelops/react-multi-step-form';

const registration = defineMultiStepForm({
  steps: {
    contact: {
      title: 'Contact details',
      fields: {
        email: {
          defaultValue: '', type: 'string.email', isRequired: true,
        },
      },
      isComplete: ({ email }) => email.includes('@'),
    },
  },
});`,
		},
	},
	{
		id: 'devtools',
		title: 'Developer tools',
		description:
			'Inspect layout graphs and render states, or build developer tools for your own library. Framework-independent cores pair with React panels and optional Vite instrumentation.',
		install: 'pnpm add -D @jfdevelops/react-layout-devtools-vite',
		example: {
			title: 'Add source locations and render-state previews in development.',
			language: 'TypeScript',
			sourceUrl:
				'https://github.com/jfdevelops/react-layout/tree/main/packages/devtools-vite',
			code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactLayoutDevtools } from '@jfdevelops/react-layout-devtools-vite';

export default defineConfig({
  plugins: [react(), reactLayoutDevtools()],
});`,
		},
	},
	{
		id: 'errors',
		title: 'Typed errors',
		description:
			'Create error families with validated definitions, typed context, and configurable messages. Bring a synchronous Standard Schema validator such as Zod.',
		install: 'pnpm add @jfdevelops/create-error zod',
		example: {
			title: 'Give a family of errors a shared shape.',
			language: 'TypeScript',
			sourceUrl: 'https://github.com/jfdevelops/error-blueprint#readme',
			code: `import { createError } from '@jfdevelops/create-error';
import { z } from 'zod';

const createLookupError = createError({
  definition: z.object({ code: z.string() }),
  data: { property: 'resourceId', resolve: ({ input }) => input },
  message: ({ data, implementation }) => implementation(data),
});

class MissingUserError extends createLookupError({ code: 'missingUser' })
  .defineContext(z.string())
  .implement((resourceId) => 'User ' + resourceId + ' was not found') {}

const error = new MissingUserError('user_123');
error.resourceId; // string`,
		},
	},
];
