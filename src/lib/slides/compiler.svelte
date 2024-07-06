<script lang="ts">
	import { cn } from '$lib/utils';
	import _state from './state.svelte';
	import { Browser, ReactivityDemo } from '$lib/components';
	import { codeToHtml } from 'shiki';
	import { onMount } from 'svelte';

	type ObserverProps = {
		slide: number;
	};

	const nSlides = 2;
	const { slide: _slide }: ObserverProps = $props();
	const slide = $derived(_slide % nSlides);

	let svelteTpl = $state('');
	let compiledInstance = $state('');
	let compiledFragmentFn = $state('');

	const svelteReactivity = $derived(`<script>
    let name = '${_state.name}';
	   $: greeting = \`Hey \${name}, great job!\`;
<\/script>

<form>
	<fieldset>
			<label for="name">Name</label>
			<input id="name" type="text" bind:value={name} />
	</fieldset>
</form>
<h3>{greeting}</h3>
    `);

	$effect(() => {
		codeToHtml(svelteReactivity, {
			lang: 'svelte',
			theme: 'catppuccin-mocha'
		}).then((rendered) => void (svelteTpl = rendered));
	});

	const instanceFn = $derived(`function instance($$self, $$props, $$invalidate) {
    let greeting;
    let name = '${_state.name}';
    function input_input_handler() {
        name = this.value;
        $$invalidate(0, name);
    }
    $$self.$$.update = () => {
        if ($$self.$$.dirty & /*name*/ 1) {
            $: $$invalidate(1, greeting = \`Hey \${name}, great job!\`);
        }
    };

    return [name, greeting, input_input_handler];
 }
`);

	const fragmentFn = `function create_fragment(ctx) {
    /* variables in the fragment closure */
    return {
        c() { /* ... create: create DOM, assign attributes */ },
        m(target, anchor) {
            /* ... mount: append nodes as children, bind values */
            if (!mounted) {
                dispose = listen(input, "input", /* input_input_handler */ ctx[1]);
                mounted = true;
            }
        },
        p(ctx, [dirty]) { /* patch */
            if (dirty & /*name*/ 1 && input.value !== /*name*/ ctx[0]) {
                set_input_value(input, /*name*/ ctx[0]);
            }
            if (dirty & /*name*/ 1) set_data(/*text node*/ t4, /*name*/ ctx[0]);
        },
        ... /* other methods */
    }
}
`;

	$effect(() => {
		codeToHtml(instanceFn, {
			lang: 'javascript',
			theme: 'catppuccin-mocha'
		}).then((rendered) => void (compiledInstance = rendered));
	});

	onMount(() => {
		codeToHtml(fragmentFn, {
			lang: 'javascript',
			theme: 'catppuccin-mocha'
		}).then((rendered) => void (compiledFragmentFn = rendered));
	});

	const styles = $derived({
		container: cn('grid gap-2', {
			'grid-cols-[4fr_6fr]': slide !== 0,
			'grid-cols-[6fr_4fr]': slide === 0
		}),
		demo: cn('translate-x-12', { hidden: slide !== 0 }),
		svelteTpl: cn('rounded z-50', { hidden: slide !== 0 }),
		instanceFn: cn('rounded text-sm z-50', { hidden: slide === 0 }),
		fragmentFn: cn('rounded', { hidden: slide === 0 })
	});
</script>

<div class="relative">
	<img class="absolute z-10 translate-y-1/2 opacity-10" src="/svelte.png" alt="Svelte Logo" />
	<main class={cn('compiler__container', styles.container)} data-slide={slide}>
		<div class={cn('compiler__svelteTpl', styles.svelteTpl)}>
			{@html svelteTpl}
		</div>
		<div class={cn('compiler__instanceFn', styles.instanceFn)}>
			{@html compiledInstance}
			<a
				class="mt-4 block text-center text-xl text-primary underline"
				href="https://svelte.dev/repl/26c5b13ca8ea44d597ed4ea1e7a41ea9"
				target="_blank"
			>
				Source
			</a>
		</div>
		<div class={cn('compiler__fragmentFn', styles.fragmentFn)}>
			{@html compiledFragmentFn}
		</div>
		<Browser class={cn('compiler__demo', styles.demo)}>
			<ReactivityDemo bind:name={_state.name} greeting={_state.greeting} />
		</Browser>
	</main>
</div>
