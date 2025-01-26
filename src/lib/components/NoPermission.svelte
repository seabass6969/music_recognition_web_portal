<script>
    import {alert_no_permission, first_trying_permission} from '$lib/stores.ts'
    import {fade} from 'svelte/transition'
</script>
{#if ($alert_no_permission == true && $first_trying_permission == false)}
    <div class="absolute h-screen w-screen z-10  flex justify-center items-center bg-gradient-to-b from-white/60 to-red-600/50 backdrop-blur-lg" transition:fade>
    <div class="text-white bg-gray-900 h-3/6 md:w-3/4 w-11/12 border-black rounded-2xl p-10 md:p-10 grid auto-rows-min gap-3 shadow-2xl shadow-gray-800 md:text-3xl text-lg" role="dialog" aria-modal="true">
            <img src="/mic_alert.svg" alt="" class="md:size-10">
            <div>Please allow the microphone permission.</div>
        </div>
    </div>
{/if}
