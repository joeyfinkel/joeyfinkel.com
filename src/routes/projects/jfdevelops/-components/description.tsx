import { Link } from '@tanstack/react-router';
import type { LibraryGroupData } from '@/projects/schema';

export function GroupDescription({ group }: { group: LibraryGroupData }) {
	return (
		<>
			{group.description}
			{group.id === 'errors' && (
				<>
					{' '}
					Bring a synchronous{' '}
					<Link
						to={new URL('https://standardschema.dev/schema').href}
						className="text-primary underline underline-offset-4"
					>
						Standard Schema
					</Link>{' '}
					validator such as{' '}
					<Link
						to={new URL('https://zod.dev/').href}
						className="text-primary underline underline-offset-4"
					>
						Zod
					</Link>
					,{' '}
					<Link
						to={new URL('https://valibot.dev/').href}
						className="text-primary underline underline-offset-4"
					>
						Valibot
					</Link>
					, or{' '}
					<Link
						to={new URL('https://arktype.io/').href}
						className="text-primary underline underline-offset-4"
					>
						ArkType
					</Link>
					.
				</>
			)}
		</>
	);
}
