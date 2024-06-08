<script lang="ts">
	import { Presentation } from '$lib';
	import { createFlipAnimation } from '$lib/animation';
	import { onMount } from 'svelte';

	let grid: ReturnType<typeof createFlipAnimation> | undefined;
	onMount(() => {
		const boxes = Array.from(document.querySelectorAll<HTMLElement>('.box'));
		grid = createFlipAnimation(boxes, { duration: 300, stagger: 60 });
		grid.animate();
	});
</script>

<Presentation onStepChange={() => grid?.animate()}>
	{#snippet children(state)}
		<main
			class="container grid h-96 grid-cols-3 grid-rows-3 place-content-center gap-2"
			data-step={state.step}
		>
			<div class="box bg-primary rounded-md [grid-area:primary]"></div>
			<div class="box bg-secondary rounded-md [grid-area:secondary]"></div>
			<div class="box bg-accent rounded-md [grid-area:accent]"></div>
			<div class="box bg-destructive rounded-md [grid-area:destructive]"></div>
		</main>
	{/snippet}
</Presentation>

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

		&[data-step='2'] {
			grid-template-areas:
				'primary destructive destructive'
				'primary secondary secondary'
				'primary accent accent';
		}

		&[data-step='3'] {
			grid-template-areas:
				'destructive destructive destructive'
				'primary secondary accent'
				'primary secondary accent';
		}

		&[data-step='4'] {
			grid-template-areas:
				'destructive destructive destructive'
				'secondary secondary secondary'
				'primary accent accent';
		}

		&[data-step='5'] {
			grid-template-areas:
				'destructive destructive destructive'
				'accent accent accent'
				'secondary secondary primary';
		}

		&[data-step='6'] {
			grid-template-areas:
				'destructive destructive destructive'
				'accent accent accent'
				'secondary primary primary';
		}
	}
</style>
