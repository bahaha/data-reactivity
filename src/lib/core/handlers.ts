import type { KeyStrokeHandler } from './types';

const keyDownHandler: KeyStrokeHandler = (props, state) => {
	state.step = state.step + 1;

	props.onStepChange?.(state.step, false);
};

const keyUpHandler: KeyStrokeHandler = (props, state) => {
	if (state.step === 0) return;
	state.step = state.step - 1;

	props.onStepChange?.(state.step, false);
};

const keyRightHandler: KeyStrokeHandler = (props, state) => {
	state.slide = state.slide + 1;
	state.step = 0;

	props.onSlideChange?.(state.slide);
	props.onStepChange?.(state.step, true);
};

const keyLeftHandler: KeyStrokeHandler = (props, state) => {
	if (state.slide === 0) return;
	state.slide = state.slide - 1;
	state.step = 0;
	props.onSlideChange?.(state.slide);
	props.onStepChange?.(state.step, true);
};

const fullScreenHandler: KeyStrokeHandler = () => {
	const activeElement = document.activeElement as HTMLElement;
	if (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT') {
		return;
	}

	const isFullScreen = document.fullscreenElement !== null;
	if (isFullScreen) {
		document.exitFullscreen();
	} else {
		document.documentElement.requestFullscreen();
	}
};

const supportKeyStrokes = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'KeyF'] as const;
export type KeyStroke = (typeof supportKeyStrokes)[number];

export const keyStrokeHandlers: Record<KeyStroke, KeyStrokeHandler> = {
	ArrowDown: keyDownHandler,
	ArrowUp: keyUpHandler,
	ArrowLeft: keyLeftHandler,
	ArrowRight: keyRightHandler,
	KeyF: fullScreenHandler
};
