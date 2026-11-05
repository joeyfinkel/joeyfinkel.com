import { useFieldContext } from './context';

export function FieldError({ id }: { id: string }) {
	const field = useFieldContext();
	const message = field.state.meta.isTouched
		? field.state.meta.errors.find((error) => error?.message)?.message
		: undefined;

	if (!message) {
		return null;
	}

	return (
		<p id={id} role="alert" className="text-xs text-destructive">
			{message}
		</p>
	);
}
