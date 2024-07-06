<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	type ReactivityDemoProps = {
		name?: string;
		greeting?: string;
	};

	let { name = $bindable('Demo'), greeting }: ReactivityDemoProps = $props();
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
		{greeting}
	</h3>
</div>
