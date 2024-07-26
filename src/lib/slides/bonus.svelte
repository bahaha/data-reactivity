<script lang="ts">
	type BonusProps = { slide: number };

	const nSlides = 3;
	const { slide: _slide }: BonusProps = $props();
	const slide = $derived(_slide % nSlides);
</script>

<main class="container text-center">
	{#if slide === 0}
		<h1 class="font-lemon text-full font-bold text-primary">Bonus</h1>
	{:else if slide === 1}
		<div class="flex items-center justify-between gap-4">
			<section
				class="h-56 w-56 space-y-4 rounded bg-secondary text-secondary-foreground ring-4 ring-secondary ring-offset-4 ring-offset-background"
			>
				<span>Frontend</span>
				<div class="mx-auto flex h-40 w-40 items-center justify-center rounded bg-success px-4">
					State Management
				</div>
			</section>
			<span
				class="inline-flex h-screen items-center rounded border bg-muted p-8 text-muted-foreground"
			>
				API
			</span>
			<div class="flex items-end gap-4">
				<section
					class="h-56 w-56 space-y-4 rounded bg-warning text-destructive-foreground ring-4 ring-warning ring-offset-4 ring-offset-background"
				>
					<span>Backend</span>
				</section>
				<div
					class="-mx-16 -my-16 flex h-40 w-40 items-center justify-center rounded bg-primary px-4 text-primary-foreground"
				>
					Database
				</div>
			</div>
		</div>
	{:else if slide === 2}
		<h1 class="font-lemon text-full font-bold">
			<a href="https://htmx.org/examples/" target="_blank">
				HTM<span class="text-destructive">X</span>
			</a>
		</h1>
	{/if}
</main>
