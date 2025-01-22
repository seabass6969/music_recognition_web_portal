<script lang="ts">
    import {onMount} from 'svelte'
    import uploadData from '$lib/uploadData.ts'
    //Inspired by https://cptcrunchy.medium.com/how-to-build-a-voice-recorder-with-sveltekit-d331e3e94af6
    let mediaRecorder: null | MediaRecorder = null
    let mediaChunk: Blob[] = []
    let start_stop = false
    let alert_no_permission = true
    let audioUrl = ""
    function record_stop(){
        if (start_stop){
            mediaRecorder!.stop()
            start_stop = false
        }else{
            mediaRecorder!.start()
            start_stop = true
            console.log(mediaRecorder!.state)
        }
    }
    onMount(async () => {
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
    })
</script>
{#if alert_no_permission}
    <div class=""></div>
    <div class="relative z-20" role="dialog" aria-modal="true">
        
    </div>
{/if}
<div class="h-full w-full flex justify-center items-center ">
    <!-- <audio controls id="audio"/> -->
        <button on:click={record_stop} class="bg-gradient-to-tl from-cyan-500 to-blue-500 rounded-full p-14 size-96 flex justify-center items-center transition ease-in-out delay-200 hover:translate-y-1 hover:from-cyan-600 hover:to-blue-600 "><img src="/note.svg" alt="" class="size-full"></button>
</div>
