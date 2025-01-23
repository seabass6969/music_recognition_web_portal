<script lang="ts">
    import {onMount} from 'svelte'
    import uploadData from '$lib/uploadData.ts'
    import {fade} from 'svelte/transition'
    //Inspired by https://cptcrunchy.medium.com/how-to-build-a-voice-recorder-with-sveltekit-d331e3e94af6
    let mediaRecorder: null | MediaRecorder = null
    let mediaChunk: Blob[] = []
    let start_stop = false
    let alert_no_permission = true
    let first_trying_permission = true
    let audioUrl = ""
    function record_stop(){
        if (start_stop){
            // mediaRecorder!.stop()
            start_stop = false
            console.log("stopped")
        }else{
            // mediaRecorder!.start()
            start_stop = true
            console.log("started")
        }
    }
    onMount(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true})
            alert_no_permission = false
            console.log(stream)
            mediaRecorder = new MediaRecorder(stream)
            mediaRecorder.ondataavailable = (e: BlobEvent) => mediaChunk.push(e.data)
            mediaRecorder.onstop = async () => {
                const blob = new Blob(mediaChunk, {type: 'audio/wav' })
                mediaChunk = []
                audioUrl = window.URL.createObjectURL(blob)
                await uploadData(blob)
            }
        } catch {
            first_trying_permission = false
        }
    })
</script>
{#if (alert_no_permission == true && first_trying_permission == false)}
    <div class="absolute h-screen w-screen z-10 backdrop-blur-xl flex justify-center items-center">
        <div class="bg-white z-20 h-20 w-fit border-2 border-black rounded-2xl p-20 flex justify-center items-center" role="dialog" aria-modal="true">
            <div>You need to enable your microphone permission to proceed.</div>
        </div>
    </div>
{/if}
<div class="h-full w-full flex justify-center items-center flex-grow flex-col">
    <!-- <audio controls id="audio"/> -->
        <div class="h-20 flex justify-center">
            {#if alert_no_permission == false}
                {#if start_stop}
                    <div class="animate-pulse text-red-800 flex flex-row font-semibold items-center">
                        <img src="/microphone.svg" alt=""> 
                        <div>Recording Currently</div>
                    </div>

                {:else}
                    <div class="text-indigo-800 flex flex-row font-semibold items-center">
                        <img src="/mute.svg" alt=""> 
                        <div>Press Below to start</div>
                    </div>
                {/if}
            {/if}
        </div>
        {#if alert_no_permission}
        <button class="shadow-2xl shadow-blue-100 bg-blue-500 rounded-full p-14 size-96 flex justify-center items-center transition ease-in-out delay-200 hover:translate-y-1"><img src="/loading.svg" alt="" class="animate-spin size-full"></button>
        {:else if start_stop == false}
        <button on:click={record_stop} class="shadow-2xl shadow-blue-100 bg-blue-500 rounded-full p-14 size-96 flex justify-center items-center transition ease-in-out delay-200 hover:translate-y-1"><img src="/note.svg" alt="" class="size-full"></button>
        {:else}
        <button on:click={record_stop} class="shadow-2xl shadow-rose-500 bg-red-500 rounded-full p-14 size-96 flex justify-center items-center transition ease-in-out delay-200 hover:translate-y-1"><img src="/note.svg" alt="" class="size-full"></button>
        {/if}
        <div class="h-20"></div>
</div>
