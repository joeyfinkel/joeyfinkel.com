import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HireMe() {
	return (
		<section
			id="hire-me"
			aria-labelledby="hire-me-heading"
			className="scroll-mt-8 border-t py-12 sm:py-16"
		>
			<p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
				Let’s build something useful
			</p>
			<h2 id="hire-me-heading" className="text-3xl font-medium tracking-tight">
				Hire me
			</h2>
			<p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
				I build web applications and developer tools through JF Develops. Have a
				project in mind? Let’s talk about what you need.
			</p>
			<Button asChild className="mt-6 max-w-full rounded-full px-5">
				<Link to="." href="https://jfdevelops.com" reloadDocument>
					Work with me at JF Develops
					<ArrowUpRight aria-hidden="true" />
				</Link>
			</Button>
		</section>
	);
}
