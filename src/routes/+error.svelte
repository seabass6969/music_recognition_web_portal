<script lang="ts">
	import { page} from '$app/state';
    console.log(page.error)
</script>

<div class="h-screen w-screen bg-gradient-to-tl from-cyan-200 to-zinc-200 flex justify-center items-center">
<div class="text-white bg-gray-900 h-2/3 w-2/3 border-black rounded-2xl p-20 grid items-center justify-center shadow-2xl shadow-gray-800 md:text-3xl text-lg gap-3">
    404 Error: {page.error.message} 
    </div>
    </div>
