<script lang="ts">
	import { cn } from '$lib/utils';
	import { Separator } from './ui/separator';
	type JsDomTreeProps = {
		class?: string;
		name?: string;
		greeting?: string;
	};

	const { class: className, name = '', greeting = '' }: JsDomTreeProps = $props();
</script>

<ul class={cn('jsdom__tree grid', className)}>
	<li class="jsdom__node jsdom__root jsdom__node-parent [grid-area:root]">
		<h5 class="text-sm">root</h5>
	</li>
	<li class="jsdom__separator [grid-area:separator-1]"></li>
	<li class="jsdom__node [grid-area:form]">
		<h5 class="text-sm">form</h5>
	</li>
	<li class="jsdom__node jsdom__node-parent [grid-area:fieldset]">
		<h5 class="text-sm">fieldset</h5>
	</li>
	<li class="jsdom__separator [grid-area:separator-2]"></li>
	<li class="jsdom__node jsdom__leaf [grid-area:label]">
		<h5 class="text-sm">label</h5>
		<Separator />
		<div>
			<span>for: name</span>
		</div>
	</li>
	<li class="jsdom__node jsdom__leaf [grid-area:input]">
		<h5 class="text-sm">input</h5>
		<Separator />
		<div class="flex flex-col items-center">
			<span>id: name</span>
			<span>type: text</span>
			<span>value: {name}</span>
		</div>
	</li>
	<li class="jsdom__node jsdom__leaf [grid-area:h3]">
		<h5 class="text-sm">h3</h5>
		<Separator />
		<div class="flex flex-col items-center">
			text: {greeting}
		</div>
	</li>
</ul>

<style lang="postcss">
	.jsdom__tree {
		--line-height: 3px;
		grid-template-columns: repeat(8, minmax(0, 1fr));
		grid-template-rows: 2rem var(--line-height) max-content max-content var(--line-height) max-content;
		row-gap: 1rem;
		grid-template-areas:
			' . . . root root . . .'
			' . . separator-1 separator-1 separator-1 separator-1 . .'
			' . form form . . h3 h3 .'
			' . fieldset fieldset . . . . .'
			' . separator-2 separator-2 . . . . .'
			'label label  input input . . . .';
	}

	.jsdom__node {
		@apply relative flex flex-col items-center rounded bg-secondary p-2 text-secondary-foreground;
	}

	.jsdom__node {
		&::before {
			content: '';
			top: 0;
			width: var(--line-height);
			height: calc(1rem + var(--line-height));
			transform: translate(50%, -100%);
			@apply absolute bottom-0 block rounded-t bg-zinc-300;
		}
	}

	.jsdom__separator {
		@apply rounded bg-zinc-300;
	}

	.jsdom__root {
		&::before {
			height: 0;
		}
	}

	.jsdom__node-parent {
		&::after {
			content: '';
			bottom: 0;
			width: var(--line-height);
			height: calc(1rem + var(--line-height));
			transform: translate(50%, 100%);
			@apply absolute bottom-0 block rounded-t bg-zinc-300;
		}
	}

	.jsdom__leaf {
		margin-right: 0.25rem;
	}
</style>
