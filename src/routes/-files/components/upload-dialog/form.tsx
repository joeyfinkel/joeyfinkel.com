import { useAppForm } from '@/components/form';
import { uploadSchema } from '../../utils/schema';
import { uploadFile } from '../../utils/upload';

export function UploadForm({ onUploaded }: { onUploaded: () => void }) {
	const form = useAppForm({
		defaultValues: { password: '', file: null as File | null },
		validators: {
			onMount: uploadSchema,
			onChange: uploadSchema,
			// The server is the only judge of the password, so its rejection is
			// reported as a form error that clears as soon as the input changes.
			onSubmitAsync: async ({ value }) => {
				const { password, file } = uploadSchema.parse(value);

				try {
					await uploadFile({ password, file });
				} catch (error) {
					return {
						form: error instanceof Error ? error.message : 'Upload failed.',
					};
				}

				return undefined;
			},
		},
		onSubmit: () => {
			onUploaded();
		},
	});

	return (
		<form
			className="grid gap-4"
			onSubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();
				void form.handleSubmit();
			}}
		>
			<form.AppField name="password">
				{(field) => (
					<field.TextField
						label="Password"
						type="password"
						autoComplete="off"
					/>
				)}
			</form.AppField>
			<form.AppField name="file">
				{(field) => <field.FileField label="File" />}
			</form.AppField>
			<form.Subscribe selector={(state) => state.errorMap.onSubmit}>
				{(message) =>
					typeof message === 'string' ? (
						<p role="alert" className="text-sm text-destructive">
							{message}
						</p>
					) : null
				}
			</form.Subscribe>
			<form.AppForm>
				<form.SubmitButton pendingLabel="Uploading…">Upload</form.SubmitButton>
			</form.AppForm>
		</form>
	);
}
