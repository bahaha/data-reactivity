<script lang="ts">
	import { createFlipAnimation } from '$lib/animation';
	import { onMount } from 'svelte';

	const totalSteps = 3;
	let currStep = $state(0);
	let boxes: HTMLElement[] = $state([]);

	onMount(() => {
		boxes = Array.from(document.querySelectorAll<HTMLElement>('.box'));
	});

	let grid = $derived(createFlipAnimation(boxes, { duration: 300, stagger: 60 }));

	$effect(() => {
		console.debug(currStep);
		grid.animate();
	});

	function handleKeyboardStrike(evt: KeyboardEvent) {
		evt.preventDefault();
		const code = evt.code;
		if (code !== 'ArrowDown' && code !== 'ArrowUp') return;
		const offset = code === 'ArrowDown' ? 1 : -1;
		currStep = (currStep + offset) % totalSteps;
	}
</script>

<svelte:window onkeydown={handleKeyboardStrike} />

<main
	class="container grid h-96 grid-cols-3 grid-rows-3 place-content-center gap-2"
	data-step={currStep}
>
	<div class="box bg-primary rounded-md [grid-area:primary]"></div>
	<div class="box bg-secondary rounded-md [grid-area:secondary]"></div>
	<div class="box bg-accent rounded-md [grid-area:accent]"></div>
	<div class="box bg-destructive rounded-md [grid-area:destructive]"></div>
</main>

<style>
	.grid {
		grid-template-areas:
			'primary primary primary'
			'primary primary primary'
			'secondary accent destructive';

		&[data-step='1'] {
			grid-template-areas:
				'primary primary destructive'
				'primary primary secondary'
				'primary primary accent';
		}
	}
</style>
