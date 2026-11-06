import { Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

const variants = ['A', 'B', 'C'] as const;
const names = { A: 'Personal page', B: 'Work index', C: 'Notebook' };

export function PrototypeSwitcher({ variant }: { variant: 'A' | 'B' | 'C' }) {
	const previous = useRef<HTMLAnchorElement>(null);
	const next = useRef<HTMLAnchorElement>(null);
	const index = variants.indexOf(variant);

	useEffect(() => {
		const handleKey = (event: KeyboardEvent) => {
			if (
				event.target instanceof HTMLElement &&
				event.target.closest(
					'input, textarea, select, [contenteditable="true"]',
				)
			) {
				return;
			}

			if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
				return;
			}

			if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
				event.preventDefault();
				(event.key === 'ArrowLeft' ? previous : next).current?.click();
			}
		};

		window.addEventListener('keydown', handleKey);

		return () => window.removeEventListener('keydown', handleKey);
	}, []);

	return (
		<nav className="prototype-switcher" aria-label="Prototype variants">
			<Link
				ref={previous}
				to="/"
				search={{ variant: variants[(index + 2) % 3] }}
				replace
				aria-label="Previous variant"
			>
				←
			</Link>
			<span aria-live="polite">
				<small>PROTOTYPE {variant} / 3</small>
				{names[variant]}
			</span>
			<Link
				ref={next}
				to="/"
				search={{ variant: variants[(index + 1) % 3] }}
				replace
				aria-label="Next variant"
			>
				→
			</Link>
			<Link
				to="/"
				search={{ variant: 'original' }}
				className="prototype-original"
			>
				Original
			</Link>
		</nav>
	);
}
