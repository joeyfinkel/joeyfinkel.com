import { authorize } from './auth/authorize';
import { downloadFile } from './files/download';
import { listFiles } from './files/list';
import { uploadFile } from './files/upload';
import { readProjects } from './projects/read';
import { ResumeError } from './resume/error';
import { readResume } from './resume/read';
import { readLatex } from './resume/read-latex';
import { uploadResume } from './resume/upload';

export const routes = {
	async fetch(request, env) {
		const { pathname } = new URL(request.url);

		if (
			pathname === '/api/projects' ||
			pathname === '/api/projects/jfdevelops'
		) {
			return readProjects(request);
		}

		if (pathname === '/api/files') {
			if (request.method !== 'GET') {
				throw new ResumeError('Method not allowed', 405);
			}

			return listFiles(env.RESUMES);
		}

		if (pathname.startsWith('/api/files/')) {
			const segment = pathname.slice('/api/files/'.length);

			if (request.method === 'PUT') {
				return uploadFile(request, env, segment);
			}

			if (['GET', 'HEAD'].includes(request.method)) {
				return downloadFile(request, env.RESUMES, segment);
			}

			throw new ResumeError('Method not allowed', 405);
		}

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

		if (pathname === '/resume.tex') {
			if (!['GET', 'HEAD'].includes(request.method)) {
				throw new ResumeError('Method not allowed', 405);
			}

			return readLatex(request, env);
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
