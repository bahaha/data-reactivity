<script lang="ts">
	import { createFlipAnimation } from '$lib/animation';
	import { Browser, ReactivityDemo, CppDom } from '$lib/components';
	import { cn } from '$lib/utils';
	import { codeToHtml } from 'shiki';
	import { onMount } from 'svelte';

	type WebCoreProps = {
		slide?: number;
	};

	let { slide = 0 }: WebCoreProps = $props();
	let name = $state('CC');
	let html = $state('');
	const nSlides = 3;

	const snippet = $derived(`
    <form>
        <fieldset>
            <label for="name">Name</label>
            <input id="name" type="text" value="${name}" />
        </fieldset>
    </form>
    <h3>Great job, ${name}!<h3>
    `);

	$effect(() => {
		codeToHtml(snippet, {
			lang: 'html',
			theme: 'catppuccin-mocha'
		}).then((rendered) => void (html = rendered));
	});

	let layout: ReturnType<typeof createFlipAnimation> | undefined;
	onMount(() => {
		const boxes = Array.from(
			document.querySelectorAll<HTMLElement>(
				['html', 'preview', 'cpp-dom'].map((box) => `.web-core__${box}`).join(',')
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
			'pl-2 grid-cols-[7fr_3fr] grid-rows-2': slide > 0
		}),
		preview: cn({ 'col-start-1': slide === 0, 'translate-x-8 col-start-2 row-span-2': slide > 0 }),
		html: cn({ hidden: slide === 0 }),
		cppDom: cn({ hidden: slide < 2, 'row-start-2': slide >= 2 })
	});
</script>

<div class={cn('web-core__container grid items-center gap-4', styles.container)} data-slide={slide}>
	<div class={cn('web-core__html rounded text-responsive', styles.html)}>
		{@html html}
	</div>
	<CppDom class={cn('web-core__cpp-dom', styles.cppDom)} {name} />
	<Browser class={cn('web-core__preview', styles.preview)}>
		<ReactivityDemo {name} />
	</Browser>
</div>
