<script lang='ts'>
    import {alert_no_permission, loading, there_is_result, start_stop} from '$lib/stores.ts'
    import {send, receive} from '$lib/animation.ts'
    interface Props {
        clicking: void
    }
    let {clicking}: Props = $props()
</script>
{#if $alert_no_permission || $loading == true}
    {#if $there_is_result == false}
        <button class="shadow-2xl shadow-blue-100 bg-blue-500 rounded-full p-7 size-64 md:p-14 md:size-96 flex justify-center items-center transition ease-in-out delay-200 hover:translate-y-1" in:receive={{key: "loading"}} out:send={{key: "loading"}}><img src="/loading.svg" alt="" class="animate-spin size-full" ></button>
    {/if}
{:else if $start_stop == false}
    <button onclick={() => clicking()} class="shadow-2xl shadow-blue-100 bg-blue-500 rounded-full p-7 size-64 md:p-14 md:size-96 flex justify-center items-center transition ease-in-out delay-200 hover:translate-y-1" ><img src="/note.svg" alt="" class="size-full"></button>
{:else}
    <button onclick={() => clicking()} class="shadow-2xl shadow-rose-500 bg-red-500 rounded-full p-7 size-64 md:p-14 md:size-96 flex justify-center items-center transition ease-in-out delay-200 hover:translate-y-1" ><img src="/note.svg" alt="" class="size-full"></button>
{/if}

