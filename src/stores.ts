import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const systemLoadingStore: Writable<boolean> = writable(false);
export const systemErrorStore: Writable<any> = writable(undefined);
