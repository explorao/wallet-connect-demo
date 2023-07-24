<script lang="ts">
	import ButtonPrimary from "$component/ButtonPrimary.svelte";
	import Modal from "$component/Modal.svelte";
    import ModalOverlay from "$component/ModalOverlay.svelte";
    import { systemErrorStore } from "$stores";

	let initialFocus: HTMLElement | null = null;

	$: error = $systemErrorStore;
	$: errorText = getErrorText(error);

	const getErrorText = (err: any): string | String => {
		if (typeof(err) === "string" || err instanceof String) return err;

		if (err != null && typeof(err) === "object") {
			if ("response" in err) return err.response.body.message;
			if ("errorMessage" in err) return err.errorMessage;
		}

		if (err instanceof Error) return err.message;

		return 'There was an error processing your request.';
	}
	
	const close = () => {
		systemErrorStore.set(undefined);
	}
</script>

<Modal {initialFocus}>
	<ModalOverlay />
	
	<div class="relative flex min-w-full min-h-screen place-content-center place-items-center">
		<div class="flex flex-col min-w-[819px] max-w-[819px] px-24 pt-16 pb-8 border border-solid border-expGray-100 bg-white">
			<p class="text-6xl text-center uppercase text-expRed-800">
				Error
			</p>

			<p class="mt-4 text-3xl text-center">
				{errorText}
			</p>

			<ButtonPrimary class="mt-12 mx-auto" on:click={(e) => close()}>
				Ok
			</ButtonPrimary>
		</div>
	</div>
</Modal>