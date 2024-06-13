<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	type ReactivityDemoProps = {
		name?: string;
	};

	const { name: defaultName }: ReactivityDemoProps = $props();

	let name = $state(defaultName ?? 'Demo');
</script>

<div class="my-8 ml-12 max-w-[clamp(24rem,60vw,60rem)] space-y-4">
	<form>
		<fieldset class="space-y-2">
			<Label for="demo__name" class="text-responsive-sm">Name</Label>
			<Input id="demo__name" class="text-responsive-sm" bind:value={name} />
		</fieldset>
	</form>
	<h3
		class="rounded-md border-4 border-dashed border-primary px-2 py-4 text-responsive font-bold tracking-wider"
	>
		Great job, <span class="mx-1 text-primary">{name}</span>!
	</h3>
</div>
