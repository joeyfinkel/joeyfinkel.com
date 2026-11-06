import { Link } from '@tanstack/react-router';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

const technologies = [
	{ name: 'React', icon: 'react', url: 'https://react.dev' },
	{
		name: 'TypeScript',
		icon: 'typescript',
		url: 'https://www.typescriptlang.org',
	},
	{
		name: 'C#',
		icon: 'csharp',
		url: 'https://learn.microsoft.com/dotnet/csharp/',
	},
	{ name: '.NET', icon: 'dotnet', url: 'https://dotnet.microsoft.com/' },
	{
		name: 'Windows',
		icon: 'windows',
		url: 'https://www.microsoft.com/windows',
	},
];

export function TechnologyLinks({
	icons = ['react', 'typescript', 'csharp'],
}: {
	icons?: string[];
}) {
	return (
		<TooltipProvider>
			<span className="technology-links">
				{icons.map((key) => {
					const technology = technologies.find(({ icon }) => icon === key);
					if (!technology) {
						return null;
					}
					const { name, icon, url } = technology;
					return (
						<span key={icon}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										to={new URL(url).href}
										reloadDocument
										className="technology-link"
										aria-label={name}
									>
										<img
											src={`/brands/${icon}.svg`}
											alt=""
											width={24}
											height={24}
										/>
									</Link>
								</TooltipTrigger>
								<TooltipContent sideOffset={4}>{name}</TooltipContent>
							</Tooltip>
						</span>
					);
				})}
			</span>
		</TooltipProvider>
	);
}
