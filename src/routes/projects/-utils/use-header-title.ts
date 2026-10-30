import { useEffect, useRef, useState } from 'react';

export function useHeaderTitle() {
	const headerRef = useRef<HTMLElement>(null);
	const mainRef = useRef<HTMLElement>(null);
	const [headerTitle, setHeaderTitle] = useState<string | null>(null);

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
			let nextTitle: string | null = null;

			for (const heading of headings) {
				if (heading.getBoundingClientRect().bottom <= boundary) {
					nextTitle = heading.textContent;
				}
			}

			setHeaderTitle(nextTitle);
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

	return { headerRef, mainRef, headerTitle };
}
