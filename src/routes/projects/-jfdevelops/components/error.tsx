import { useRouter } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ProjectLayout } from '../../-components/layout';

export function CatalogError() {
	const router = useRouter();

	return (
		<ProjectLayout
			title="jfdevelops"
			category="Open source libraries"
			description="TypeScript and React packages for layouts, forms, developer tools, and typed errors."
			sourceUrl="https://www.npmjs.com/search?q=%40jfdevelops"
			sourceLabel="Browse on npm"
		>
			<div className="py-12">
				<p role="alert" className="mb-5 text-sm text-muted-foreground">
					The library catalog could not be loaded. You can try again or browse
					the packages on npm.
				</p>
				<Button
					type="button"
					variant="outline"
					onClick={() => void router.invalidate()}
				>
					Try again
				</Button>
			</div>
		</ProjectLayout>
	);
}
