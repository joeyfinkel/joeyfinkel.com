import { createProp } from '@jfdevelops/react-layout';
import { Link } from '@tanstack/react-router';
import { ArrowUpRightIcon } from 'lucide-react';
import {
	createRenderState,
	createSourceUrl,
	defineResourceLayout,
} from '../base';
import { error } from './error';
import { notFound } from './not-found';

const defaultState = createRenderState({
	props: {
		include: {
			title: true,
			description: true,
			meta: {
				required: false,
				suppliedVia: 'config',
			},
		},
		custom: {
			category: createProp.string(),
			children: createProp.component({ type: 'ReactNode' }),
		},
	},
	render: function ProjectPage(
		{ category, children, description, meta, title },
		{ composables },
	) {
		const sourceUrl = createSourceUrl({ meta });

		return (
			<div>
				<composables.TitleWrapper>
					<composables.Title>{title}</composables.Title>
					<composables.Description>{description}</composables.Description>
					<composables.Category>{category}</composables.Category>
					{meta && (
						<composables.Source>
							<Link to={sourceUrl} reloadDocument>
								<img
									src={`/brands/${meta.source}.svg`}
									alt={`${meta.source} logo`}
									width={20}
									height={20}
									className="size-5 dark:invert"
								/>
								{meta.label}
								<ArrowUpRightIcon aria-hidden="true" />
							</Link>
						</composables.Source>
					)}
				</composables.TitleWrapper>
				{children}
			</div>
		);
	},
});

export const {
	createResourceLayout: createProjectLayout,
	createResourceConfig,
	createResourceLinks,
} = defineResourceLayout({
	render: {
		...defaultState,
		...notFound,
		...error,
	},
});
