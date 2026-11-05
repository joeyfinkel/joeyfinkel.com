import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './form-fields/context';
import { FileField } from './form-fields/file-field';
import { SubmitButton } from './form-fields/submit-button';
import { TextField } from './form-fields/text-field';

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: { TextField, FileField },
	formComponents: { SubmitButton },
});
