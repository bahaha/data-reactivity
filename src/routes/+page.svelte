<script lang="ts">
	import { Presentation } from '$lib';
	import { WebCore, VDom, Observer, Signal, SvelteCompiler, Agenda, Bonus } from '$lib/slides';
</script>

<Presentation>
	{#snippet children(state)}
		{#if state.slide === 0}
			<Agenda slide={state.step} />
		{:else if state.slide === 1}
			<WebCore slide={state.step} />
		{:else if state.slide === 2}
			<VDom slide={state.step} />
		{:else if state.slide === 3}
			<SvelteCompiler slide={state.step} />
		{:else if state.slide === 4}
			<Observer slide={state.step} />
		{:else if state.slide === 5}
			<Signal slide={state.step} />
		{:else}
			<Bonus slide={state.step} />
		{/if}
	{/snippet}
</Presentation>
