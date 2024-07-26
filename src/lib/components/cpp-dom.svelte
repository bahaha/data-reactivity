<script lang="ts">
	import { DOM } from '$lib/components';
	import { cn } from '$lib/utils';
	type CppDomProps = {
		class?: string;
		name?: string;
		greeting?: string;
	};

	const { class: className, name = '', greeting = '' }: CppDomProps = $props();
</script>

<aside
	class={cn('space-x-1 space-y-2 rounded-md border-4 border-dotted border-success p-1', className)}
>
	<div class="rounded bg-success py-1 text-center font-bold text-background">
		Document Object Model (V8 C++)
	</div>
	<DOM tagName="body" variant="muted" class="border border-muted-foreground">
		<DOM tagName="form">
			<DOM tagName="fieldset" variant="secondary">
				<DOM tagName="label" variant="accent">
					{#snippet attributes()}
						<span>for: name</span>
						<span>text: Name</span>
					{/snippet}
				</DOM>
				<DOM tagName="input" variant="accent">
					{#snippet attributes()}
						<span>id: name</span>
						<span>type: text</span>
						<span>value: {name}</span>
					{/snippet}
				</DOM>
			</DOM>
		</DOM>
		<DOM tagName="h3">
			{#snippet attributes()}
				<span>text: {greeting}</span>
			{/snippet}
		</DOM>
	</DOM>
</aside>
