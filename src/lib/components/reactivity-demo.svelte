<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	let name = $state('Demo');
</script>

<div class="max-w-golden my-8 ml-16 space-y-4">
	<fieldset class="space-y-2">
		<Label>Name</Label>
		<Input bind:value={name} />
	</fieldset>
	<h3
		class="border-primary rounded-md border-4 border-dashed px-2 py-4 text-xl font-bold tracking-wider"
	>
		Great job, <span class="text-primary mx-1">{name}</span>!
	</h3>
</div>
