<script lang="ts">
	import type { Snippet } from 'svelte';

	type BrowserProps = {
		url: string;
		children: Snippet;
	};

	const { url, children }: BrowserProps = $props();
</script>

<section class="bg-muted h-golden w-full rounded-lg border-8 border-zinc-400">
	<div class="bg-accent/50 flex h-20 w-full items-center px-6 py-4 text-sm">
		<h3>{url}</h3>
	</div>
	{@render children()}
</section>
