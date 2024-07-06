<script lang="ts">
	import { Presentation } from '$lib';
	import { createFlipAnimation } from '$lib/animation';
	import { WebCore, VDom } from '$lib/slides';
	import { onMount } from 'svelte';

	let grid: ReturnType<typeof createFlipAnimation> | undefined;
	onMount(() => {
		// const boxes = Array.from(document.querySelectorAll<HTMLElement>('.box'));
		// grid = createFlipAnimation(boxes, { duration: 300, stagger: 60 });
		// grid.animate();
	});
</script>

<Presentation onStepChange={() => grid?.animate()}>
	{#snippet children(state)}
		{#if state.slide === 0}
			<WebCore slide={state.step} />
		{:else if state.slide === 1}
			<VDom slide={state.step} />
		{/if}
	{/snippet}
</Presentation>

<style></style>
