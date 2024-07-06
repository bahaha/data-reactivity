<script lang="ts">
	import { createFlipAnimation } from '$lib/animation';
	import { Browser, ReactivityDemo, CppDom, JsMemoryDOM } from '$lib/components';
	import { cn } from '$lib/utils';
	import { codeToHtml } from 'shiki';
	import { transformerMetaHighlight } from '@shikijs/transformers';
	import { onMount } from 'svelte';
	import _state from './state.svelte';

	type WebCoreProps = {
		slide?: number;
	};

	let { slide: _slide = 0 }: WebCoreProps = $props();
	let html = $state('');
	let jsDom = $state('');
	const jsVisualizerSteps = 3;
	const webCoreSlides = 4;
	const nSlides = webCoreSlides + jsVisualizerSteps;
	const slide = $derived(_slide % nSlides);
	const currJsStep = $derived(slide - webCoreSlides + 1);

	let highlightedLinesOfSteps = ['{1}', '{2}', '{3-5}', '{6}'];

	$effect(() => {
		codeToHtml(_state.markup, {
			lang: 'html',
			theme: 'catppuccin-mocha'
		}).then((rendered) => void (html = rendered));
	});

	$effect(() => {
		codeToHtml(_state.jsReactivity, {
			lang: 'javascript',
			theme: 'catppuccin-mocha',
			transformers: [transformerMetaHighlight()],
			meta: { __raw: `${highlightedLinesOfSteps.at(currJsStep)!}` }
		}).then((rendered) => void (jsDom = rendered));
	});

	let layout: ReturnType<typeof createFlipAnimation> | undefined;
	onMount(() => {
		const boxes = Array.from(
			document.querySelectorAll<HTMLElement>(
				['html', 'preview', 'cpp-dom', 'js', 'js-memory-dom']
					.map((box) => `.web-core__${box}`)
					.join(',')
			)
		);
		layout = createFlipAnimation(boxes, { duration: 600, stagger: 30 });
		layout.snapshot();
	});

	$effect(() => {
		if (slide >= nSlides) return;
		layout?.animate();
	});

	const styles = $derived({
		container: cn({
			'grid-cols-1 container ': slide === 0,
			'pl-2 grid-cols-[4fr_4fr_3fr] grid-rows-[4fr_6fr]': slide > 0
		}),
		preview: cn({
			'col-start-1': slide === 0,
			'translate-x-8 col-start-3 row-span-2': slide > 0,
			hidden: slide > 2
		}),
		html: cn({ hidden: slide === 0 || slide > 2, 'col-span-2': slide > 0 }),
		js: cn({ hidden: slide < 3, 'col-span-2': slide > 2 }),
		cppDom: cn('self-start col-start-2 row-start-2', {
			hidden: slide < 2,
			'col-start-3 row-start-1 row-span-2': slide > 2
		}),
		jsMemoryDom: cn('self-start', {
			hidden: slide < 3,
			'col-start-1 col-span-2 row-start-2': slide > 2
		})
	});
</script>

<main
	class={cn('web-core__container grid items-center gap-4', styles.container)}
	data-slide={slide}
>
	<div class={cn('web-core__js rounded text-responsive', styles.js)}>
		{@html jsDom}
	</div>
	<div class={cn('web-core__html rounded text-responsive', styles.html)}>
		{@html html}
	</div>
	<JsMemoryDOM
		class={cn('web-core__js-memory-dom', styles.jsMemoryDom)}
		name={_state.name}
		greeting={_state.greeting}
		step={currJsStep}
	/>
	<CppDom
		class={cn('web-core__cpp-dom', styles.cppDom)}
		name={_state.name}
		greeting={_state.greeting}
	/>
	<Browser class={cn('web-core__preview', styles.preview)}>
		<ReactivityDemo bind:name={_state.name} greeting={_state.greeting} />
	</Browser>
</main>
