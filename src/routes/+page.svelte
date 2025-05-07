<script lang="ts">
	let message = '';
	let answer = '';
	let loading = false;

	let type: 'joke' | 'image' = 'joke';

	async function onSend() {
		console.log(message);
		loading = true;

		const response = await fetch('/api/' + type, { method: 'POST', body: message });

		const data = await response.json();
		console.log('data', data);

		answer = data.message;

		loading = false;
		message = '';
	}
</script>

<main class="flex flex-col items-center justify-center h-screen">
	<div class="w-full p-4 text-center">{answer}</div>

	{type}

	<form class="flex gap-2" on:submit={onSend}>
		<select bind:value={type}>
			<option value="image">image</option>
			<option value="joke">joke</option>
		</select>
		<input bind:value={message} placeholder="your message here..." />
		<button disabled={loading} type="submit" class="bg-black text-white w-24 rounded-r-md"
			>send
		</button>
	</form>
</main>
