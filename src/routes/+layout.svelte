<script>
	import '../app.css';

	const { children } = $props();
</script>

{@render children()}

<style>
	:global(body) {
		height: 100dvh;
		display: grid;
		grid-template-columns: 1fr;
		place-content: center;
	}
</style>
