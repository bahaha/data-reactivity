<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type BrowserProps = {
		class?: string;
		children: Snippet;
	};

	const { class: className, children }: BrowserProps = $props();
</script>

<section class={cn('bg-muted h-golden w-full rounded-lg border-8 border-zinc-400', className)}>
	<div class="bg-accent/50 w-full px-6 py-2">
		<div class="bg-accent/60 my-px h-5 w-60 rounded-md"></div>
	</div>
	{@render children()}
</section>
