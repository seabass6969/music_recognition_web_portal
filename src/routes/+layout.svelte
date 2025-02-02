<script lang="ts">
    import NoPermission from '$lib/components/NoPermission.svelte'
    import SongResult from '$lib/components/SongResult.svelte'
	import '../app.css';
	let { children } = $props();
</script>

<NoPermission />
<SongResult />

<div class="md:h-screen h-[92vh] w-screen bg-gradient-to-tl from-cyan-200 to-zinc-200 flex flex-col">
{@render children()}
<div class="w-screen h-10 flex-grow-0 text-center text-sm md:text-lg z-10">Made By Cephas. For more information visit <a class="text-blue-800 underline" href="https://EPQ.cephas.monster">https://EPQ.cephas.monster</a>. <a class="text-blue-800 underline" href="/license">License Information</a></div>
</div>
