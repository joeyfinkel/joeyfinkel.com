import { useRouter } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { JfdevelopsPage } from '../utils/page';

export function CatalogError() {
	const router = useRouter();

	return (
		<JfdevelopsPage category="Open source libraries">
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
		</JfdevelopsPage>
	);
}
