import type { PresentationProps, PresentationState } from '../types';

export type KeyStrokeHandler = (
	props: Omit<PresentationProps, 'children'>,
	state: PresentationState
) => void;
