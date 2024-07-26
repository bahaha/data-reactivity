<script lang="ts">
	type AgendaProps = {
		slide?: number;
	};
	const nTotalSlides = 4;
	let { slide: _slide = 0 }: AgendaProps = $props();
	let slide = $derived(_slide % nTotalSlides);
</script>

<main class="container" data-slide={slide}>
	{#if slide === 0}
		<h1 class="font-lemon text-center text-full font-bold">
			Data&nbsp;<span class="text-primary"> Reactivity</span>
		</h1>
	{:else if slide === 1}
		<p class="text-4xl">What we will cover today:</p>
		<ul class="list-inside list-disc text-3xl">
			<li>Browser Rendering</li>
			<li>Reactivity in web libraries / frameworks</li>
			<li>Observer Pattern</li>
			<li><span class="text-destructive">Signal</span> Pattern</li>
		</ul>
	{:else if slide === 2}
		<h1 class="text-center text-4xl font-bold">
			Taking a step <span class="text-destructive">back</span> is the first step
			<span class="text-primary">forward</span>
		</h1>
	{:else if slide === 3}
		<section class="space-y-8 text-center">
			<div class="flex justify-center gap-2">
				<img class="h-40 opacity-5" src="/React.png" alt="React" />
				<img class="h-40" src="/vue-uwu.png" alt="Vue" />
				<img class="h-40" src="/angular-uwu.png" alt="Angular" />
			</div>
			<p class="text-4xl"><span class="mr-4 text-destructive">&#10084;</span>Signal</p>
			<div class="flex justify-center gap-8">
				<img class="h-40" src="/svelte.png" alt="Svelte" />
				<img class="h-40" src="/solid.png" alt="Solid" />
			</div>
		</section>
	{/if}
</main>
