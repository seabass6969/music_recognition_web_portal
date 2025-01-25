<script>
    import {there_is_result} from '$lib/stores.ts'
    import {send, receive} from '$lib/animation.ts'
</script>

{#if $there_is_result}
<div class="absolute h-screen w-screen z-10 flex justify-center items-center bg-gradient-to-b from-white/60 to-blue-600/50 backdrop-blur-lg">
    <div class="text-white bg-gray-900 h-3/6 w-3/4 border-black rounded-2xl p-10 md:p-20 grid items-center justify-center shadow-2xl shadow-indigo-900 md:text-xl text-sm gap-3" role="dialog" aria-modal="true" in:receive={{key: "loading"}} out:send={{key: "loading"}}>
        <div>Song name: COMING SOON</div>

    </div>
</div>
{/if}
