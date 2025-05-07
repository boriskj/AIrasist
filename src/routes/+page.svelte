<script lang="ts">
	let message = '';
	let answer = '';
	let loading = false;
	let history: [string, string][] = [];

	async function onSend() {
		console.log(message);
		loading = true;

		history = [...history, ['human', message]];
		message = '';

		const responce = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({ history })
		});
		const data = await responce.json();

		history = [...history, ['assistant', data.message]];
		loading = false;
	}
</script>

<main class="flex flex-col items-center justify-center h-screen">
	{#each history as h}
		<div class="p-4 text-white {h[0] == 'human' ? 'bg-blue-500' : 'bg-gray-500'}">{h[1]}</div>
	{/each}

	<form class="flex gap-2" on:submit={onSend}>
		<input bind:value={message} placeholder="your message here..." />
		<button disabled={loading} type="submit" class="bg-black text-white w-24 rounded-r-md"
			>send
		</button>
	</form>
</main>
