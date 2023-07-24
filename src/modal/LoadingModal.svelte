<script lang="ts">
	import Modal from "$component/Modal.svelte";
    import ModalOverlay from "$component/ModalOverlay.svelte";

	let initialFocus: HTMLElement | null = null;
</script>

<Modal {initialFocus}>
	<ModalOverlay />
	
	<div class="relative flex min-w-full min-h-screen place-content-center place-items-center">
		<p class="text-4xl font-bold text-white" bind:this={initialFocus}>
			Loading...
		</p>
	</div>
</Modal>