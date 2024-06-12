<script lang="ts">
	import { Presentation } from '$lib';
	import { createFlipAnimation } from '$lib/animation';
	import { WebCore } from '$lib/slides';
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
		<WebCore slide={state.step} />
	{/snippet}
</Presentation>

<style></style>
