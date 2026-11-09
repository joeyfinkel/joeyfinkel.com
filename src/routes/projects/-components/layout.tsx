import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/lib/utils';

function ProjectLayout({ className, ...props }: ComponentPropsWithRef<'div'>) {
	return <div className={cn('border-b py-8 sm:py-10', className)} {...props} />;
}

function ProjectTitle({ className, ...props }: ComponentPropsWithRef<'h1'>) {
	return (
		<h1
			data-project-title
			className={cn(
				'text-4xl font-medium tracking-[-0.04em] sm:text-5xl',
				className,
			)}
			{...props}
		/>
	);
}

function ProjectDescription({
	className,
	...props
}: ComponentPropsWithRef<'p'>) {
	return (
		<p
			className={cn(
				'mt-4 max-w-2xl text-sm leading-7 text-muted-foreground',
				className,
			)}
			{...props}
		/>
	);
}

function ProjectCategory({ className, ...props }: ComponentPropsWithRef<'p'>) {
	return (
		<p
			className={cn(
				'project-category mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground',
				className,
			)}
			{...props}
		/>
	);
}

function ProjectSource({ className, ...props }: ComponentPropsWithRef<'p'>) {
	return (
		<p
			className={cn(
				'mt-6 text-sm [&_a]:underline [&_a]:underline-offset-4',
				className,
			)}
			{...props}
		/>
	);
}

export {
	ProjectCategory,
	ProjectDescription,
	ProjectLayout,
	ProjectSource,
	ProjectTitle,
};
