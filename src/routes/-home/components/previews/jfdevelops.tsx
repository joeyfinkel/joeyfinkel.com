import {
	FormInputIcon,
	LayoutPanelLeftIcon,
	TriangleAlertIcon,
	WrenchIcon,
} from 'lucide-react';

const families = [
	{ name: 'Layouts', icon: LayoutPanelLeftIcon },
	{ name: 'Forms', icon: FormInputIcon },
	{ name: 'Errors', icon: TriangleAlertIcon },
	{ name: 'Developer tools', icon: WrenchIcon },
];

export function JfdevelopsPreview() {
	return (
		<ul
			aria-label="Library families"
			className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4"
		>
			{families.map(({ name, icon: Icon }) => (
				<li
					key={name}
					className="flex items-center gap-2.5 rounded-md border bg-background px-3 py-2.5 text-sm"
				>
					<Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
					{name}
				</li>
			))}
		</ul>
	);
}
