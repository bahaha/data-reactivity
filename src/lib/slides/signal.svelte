<script lang="ts">
	import { codeToHtml } from 'shiki';
	import { onMount } from 'svelte';
	import { transformerNotationFocus } from '@shikijs/transformers';

	type SignalProps = {
		slide: number;
	};

	const nSlides = 5;
	const { slide: _slide }: SignalProps = $props();
	const slide = $derived(_slide % nSlides);

	let client = $state('');
	let signalFn = $state('');
	let effectFn = $state('');
	let derivedFn = $state('');

	const clientCode = `import { signal, derived, effect } from './signal';
/* ...js dom variables */
const name = signal('')
const greeting = derived(() => \`Hey \${name.value}, great job!\`);
effect(() => console.log(name.value))
effect(() => void (box.innerText = greeting.value));

input.addEventListenter('input', e => void (name.value = e.target.value));
`;

	const signalCode = $derived.by(() => {
		const focus = slide <= 1 ? '// [!code focus]' : '';
		return `let subscriber = null; ${focus}
export function signal(initVal) {                       // Signal ${focus}
    let val = initVal;
    const subs = new Set();

    return {
        get value() {
            if (subscriber) subs.add(subscriber);
            return val;
        },
        set value(nextVal) {
            val = nextVal;
            subs.forEach(sub => sub(val));
        }
    }
} ${focus}
`;
	});

	const effectCode = $derived.by(() => {
		const focus = slide <= 2 ? '// [!code focus]' : '';
		return `export function effect(fn) {                            // Reaction ${focus}
    subscriber = fn;
    fn();
    subscriber = null;
} ${focus}
`;
	});

	const derivedCode = $derived.by(() => {
		const focus = slide <= 3 ? '// [!code focus]' : '';
		return `export function derived(fn) {                   // Derivation ${focus}
    const computed = signal();
    effect(() => computed.value = fn());
    return computed;
} ${focus}
`;
	});

	onMount(() => {
		codeToHtml(clientCode, {
			lang: 'javascript',
			theme: 'catppuccin-mocha'
		}).then((rendered) => void (client = rendered));
	});

	$effect(() => {
		codeToHtml(signalCode, {
			lang: 'javascript',
			theme: 'catppuccin-mocha',
			transformers: [transformerNotationFocus()]
		}).then((rendered) => void (signalFn = rendered));

		codeToHtml(effectCode, {
			lang: 'javascript',
			theme: 'catppuccin-mocha',
			transformers: [transformerNotationFocus()]
		}).then((rendered) => void (effectFn = rendered));

		codeToHtml(derivedCode, {
			lang: 'javascript',
			theme: 'catppuccin-mocha',
			transformers: [transformerNotationFocus()]
		}).then((rendered) => void (derivedFn = rendered));
	});
</script>

{#if slide === 0}
	<main class="container text-center">
		<h1 class="font-lemon text-full font-bold"><span class="text-primary">Signal</span> Pattern</h1>
	</main>
{:else}
	<main class="grid grid-cols-2 grid-rows-[6fr_4fr] gap-4" data-slide={slide}>
		<section>
			{@html client}
		</section>
		<section class="col-start-2 row-start-1">
			{@html signalFn}
		</section>
		<section class="row-start-2">
			{@html effectFn}
		</section>
		<section class="col-start-1 row-start-2">
			{@html derivedFn}
		</section>
	</main>
{/if}
