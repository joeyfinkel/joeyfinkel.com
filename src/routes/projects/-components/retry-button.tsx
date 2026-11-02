import { useRouter } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export function RetryButton() {
	const router = useRouter();

	return (
		<Button
			type="button"
			variant="outline"
			onClick={() => void router.invalidate()}
		>
			Try again
		</Button>
	);
}
