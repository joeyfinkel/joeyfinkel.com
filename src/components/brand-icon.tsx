import { cn } from '@/lib/utils';

export function BrandIcon({
	name,
	className,
}: {
	name: string;
	className?: string;
}) {
	return (
		<span
			aria-hidden="true"
			className={cn('brand-icon', className)}
			style={{ maskImage: `url(/brands/${name}.svg)` }}
		/>
	);
}
