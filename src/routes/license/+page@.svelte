<script lang="ts">
    const license = [
        {author: "Kevin MacLeod",original_location: "https://freemusicarchive.org/music/Kevin_MacLeod/Classical_Sampler", license: "Creative Commons Attribution: http://creativecommons.org/licenses/by/3.0/"}
    ]
</script>
<div class="h-full p-6">
    <a href="/" class="text-5xl underline font-extrabold text-blue-800">Home</a>
    <div>
        <div class="text-3xl underline font-extrabold">Music used:</div>
        <div class="grid grid-cols-3 auto-cols-min">
            <div class="underline">Author</div>
            <div class="underline">Original location</div>
            <div class="underline">License</div>
            {#each license as lic}
                <div>{lic["author"]}</div>
                <a href={lic["original_location"]} class="underline text-blue-800">{lic["original_location"]}</a>
                <div>{lic["license"]}</div>
            {/each}
        </div>
    </div>
</div>
