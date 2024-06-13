<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import { tv, type VariantProps } from 'tailwind-variants';

	const domVariants = tv({
		base: 'inline-flex flex-col gap-2 rounded-sm p-2',
		variants: {
			variant: {
				primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				accent: 'bg-accent text-accent-foreground hover:bg-accent/80',
				muted: 'bg-muted text-muted-foreground hover:bg-muted/80',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
			}
		},
		defaultVariants: {
			variant: 'primary'
		}
	});
	type Variant = VariantProps<typeof domVariants>['variant'];
	const separatorVariants: Record<Exclude<Variant, undefined>, string> = {
		primary: 'bg-primary-foreground',
		secondary: 'bg-secondary-foreground',
		accent: 'bg-accent-foreground',
		muted: 'bg-muted-foreground',
		destructive: 'bg-destructive-foreground'
	};

	type DomProps = {
		class?: string;
		variant?: Variant;
		tagName: string;
		attributes?: Snippet;
		children?: Snippet;
	};

	const {
		class: className,
		variant = 'primary',
		tagName,
		attributes,
		children
	}: DomProps = $props();
</script>

<section class={cn(domVariants({ className, variant }))}>
	<h5>{tagName}</h5>
	<Separator class={separatorVariants[variant]} />
	{#if attributes}
		<div class="grid auto-rows-auto place-items-center rounded bg-foreground p-2 text-background">
			{@render attributes()}
		</div>
	{/if}
	{#if children}
		<div>
			{@render children()}
		</div>
	{/if}
</section>
