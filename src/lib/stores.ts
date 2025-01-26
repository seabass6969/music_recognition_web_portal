import {writable} from 'svelte/store'

export const alert_no_permission = writable(true)
export const first_trying_permission = writable(true)

export const start_stop = writable(false)
export const loading = writable(false)
export const there_is_result = writable(false)
export const error_result = writable(false)
interface ImusicResult {
Name: string, Author: string, Stored_Location: string, License: string, Original_location: string, Genre: string
}
export const song_results = writable<ImusicResult>()
