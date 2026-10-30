import { useEffect, useRef, useState } from 'react';

export function useHeaderTitle() {
	const headerRef = useRef<HTMLElement>(null);
	const mainRef = useRef<HTMLElement>(null);
	const [heading, setHeading] = useState<{
		title: string;
		categoryId?: string;
		categoryTitle?: string;
	} | null>(null);

	useEffect(() => {
		const header = headerRef.current;
		const main = mainRef.current;

		if (!header || !main) {
			return;
		}

		let observer: IntersectionObserver;

		function updateTitle() {
			const boundary = header?.getBoundingClientRect().bottom ?? 0;
			const headings =
				main?.querySelectorAll<HTMLElement>('[data-project-title]') ?? [];
			let nextHeading: HTMLElement | null = null;

			for (const heading of headings) {
				if (heading.getBoundingClientRect().bottom <= boundary) {
					nextHeading = heading;
				}
			}

			setHeading(
				nextHeading
					? {
							title: nextHeading.textContent ?? '',
							categoryId: nextHeading.dataset.categoryId,
							categoryTitle: nextHeading.dataset.categoryTitle,
						}
					: null,
			);
		}

		function observeTitles() {
			observer?.disconnect();
			const boundary = header?.getBoundingClientRect().bottom ?? 0;
			observer = new IntersectionObserver(updateTitle, {
				rootMargin: `-${boundary}px 0px 0px 0px`,
				threshold: 0,
			});

			for (const heading of main?.querySelectorAll('[data-project-title]') ??
				[]) {
				observer.observe(heading);
			}

			updateTitle();
		}

		const mutations = new MutationObserver(observeTitles);
		const resize = new ResizeObserver(observeTitles);

		mutations.observe(main, {
			childList: true,
			subtree: true,
			characterData: true,
		});
		resize.observe(header);
		observeTitles();

		return () => {
			observer.disconnect();
			mutations.disconnect();
			resize.disconnect();
		};
	}, []);

	return { headerRef, mainRef, heading };
}
