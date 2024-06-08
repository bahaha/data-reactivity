import type { Snippet } from 'svelte';

export type PresentationState = { slide: number; step: number };
export type PresentationProps = {
	onSlideChange?: (slide: number) => void;
	onStepChange?: (step: number, reset: boolean) => void;
	children: Snippet<[PresentationState]>;
};
