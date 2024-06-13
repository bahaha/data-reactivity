import { linear } from './easing';

type FlipOptions = {
	duration: number;
	delay: number;
	stagger: number;
	easing: string;
};

export function createFlipAnimation(
	selectorOrNode: string | NodeListOf<Element> | HTMLElement[],
	defaultOptions: Partial<FlipOptions> = {}
) {
	const fromRect = new Map<HTMLElement, DOMRect>();
	const runningAnimations = new Set<HTMLElement>();

	function getAnimateNodes(): HTMLElement[] {
		return Array.from(
			typeof selectorOrNode === 'string'
				? document.querySelectorAll<HTMLElement>(selectorOrNode)
				: (selectorOrNode as NodeListOf<HTMLElement>)
		);
	}

	function isolateLayer(node: HTMLElement, position: DOMRect) {
		node.style.position = 'absolute';
		node.style.width = `${position.width}px`;
		node.style.height = `${position.height}px`;
		node.style.left = `${position.left}px`;
		node.style.top = `${position.top}px`;

		return () => {
			node.removeAttribute('style');
		};
	}

	function invertTransforms(
		node: HTMLElement,
		from: DOMRect,
		to: DOMRect,
		options: Omit<FlipOptions, 'stagger'>
	) {
		const { promise, resolve } = Promise.withResolvers<void>();
		if (runningAnimations.has(node)) {
			node.getAnimations().forEach((animation) => animation.finish());
			runningAnimations.delete(node);
			node.removeAttribute('style');
		}

		const dx = to.left - from.left;
		const dy = to.top - from.top;

		const resetStyles = isolateLayer(node, from);
		const animate = node.animate(
			[
				{
					width: `${from.width}px`,
					height: `${from.height}px`,
					transform: `translate(0px, 0px)`
				},
				{
					width: `${to.width}px`,
					height: `${to.height}px`,
					transform: `translate(${dx}px, ${dy}px)`
				}
			],
			{ ...options, fill: 'backwards' }
		);
		runningAnimations.add(node);

		animate.onfinish = () => {
			resetStyles();
			resolve();
			runningAnimations.delete(node);
		};

		return promise;
	}

	function snapshot() {
		const nodes = getAnimateNodes();
		const measures = nodes.map((node) => node.getBoundingClientRect());
		for (let i = 0; i < nodes.length; i++) {
			fromRect.set(nodes[i], measures[i]);
		}
	}

	function animate(options: Partial<FlipOptions> = {}) {
		const { promise, resolve } = Promise.withResolvers<void>();
		const {
			duration = 600,
			delay = 0,
			stagger = 0,
			easing = linear
		} = { ...defaultOptions, ...options };
		const animations: Promise<void>[] = [];

		requestAnimationFrame(() => {
			const nodes = getAnimateNodes();
			const measures = nodes.map((node) => node.getBoundingClientRect());

			for (let i = 0; i < nodes.length; i++) {
				const from = fromRect.get(nodes[i]);
				const to = measures[i];
				fromRect.set(nodes[i], to);
				if (!from) continue;

				const flipAnimation = invertTransforms(nodes[i], from, to, {
					duration,
					delay: i * stagger + delay,
					easing
				});
				animations.push(flipAnimation);
			}

			Promise.all(animations).then(() => resolve());
		});

		return promise;
	}

	return { animate, snapshot };
}
