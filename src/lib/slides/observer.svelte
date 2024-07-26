<script lang="ts">
	import { cn } from '$lib/utils';
	import { codeToHtml } from 'shiki';
	import { onMount } from 'svelte';
	import { transformerNotationFocus } from '@shikijs/transformers';

	type ObserverProps = {
		slide: number;
	};

	const nSlides = 2;
	const { slide: _slide }: ObserverProps = $props();
	const slide = $derived(_slide % nSlides);

	let client = $state('');
	let observable = $state('');

	const clientCode = `import { observable } from './observable';
/* ...js dom variables */
const name$ = observable('');                                           // Signal
const greeting$ = name$.map(name => \`Hey \${name}, great job!\`);         // Derivation
const sub = name$.subscribe(console.log);                               // Reaction
greeting$.subscribe(greeting => void (box.innerText = greeting));       // Reaction

input.addEventListenter('input', e => name$.next(e.target.value));
sub() /* unsubscribe / clean up */
`;

	const observableCode = `export function observable(initVal) { // [!code focus]
    let val = initVal;
    const subs = new Set();

    return {
        next: (newVal) => {
            val = newVal;
            subs.forEach(sub => sub(val));
        },
        subscribe: (sub) => {
            subs.add(sub);
            return () => subs.delete(sub);
        },
        map: function (fn) {
            const newObs = observable(fn(val))
            this.subscribe(newVal => newObs.next(fn(newVal)))
            return newObs;
        }
    }
} // [!code focus]
`;

	onMount(() => {
		codeToHtml(clientCode, {
			lang: 'javascript',
			theme: 'catppuccin-mocha'
		}).then((rendered) => void (client = rendered));

		codeToHtml(observableCode, {
			lang: 'javascript',
			theme: 'catppuccin-mocha',
			transformers: [transformerNotationFocus()]
		}).then((rendered) => void (observable = rendered));
	});
</script>

{#if slide === 0}
	<main class="container text-center">
		<h1 class="font-lemon text-full font-bold">
			<span class="text-primary">Observer</span> Pattern
		</h1>
	</main>
{:else}
	<main class="grid grid-cols-[6fr_4fr] gap-4" data-slide={slide}>
		<section>
			{@html client}
		</section>
		<section>
			{@html observable}
		</section>
	</main>
{/if}
