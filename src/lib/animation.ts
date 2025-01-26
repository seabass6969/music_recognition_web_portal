import { quintOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition'
export const [send, receive] = crossfade({
    duration: 1000,
    easing: quintOut
});
