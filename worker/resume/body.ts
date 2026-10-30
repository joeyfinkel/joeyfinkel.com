import { ResumeError } from './error';

export async function readBody(request: Request, limit: number) {
	const reader = request.body?.getReader();
	const chunks: Uint8Array<ArrayBuffer>[] = [];
	let size = 0;

	if (reader) {
		while (true) {
			const { value, done } = await reader.read();

			if (done) {
				break;
			}

			size += value.byteLength;

			if (size > limit) {
				await reader.cancel();
				throw new ResumeError('Request is too large', 413);
			}

			chunks.push(value);
		}
	}

	const body = new Uint8Array(size);
	let offset = 0;

	for (const chunk of chunks) {
		body.set(chunk, offset);
		offset += chunk.byteLength;
	}

	return body;
}
