import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Award } from 'lucide-react';
import type { Credentials as CredentialsData } from '@/resume/schema';

const awardedDate = new Intl.DateTimeFormat('en-US', {
	month: 'long',
	year: 'numeric',
	timeZone: 'UTC',
});

export function Credentials({
	credentials,
	unavailable,
}: {
	credentials: CredentialsData;
	unavailable: boolean;
}) {
	if (!unavailable && credentials.length === 0) {
		return null;
	}

	return (
		<section
			id="credentials"
			className="scroll-mt-8 border-t py-12"
			aria-labelledby="credentials-heading"
		>
			<div className="mb-8">
				<h2 id="credentials-heading" className="text-sm font-medium">
					Credentials
				</h2>
				<p className="mt-2 text-xs leading-6 text-muted-foreground">
					Certifications and skills I've earned and verified.
				</p>
			</div>

			{unavailable ? (
				<p role="status" className="text-sm leading-7 text-muted-foreground">
					Credentials are temporarily unavailable.{' '}
					<Link
						to="/"
						reloadDocument
						className="text-primary underline underline-offset-4"
					>
						Try again
					</Link>
					.
				</p>
			) : (
				<ul className="grid gap-4 sm:grid-cols-2">
					{credentials.map((credential) => (
						<li key={credential.url}>
							<Link
								to={new URL(credential.url).href}
								reloadDocument
								className="group flex h-full items-start gap-4 rounded-xl border p-5 transition-colors hover:border-primary/50"
							>
								{credential.badge ? (
									<img
										src={credential.badge}
										alt=""
										width={48}
										height={48}
										loading="lazy"
										className="size-12 shrink-0 object-contain"
									/>
								) : (
									<span className="flex size-12 shrink-0 items-center justify-center rounded-lg border">
										<Award className="size-5 text-primary" aria-hidden="true" />
									</span>
								)}
								<div className="min-w-0 flex-1">
									{credential.program && (
										<p className="mb-1 text-xs text-muted-foreground">
											{credential.program}
										</p>
									)}
									<h3 className="text-sm font-medium leading-6 group-hover:text-primary">
										{credential.title}
									</h3>
									<p className="mt-2 text-xs text-muted-foreground">
										{credential.issuer} ·{' '}
										<time dateTime={credential.awardedOn}>
											{awardedDate.format(new Date(credential.awardedOn))}
										</time>
									</p>
								</div>
								<ArrowUpRight
									className="size-4 shrink-0 text-muted-foreground group-hover:text-primary"
									aria-hidden="true"
								/>
							</Link>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
