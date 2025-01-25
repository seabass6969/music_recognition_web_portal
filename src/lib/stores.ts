import {writable} from 'svelte/store'

export const alert_no_permission = writable(true)
export const first_trying_permission = writable(true)

export const start_stop = writable(false)
export const loading = writable(false)
export const there_is_result = writable(false)
