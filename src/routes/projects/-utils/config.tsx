import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { RetryButton } from '../-components/retry-button';
import { Jfdevelops } from '../-jfdevelops/components/content';
import { JfdevelopsPage } from '../-jfdevelops/utils/page';
import { MaterialUiHelper } from '../-material-ui-helper/components/content';
import { MaterialUiHelperPage } from '../-material-ui-helper/utils/page';
import { PaneDeck } from '../-panedeck/components/content';
import { PaneDeckPage } from '../-panedeck/utils/page';
import { createResourceConfig } from './layout/states/default';

export const projectConfig = createResourceConfig({
	panedeck: {
		component: <PaneDeck />,
		errorComponent: (
			<PaneDeckPage.Error>
				<RetryButton />
			</PaneDeckPage.Error>
		),
		notFoundComponent: (
			<PaneDeckPage.NotFound>
				<Button asChild variant="outline">
					<Link to="/projects/panedeck">Back to PaneDeck</Link>
				</Button>
			</PaneDeckPage.NotFound>
		),
	},
	'material-ui-helper': {
		component: <MaterialUiHelper />,
		errorComponent: (
			<MaterialUiHelperPage.Error>
				<RetryButton />
			</MaterialUiHelperPage.Error>
		),
		notFoundComponent: (
			<MaterialUiHelperPage.NotFound>
				<Button asChild variant="outline">
					<Link to="/projects/material-ui-helper">
						Back to Material UI Helper
					</Link>
				</Button>
			</MaterialUiHelperPage.NotFound>
		),
	},
	jfdevelops: {
		component: <Jfdevelops />,
		errorComponent: (
			<JfdevelopsPage.Error message="The library catalog could not be loaded. You can try again or browse the packages on npm.">
				<RetryButton />
			</JfdevelopsPage.Error>
		),
		notFoundComponent: (
			<JfdevelopsPage.NotFound title="Library or category not found">
				<Button asChild variant="outline">
					<Link to="/projects/jfdevelops">Browse all libraries</Link>
				</Button>
			</JfdevelopsPage.NotFound>
		),
	},
});
