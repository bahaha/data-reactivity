<script lang="ts">
	import { Browser, ReactivityDemo } from '$lib/components';
	import { cn } from '$lib/utils';

	type WebCoreProps = {
		step?: number;
	};

	const { step = 0 }: WebCoreProps = $props();
</script>

<main class="container">
	<Browser url="http://localhost:55688/">
		<div class={cn('grid', {})}>
			<ReactivityDemo />
		</div>
	</Browser>
</main>
