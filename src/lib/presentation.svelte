<script lang="ts">
	import { keyStrokeHandlers, type KeyStroke } from './core/handlers';
	import type { PresentationProps, PresentationState } from './types';

	const STORAGE_KEY = '__ccpresentation__';
	const { children, ...props }: PresentationProps = $props();

	const snapshot = localStorage.getItem(STORAGE_KEY);
	const snapshotState = snapshot ? JSON.parse(snapshot) : {};

	const slide = $state({ value: snapshotState.slide ?? 0 });
	const step = $state({ value: snapshotState.step ?? 0 });

	const appState: PresentationState = $derived({ slide: slide.value, step: step.value });
	$effect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(appState)));

	function handleKeyboardStrike(evt: KeyboardEvent) {
		evt.preventDefault();
		const code = evt.code as KeyStroke;
		keyStrokeHandlers[code]?.(props, {
			get slide() {
				return slide.value;
			},
			get step() {
				return step.value;
			},
			set slide(value) {
				slide.value = value;
			},
			set step(value) {
				step.value = value;
			}
		});
	}
</script>

<svelte:window onkeydown={handleKeyboardStrike} />
{@render children(appState)}
