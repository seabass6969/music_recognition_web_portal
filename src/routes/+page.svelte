<script lang="ts">
    import {slide} from 'svelte/transition'
    import {onMount} from 'svelte'
    import Record from '$lib/components/Record.svelte'
    import {upload_data, request_id, process_file} from '$lib/uploadData.ts'
    import {alert_no_permission, loading, there_is_result, start_stop, first_trying_permission, song_results, error_result, error_reason} from '$lib/stores.ts'
    import {loading_messages} from '$lib/loading_message.ts'
    //Inspired by https://cptcrunchy.medium.com/how-to-build-a-voice-recorder-with-sveltekit-d331e3e94af6
    let mediaRecorder: null | MediaRecorder = null
    let mediaChunk: Blob[] = []
    let id = ""
    let changing_message = $state(0)
    let elapsed = $state(0)
    let start_time = 0
    const time_limit = 60

    async function record_stop(){
        if ($start_stop){
            loading.set(true)
            mediaRecorder!.stop()
        }else{
            mediaRecorder!.start()
            start_stop.set(true)

            // auto cut off feature
            let frame = requestAnimationFrame(function update(time){
                if (start_time == 0){
                    start_time = time
                }
                frame = requestAnimationFrame(update)
                elapsed = time - start_time
                if (elapsed >= (30 * 1000)){
                    cancelAnimationFrame(frame)
                    console.log("Time limit reached, automatic cut off")
                    start_time = 0
                    record_stop()
                }
            })
        }
    }

    onMount(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true})
            alert_no_permission.set(false)
            // console.log(stream)
            mediaRecorder = new MediaRecorder(stream)
            mediaRecorder.ondataavailable = (e: BlobEvent) => mediaChunk.push(e.data)
            mediaRecorder.onstart = async () => {
                id = await request_id()
                // console.log(id)
            }
            mediaRecorder.onstop = async () => {
                if (elapsed >= (5 * 1000)){
                    const interval = setInterval(() => {
                        if (changing_message >= (loading_messages.length - 1)){
                            changing_message = 0
                        }else{
                            changing_message += 1
                        }
                    }, 2000)
                    const blob = new Blob(mediaChunk, {type: 'audio/wav' })
                    mediaChunk = []
                    loading.set(true)
                    await upload_data(blob, id)
                    const song_result = await process_file(id)
                    console.log(song_result)
                    if(song_result["success"] == true){
                        song_results.set(song_result["output"])
                        error_result.set(false)
                    }else{
                        error_result.set(true)
                        error_reason.set("No results")
                    }
                    console.log($song_results)
                    loading.set(false)
                    clearInterval(interval)
                    there_is_result.set(true)
                } else {
                    loading.set(false)
                    error_result.set(true)
                    error_reason.set("too short")
                    there_is_result.set(true)
                }
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
                {#if $start_stop == true && $loading == false}
                    <div class="animate-pulse text-red-800 flex flex-row font-semibold items-center gap-3 z-10">
                        <img src="/microphone.svg" alt=""> 
                        <div>Recording Currently</div>
                    </div>

                {:else if $start_stop == false && $loading == false}
                    <div class="text-indigo-800 flex flex-row font-semibold items-center gap-3 z-10">
                        <img src="/mute.svg" alt=""> 
                        <div>Press Below to start</div>
                    </div>
                {:else if $loading == true}
                    <div class="text-indigo-800 flex flex-row font-semibold items-center gap-3 z-10">
                        <img src="/loading_blue.svg" alt="" class="animate-spin"> 
                        {#each loading_messages as message, index}
                            {#if changing_message == index}
                                <div in:slide={{duration:500}}>{message}</div>
                            {/if}
                        {/each}
                    </div>
                {/if}
            {/if}
        </div>
    <Record clicking={record_stop}/>
    <div class="h-20"></div>
</div>

