import { Building2 } from 'lucide-react';
import { useState } from 'react';

export function CompanyLogo({ src }: { src?: string }) {
	const [failed, setFailed] = useState(false);

	return (
		<span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-background">
			{src && !failed ? (
				<img
					src={src}
					alt=""
					width={40}
					height={40}
					loading="lazy"
					className="size-full object-contain"
					onError={() => setFailed(true)}
				/>
			) : (
				<Building2 className="size-4 text-primary" aria-hidden="true" />
			)}
		</span>
	);
}
