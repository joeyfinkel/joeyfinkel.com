import { McpServer } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { experienceSchema } from '../../src/resume/schema';
import { prepareResume } from '../resume/prepare';
import { getPublication } from '../resume/publication';
import { publishResume } from '../resume/publish';

export function createResumeServer(env: Env) {
	const server = new McpServer({ name: 'joeyfinkel-resume', version: '1.0.0' });

	server.registerTool(
		'get_published_resume',
		{
			description:
				'Read the currently published master resume revision and experience. Use this before preparing a replacement.',
			inputSchema: z.object({}),
			annotations: { readOnlyHint: true },
		},
		async () => ({
			content: [
				{
					type: 'text',
					text: JSON.stringify(await getPublication(env.RESUMES)),
				},
			],
		}),
	);

	server.registerTool(
		'prepare_resume',
		{
			description:
				'Stage a complete replacement of the PUBLIC MASTER resume experience, in the exact intended display order. Supply the SHA-256 of the final PDF. Returns a 15-minute upload credential for code execution to PUT that PDF. Nothing is public until publish_resume. Do not publish job-specific drafts.',
			inputSchema: z.object({
				experience: experienceSchema,
				pdfSha256: z.string().regex(/^[a-f0-9]{64}$/),
			}),
			annotations: { destructiveHint: false },
		},
		async (input) => ({
			content: [
				{
					type: 'text',
					text: JSON.stringify(
						await prepareResume(env.RESUMES, env.SITE_ORIGIN, input),
					),
				},
			],
		}),
	);

	server.registerTool(
		'publish_resume',
		{
			description:
				'Publish the staged PDF and experience together after uploading the PDF and receiving the user’s explicit instruction to publish the master resume. If there is a version conflict, reread the current resume and prepare a new draft; never silently overwrite a newer publication.',
			inputSchema: z.object({ revision: z.uuid() }),
			annotations: { destructiveHint: true, idempotentHint: true },
		},
		async ({ revision }) => ({
			content: [
				{
					type: 'text',
					text: JSON.stringify(await publishResume(env.RESUMES, revision)),
				},
			],
		}),
	);

	return server;
}
