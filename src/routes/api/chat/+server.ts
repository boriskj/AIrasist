import { get_chat_response } from '$lib/ai.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { history } = await request.json();

	const responce = await get_chat_response(history);

	return json({ message: responce });
}
