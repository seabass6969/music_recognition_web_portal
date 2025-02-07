<script lang="ts">
    import {there_is_result, error_result, error_reason, start_stop, loading, song_results} from '$lib/stores.ts'
    import {send, receive} from '$lib/animation.ts'
    import {fade} from 'svelte/transition'
    function close(){
        there_is_result.set(false)
        error_result.set(false)
        start_stop.set(false)
        loading.set(false)
        song_results.set(undefined)
        error_reason.set(undefined)
        
    }
    function licenseTextReplacer(text: string){
        const replacer = [
            {text: "Creative Commons Attribution: http://creativecommons.org/licenses/by/3.0/", "replacer": `<a href="http://creativecommons.org/licenses/by/3.0/" class="underline text-blue-300">CC BY 3.0</a>`}
        ]
        return replacer.filter(content => content.text == text)[0].replacer ?? "Unknown License"
    }
</script>

{#if $there_is_result}
<div class="absolute h-screen w-screen z-30 flex justify-center items-center bg-gradient-to-b from-white/60 to-blue-600/50 backdrop-blur-lg" transition:fade>
        <div class="text-white bg-gray-900 h-5/6 w-3/4 border-black rounded-2xl p-5 md:p-10 grid auto-rows-max gap-3 shadow-2xl shadow-indigo-900" role="dialog" aria-modal="true" in:receive={{key: "loading"}} out:send={{key: "loading"}}>
            <button class="size-fit" onclick={close}><img src="/close.svg" alt=""></button>
            {#if $error_result == false}
                <div class="md:text-3xl text-2xl font-extrabold underline">Track Information:</div>
                <div class="grid grid-cols-[min-content_max-content] gap-2 md:gap-5 max-w-full h-full">
<div class="font-bold md:text-3xl text-sm">Name:</div>
                    <div class="font-bold md:text-3xl text-sm overflow-ellipsis w-auto max-w-[50vw]">{$song_results["Name"]}</div>
<div class="font-bold md:text-3xl text-sm">Author:</div>
                    <div class="font-bold md:text-lg text-sm overflow-ellipsis w-auto max-w-[50vw]">{$song_results["Author"]}</div>
<div class="font-bold md:text-3xl text-sm">Genre:</div>
                    <div class="font-bold md:text-lg text-sm overflow-ellipsis w-auto max-w-[50vw]">{$song_results["Genre"]}</div>
<div class="font-bold md:text-3xl text-sm">Location:</div>
                    <div class="font-bold md:text-lg text-sm overflow-ellipsis w-auto max-w-[50vw]"><a href={$song_results["Original_location"]} class="underline text-blue-300">Location</a></div>
<div class="font-bold md:text-3xl text-sm">License:</div>
                    <div class="font-bold md:text-lg text-sm overflow-ellipsis w-auto max-w-[50vw]">{@html licenseTextReplacer($song_results["License"])}</div>
                </div>
            {:else}
                {#if $error_reason == "too short"}
                <div class="flex gap-1">
                    <img src="/error.svg" alt=""><div class="font-bold">Sorry, we unable recognise this song, because the duration is too short. </div>
                </div>
                {:else}
                <div class="flex gap-1">
                    <img src="/error.svg" alt=""><div class="font-bold">Sorry, we unable recognise this song, or this song is not inside our database.</div>
                </div>
                {/if}
            {/if}
        </div>
</div>
{/if}
