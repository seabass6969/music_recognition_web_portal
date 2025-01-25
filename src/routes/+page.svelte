<script lang="ts">
    import {onMount} from 'svelte'
    import SongResult from '$lib/components/SongResult.svelte'
    import Record from '$lib/components/Record.svelte'
    import {upload_data, request_id, process_file} from '$lib/uploadData.ts'
    import {alert_no_permission, loading, there_is_result, start_stop, first_trying_permission} from '$lib/stores.ts'
    import {sleep} from '$lib/sleep.ts'
    

    //Inspired by https://cptcrunchy.medium.com/how-to-build-a-voice-recorder-with-sveltekit-d331e3e94af6

    let mediaRecorder: null | MediaRecorder = null
    let mediaChunk: Blob[] = []
    let audioUrl = ""
    let id = ""
    async function record_stop(){
        if ($start_stop){
            loading.set(true)
            await sleep(1000)
            there_is_result.set(true)
            // mediaRecorder!.stop()
            // start_stop.set(false)
            console.log("stopped")
        }else{
            // mediaRecorder!.start()
            start_stop.set(true)
            console.log("started")
        }
    }
    onMount(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true})
            alert_no_permission.set(false)
            console.log(stream)
            mediaRecorder = new MediaRecorder(stream)
            mediaRecorder.ondataavailable = (e: BlobEvent) => mediaChunk.push(e.data)
            mediaRecorder.onstart = async () => {
                id = await request_id()
                console.log(id)
            }
            mediaRecorder.onstop = async () => {
                const blob = new Blob(mediaChunk, {type: 'audio/wav' })
                mediaChunk = []
                audioUrl = window.URL.createObjectURL(blob)
                loading.set(true)
                await upload_data(blob, id)
                console.log(await process_file(id))
                loading.set(false)
            }
        } catch {
            first_trying_permission.set(false)
        }
    })
</script>
<div class="h-full w-full flex justify-center items-center flex-grow flex-col">
    <!-- <audio controls id="audio"/> -->
        <div class="h-20 flex justify-center">
            {#if $alert_no_permission == false}
                {#if $start_stop}
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
    <Record clicking={record_stop}/>
    <div class="h-20"></div>
</div>

