import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFieldContext } from './context';
import { FieldError } from './field-error';

export function FileField({ label }: { label: string }) {
	const field = useFieldContext<File | null>();
	const id = useId();
	const errorId = `${id}-error`;
	const hasError =
		field.state.meta.isTouched &&
		field.state.meta.errors.some((error) => error?.message);

	return (
		<div className="grid gap-2">
			<Label htmlFor={id}>{label}</Label>
			<Input
				id={id}
				name={field.name}
				type="file"
				onBlur={field.handleBlur}
				onChange={(event) =>
					field.handleChange(event.target.files?.item(0) ?? null)
				}
				aria-invalid={hasError || undefined}
				aria-describedby={hasError ? errorId : undefined}
			/>
			<FieldError id={errorId} />
		</div>
	);
}
