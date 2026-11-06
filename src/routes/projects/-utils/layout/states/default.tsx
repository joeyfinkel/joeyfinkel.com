import { createProp } from '@jfdevelops/react-layout';
import { Link } from '@tanstack/react-router';
import { ArrowUpRightIcon } from 'lucide-react';
import { BrandIcon } from '@/components/brand-icon';
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
			category: createProp.component({ type: 'ReactNode' }),
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
								<BrandIcon name={meta.source} />
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
