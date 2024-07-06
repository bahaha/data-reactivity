<script lang="ts">
	import { JsDomTree, CppDom } from '$lib/components';
	import { codeToHtml } from 'shiki';
	import { cn } from '$lib/utils';
	import _state from './state.svelte';
	import { createFlipAnimation } from '$lib/animation';
	import { onMount } from 'svelte';
	import { transformerMetaHighlight } from '@shikijs/transformers';

	type VDomProps = {
		slide: number;
	};

	let vdomJs = $state('');

	const nSlides = 6;
	const { slide: _slide }: VDomProps = $props();
	const slide = $derived(_slide % nSlides);

	$effect(() => {
		codeToHtml(_state.vDomReactivity, {
			lang: 'javascript',
			theme: 'catppuccin-mocha',
			transformers: [transformerMetaHighlight()],
			meta: { __raw: '{12,26-28,31}' }
		}).then((rendered) => void (vdomJs = rendered));
	});

	let layout: ReturnType<typeof createFlipAnimation> | undefined;
	onMount(() => {
		const boxes = Array.from(
			document.querySelectorAll<HTMLElement>(
				['js-dom-tree', 'cpp-dom', 'js'].map((box) => `.vdom__${box}`).join(',')
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
		container: cn('grid grid-cols-[3fr_2fr] gap-4 items-center', {
			container: slide === 0
		}),
		jsDomTree: cn({ 'col-start-1': slide === 0, 'col-start-2': slide > 0 }),
		cppDom: cn({ 'col-start-2 z-50': slide === 0, hidden: slide > 0 }),
		vdomJs: cn({ hidden: slide !== 1, 'row-start-1 col-start-1 z-50': slide === 1 }),
		keyFactors: cn({ hidden: slide < 2, 'row-start-1 col-start-1 z-50': slide >= 2 })
	});
</script>

<main class={cn('vdom__container relative', styles.container)} data-slide={slide}>
	<div class="absolute z-10 flex translate-y-[150%] gap-4 opacity-10">
		<img class="h-40" src="/React.png" alt="React" />
		<img class="h-40" src="/vue-uwu.png" alt="Vue" />
		{#if slide != 1}
			<img class="h-40" src="/angular-uwu.png" alt="Angular" />
		{/if}
	</div>
	<JsDomTree
		class={cn('vdom__js-dom-tree', styles.jsDomTree)}
		name={_state.name}
		greeting={_state.greeting}
	/>
	<CppDom
		class={cn('vdom__cpp-dom', styles.cppDom)}
		name={_state.name}
		greeting={_state.greeting}
	/>
	<div class={cn('vdom__js rounded text-sm', styles.vdomJs)}>
		{@html vdomJs}
	</div>
	<div class={cn('mx-auto', styles.keyFactors)}>
		<ul>
			<li>
				<h3 class={cn('inline-block text-2xl font-bold', slide <= 3 && 'text-primary')}>WHEN</h3>
				<span class="ml-2 text-sm">to do dirty check?</span>

				<ul class={cn('list-disc', slide < 3 && 'hidden')}>
					<li>
						<a
							href="https://developer.chrome.com/static/blog/using-requestidlecallback/image/a-typical-frame-1b127e5dc4714_1920.jpg"
							target="_blank"
						>
							requestAnimationFrame > reflow / repaint > requestIdleCallback
						</a>
					</li>
					<li>
						<a
							href="https://blog.angular.dev/how-the-angular-compiler-works-42111f9d2549"
							target="_blank"
						>
							Zone.js (monkey patching)
						</a>
					</li>
				</ul>
			</li>
			<li>
				<h3
					class={cn('inline-block text-2xl font-bold', slide > 3 && slide <= 5 && 'text-primary')}
				>
					WHO
				</h3>
				<span class="ml-2 text-sm">need to be updated?</span>
			</li>
			<li>
				<h3
					class={cn('inline-block text-2xl font-bold', slide > 3 && slide <= 5 && 'text-primary')}
				>
					WHAT
				</h3>
				<span class="ml-2 text-sm">props need to update?</span>
			</li>

			<ul class={cn('list-disc', slide < 5 && 'hidden')}>
				<li>
					<a href="https://legacy.reactjs.org/docs/reconciliation.html" target="_blank">
						Tree travseral w/ DFS
					</a>
					<a href="https://www.youtube.com/watch?v=ZCuYPiUIONs" target="_blank"> React Fiber </a>
					<span>(shouldComponentUpdate)</span>
				</li>
				<li>
					<a
						href="https://blog.angular.dev/how-the-angular-compiler-works-42111f9d2549"
						target="_blank"
					>
						Tree Travseral + Change Detection w/ Compiler
					</a>
					<span>(ChangeDetectionStrategy.OnPush)</span>
				</li>
				<li>Immutable</li>
			</ul>
		</ul>
	</div>
</main>
