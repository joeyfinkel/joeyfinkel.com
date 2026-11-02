export const groups = [
	{
		id: 'react-layout',
		title: 'React Layout',
		description:
			'Build a consistent page shell, then tailor it to each resource. Add composables, breadcrumbs, prop validation, and devtools as your application grows.',
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
			'Build developer tools for your own library. A dev-only event channel and memoised client pair with a React panel shell, and all of it compiles to nothing in production.',
		install: 'pnpm add @jfdevelops/devtools-kit zod',
		example: {
			title: "Describe your library's devtools data once.",
			language: 'TypeScript',
			sourceUrl: 'https://github.com/jfdevelops/devtools#readme',
			code: `import { z } from 'zod';
import { createDevtools } from '@jfdevelops/devtools-kit';

export const devtools = createDevtools({
  key: '__MY_LIB_DEVTOOLS__',
  entities: {
    step: z.object({ id: z.string(), title: z.string() }),
    field: z.object({ name: z.string(), valid: z.boolean() }),
  },
  events: z.discriminatedUnion('type', [
    z.object({ type: z.literal('step:enter'), at: z.number(), id: z.string() }),
    z.object({ type: z.literal('validation:fail'), at: z.number(), message: z.string() }),
  ]),
});

devtools.putEntity('step', step.id, step);
devtools.emit({ type: 'step:enter', at: Date.now(), id: step.id });`,
		},
	},
	{
		id: 'errors',
		title: 'Typed errors',
		description:
			'Create error families with validated definitions, typed context, and configurable messages.',
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
