<script lang="ts">
	import { Dialog } from "@rgossiaux/svelte-headlessui";

	export let open = true;
	export let initialFocus: HTMLElement | null = null;
</script>

<Dialog
	{open}
	{initialFocus}
	class="fixed top-0 left-0 min-w-full min-h-full"
>
	<slot />
</Dialog>
