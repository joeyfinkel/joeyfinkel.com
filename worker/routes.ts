import { authorize } from './auth/authorize';
import { ResumeError } from './resume/error';
import { readResume } from './resume/read';
import { uploadResume } from './resume/upload';

export const routes = {
	async fetch(request, env) {
		const { pathname } = new URL(request.url);

		if (pathname === '/authorize') {
			return authorize(request, env);
		}

		if (pathname.startsWith('/api/resume/upload/')) {
			if (request.method !== 'PUT') {
				throw new ResumeError('Method not allowed', 405);
			}

			return uploadResume(
				request,
				env.RESUMES,
				pathname.slice('/api/resume/upload/'.length),
			);
		}

		if (pathname === '/api/resume' || pathname === '/resume.pdf') {
			if (!['GET', 'HEAD'].includes(request.method)) {
				throw new ResumeError('Method not allowed', 405);
			}

			return readResume(request, env);
		}

		if (
			pathname.startsWith('/api/') ||
			pathname.startsWith('/oauth/') ||
			pathname.startsWith('/mcp')
		) {
			throw new ResumeError('Not found', 404);
		}

		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;
