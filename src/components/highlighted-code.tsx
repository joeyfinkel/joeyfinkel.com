import { Highlight, type PrismTheme } from 'prism-react-renderer';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import { Fragment } from 'react';

const theme: PrismTheme = { plain: {}, styles: [] };
const languageAliases: Record<string, string> = {
	shell: 'bash',
	'c#': 'csharp',
};

export function HighlightedCode({
	code,
	language,
}: {
	code: string;
	language: string;
}) {
	const normalizedLanguage = language.toLowerCase();

	return (
		<Highlight
			prism={Prism}
			code={code}
			language={languageAliases[normalizedLanguage] ?? normalizedLanguage}
			theme={theme}
		>
			{({ tokens, getTokenProps }) => (
				<pre className="code-syntax">
					<code>
						{tokens.map((line, lineIndex) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: Token positions identify stateless syntax spans within the current code string.
							<Fragment key={lineIndex}>
								{line.map((token, tokenIndex) => (
									<span
										{...getTokenProps({
											token: {
												...token,
												content: token.empty ? '' : token.content,
											},
										})}
										// biome-ignore lint/suspicious/noArrayIndexKey: Token positions identify stateless syntax spans within the current line.
										key={tokenIndex}
									/>
								))}
								{lineIndex < tokens.length - 1 ? '\n' : null}
							</Fragment>
						))}
					</code>
				</pre>
			)}
		</Highlight>
	);
}
