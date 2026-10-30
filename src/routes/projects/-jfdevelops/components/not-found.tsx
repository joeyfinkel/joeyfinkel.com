import { Link } from '@tanstack/react-router';

export function CatalogNotFound() {
	return (
		<div className="py-10">
			<h2 className="text-xl font-medium">Library or category not found</h2>
			<Link
				to="/projects/jfdevelops"
				className="mt-4 inline-block text-primary underline underline-offset-4"
			>
				Browse all libraries
			</Link>
		</div>
	);
}
