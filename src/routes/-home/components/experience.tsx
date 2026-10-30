import { ArrowUpRight } from 'lucide-react';
import { TimelineContent } from '@/components/reui/timeline/content';
import { TimelineDate } from '@/components/reui/timeline/date';
import { TimelineHeader } from '@/components/reui/timeline/header';
import { TimelineIndicator } from '@/components/reui/timeline/indicator';
import { TimelineItem } from '@/components/reui/timeline/item';
import { Timeline } from '@/components/reui/timeline/root';
import { TimelineSeparator } from '@/components/reui/timeline/separator';
import { TimelineTitle } from '@/components/reui/timeline/title';
import { experience } from '../experience';
import { CompanyLogo } from './company-logo';

export function Experience() {
	return (
		<section
			id="experience"
			className="scroll-mt-8 border-t pt-12 pb-8"
			aria-labelledby="experience-heading"
		>
			<div className="mb-10 flex flex-wrap items-center justify-between gap-4">
				<div>
					<h2 id="experience-heading" className="text-sm font-medium">
						Professional experience
					</h2>
					<p className="mt-2 text-xs leading-6 text-muted-foreground">
						From production SaaS to independent consulting.
					</p>
				</div>
				<a
					href="/resume.pdf"
					className="inline-flex items-center gap-1 text-xs text-primary underline underline-offset-4"
				>
					View resume <ArrowUpRight className="size-3.5" aria-hidden="true" />
				</a>
			</div>
			<Timeline
				defaultValue={0}
				role="list"
				aria-label="Employment history, current role first"
			>
				{experience.map((job, index) => (
					<TimelineItem
						key={job.company}
						step={index + 1}
						role="listitem"
						className="group-data-[orientation=vertical]/timeline:ms-14 group-data-[orientation=vertical]/timeline:not-last:pb-12"
					>
						<TimelineSeparator className="bg-border group-data-[orientation=vertical]/timeline:-left-9 group-data-[orientation=vertical]/timeline:h-[calc(100%-2.75rem)] group-data-[orientation=vertical]/timeline:translate-y-11" />
						<TimelineIndicator className="size-10 rounded-lg border-0 bg-background group-data-[orientation=vertical]/timeline:-left-9">
							<CompanyLogo src={job.logo} />
						</TimelineIndicator>
						<TimelineHeader>
							<TimelineDate
								asChild
								className="mb-2 h-auto! font-mono text-[11px]"
							>
								<p>
									<time dateTime={job.start}>{job.period}</time>
								</p>
							</TimelineDate>
							<TimelineTitle className="text-xl tracking-tight">
								{job.company}
							</TimelineTitle>
							<p className="mt-1 text-sm font-medium">{job.role}</p>
							<p className="mt-1 text-xs leading-6 text-muted-foreground">
								{job.location}
							</p>
						</TimelineHeader>
						<TimelineContent className="mt-4">
							<ul className="space-y-3 text-sm leading-7">
								{job.highlights.map((highlight) => (
									<li key={highlight}>{highlight}</li>
								))}
							</ul>
							<ul
								className="mt-5 flex flex-wrap gap-x-4 gap-y-2"
								aria-label="Technologies"
							>
								{job.technologies.map((technology) => (
									<li
										key={technology}
										className="font-mono text-[11px] text-primary"
									>
										{technology}
									</li>
								))}
							</ul>
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</section>
	);
}
