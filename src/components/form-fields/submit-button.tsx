import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useFormContext } from './context';

export function SubmitButton({
	children,
	pendingLabel,
}: {
	children: ReactNode;
	pendingLabel: string;
}) {
	const form = useFormContext();

	return (
		<form.Subscribe
			selector={(state) => ({
				canSubmit: state.canSubmit,
				isSubmitting: state.isSubmitting,
			})}
		>
			{({ canSubmit, isSubmitting }) => (
				<Button type="submit" disabled={!canSubmit || isSubmitting}>
					{isSubmitting ? pendingLabel : children}
				</Button>
			)}
		</form.Subscribe>
	);
}
