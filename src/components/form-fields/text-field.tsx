import { Eye, EyeOff } from 'lucide-react';
import { useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useFieldContext } from './context';
import { FieldError } from './field-error';

export function TextField({
	label,
	type = 'text',
	autoComplete,
}: {
	label: string;
	type?: 'text' | 'email' | 'password';
	autoComplete?: string;
}) {
	const field = useFieldContext<string>();
	const [revealed, setRevealed] = useState(false);
	const id = useId();
	const errorId = `${id}-error`;
	const isPassword = type === 'password';
	const hasError =
		field.state.meta.isTouched &&
		field.state.meta.errors.some((error) => error?.message);

	return (
		<div className="grid gap-2">
			<Label htmlFor={id}>{label}</Label>
			<div className="relative">
				<Input
					id={id}
					name={field.name}
					type={isPassword && revealed ? 'text' : type}
					autoComplete={autoComplete}
					value={field.state.value}
					onBlur={field.handleBlur}
					onChange={(event) => field.handleChange(event.target.value)}
					aria-invalid={hasError || undefined}
					aria-describedby={hasError ? errorId : undefined}
					className={cn(isPassword && 'pr-10')}
				/>
				{isPassword && (
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						className="absolute top-0.5 right-0.5"
						aria-label={revealed ? 'Hide password' : 'Show password'}
						aria-pressed={revealed}
						onClick={() => setRevealed((current) => !current)}
					>
						{revealed ? (
							<EyeOff aria-hidden="true" />
						) : (
							<Eye aria-hidden="true" />
						)}
					</Button>
				)}
			</div>
			<FieldError id={errorId} />
		</div>
	);
}
