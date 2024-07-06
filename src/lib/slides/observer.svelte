<script lang="ts">
	import { cn } from '$lib/utils';
	import _state from './state.svelte';
	import { Browser, ReactivityDemo } from '$lib/components';

	type ObserverProps = {
		slide: number;
	};

	const nSlides = 6;
	const { slide: _slide }: ObserverProps = $props();
	const slide = $derived(_slide % nSlides);
</script>

<main class="container">
	<Browser class={cn('')}>
		<ReactivityDemo bind:name={_state.name} greeting={_state.greeting} />
	</Browser>
</main>
