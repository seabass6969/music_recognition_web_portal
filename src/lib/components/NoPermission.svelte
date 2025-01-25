<script>
    import {alert_no_permission, first_trying_permission} from '$lib/stores.ts'
</script>
{#if ($alert_no_permission == true && $first_trying_permission == false)}
    <div class="absolute h-screen w-screen z-10  flex justify-center items-center bg-gradient-to-b from-white/60 to-red-600/50 backdrop-blur-lg">
    <div class="text-white bg-gray-900 h-3/6 w-3/4 border-black rounded-2xl p-10 md:p-20 grid items-center justify-center shadow-2xl shadow-gray-800 md:text-3xl text-lg gap-3" role="dialog" aria-modal="true">
            <div>Please allow the microphone permission.</div>
        </div>
    </div>
{/if}
