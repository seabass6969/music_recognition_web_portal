<script lang="ts">
	import '../../app.css';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<div class="h-screen w-screen bg-gradient-to-tl from-cyan-200 to-zinc-200 flex flex-col">
{@render children()}
<div class="w-screen h-10 flex-grow-0 text-center text-sm md:text-lg">Made By Cephas. For more information visit <a class="text-blue-800 underline" href="https://EPQ.cephas.monster">https://EPQ.cephas.monster</a>. <a class="text-blue-800 underline" href="/license">License Information</a></div>
</div>
