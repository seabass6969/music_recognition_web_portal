<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="h-screen w-screen bg-gradient-to-tl from-cyan-200 to-zinc-200 inline-grid grid-cols-1 auto-cols-auto">
{@render children()}
<div class="w-screen h-fit">Made By Cephas</div>
</div>
