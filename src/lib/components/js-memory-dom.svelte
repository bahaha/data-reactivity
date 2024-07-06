<script lang="ts">
	import { DOM } from '$lib/components';
	import { cn } from '$lib/utils';
	type JsMemoryDomProps = {
		class?: string;
		name?: string;
		greeting?: string;
		step: number;
	};

	const { class: className, name = '', greeting = '', step }: JsMemoryDomProps = $props();
</script>

{#snippet ref()}
	<span
		class="mt-2 justify-self-stretch rounded border-t border-dotted border-destructive pt-2 text-center text-sm text-destructive"
	>
		ref
	</span>
{/snippet}

<aside class={cn('border-warning space-x-1 space-y-2 rounded-md border-2 p-1', className)}>
	<div class="bg-warning rounded py-1 text-center font-bold text-background">Javascript Memory</div>
	<div class="flex flex-wrap gap-2">
		<div class="rounded border-4 border-zinc-400 p-2">
			<h5 class="">input:</h5>
			<DOM tagName="HTMLInputElement" variant="primary">
				{#snippet attributes()}
					<span>id: name</span>
					<span>type: text</span>
					<span>value: {name}</span>
					<span>event listener: {step < 3 ? '[]' : '[[Function handleInputChange]]'}</span>
					{@render ref()}
				{/snippet}
			</DOM>
		</div>
		<div class={cn('rounded border-4 border-zinc-400 p-2', step < 1 && 'hidden')}>
			<h5 class="">h3:</h5>
			<DOM tagName="HTMLDivElement" variant="primary">
				{#snippet attributes()}
					<span>innerText: {greeting}</span>
					{@render ref()}
				{/snippet}
			</DOM>
		</div>
		<div class={cn('rounded border-4 border-destructive p-2', step < 2 && 'hidden')}>
			<h5 class="font-bold">handleInputChange:</h5>
			<DOM class="w-full" tagName="[[Function]]" variant="destructive">
				{#snippet attributes()}
					<span>Execution Context</span>
					{@render ref()}
				{/snippet}
			</DOM>
		</div>
	</div>
</aside>
