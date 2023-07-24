<script lang="ts">
	import "../app.css";
	import LoadingModal from "$modal/LoadingModal.svelte";
    import ErrorModal from "$modal/ErrorModal.svelte";
	import { systemErrorStore, systemLoadingStore } from "$stores";
	
	$: systemLoading = $systemLoadingStore;
	$: systemError = $systemErrorStore;
</script>

{#if systemError}
	<ErrorModal />
{/if}
{#if systemLoading}
	<LoadingModal />
{/if}

<div class="relative flex flex-col gap-0 min-h-screen min-w-full bg-expGray-50">
	<div
		class="relative flex place-items-center place-content-center min-h-[103px] bg-white"
	>
		<div class="absolute top-0 left-0 bg-expBlue-800">
			<img class="mx-14" src="/logo.png" alt="" />
		</div>

		<p class="text-3xl text-expGray-200">Explora Online</p>
	</div>

	<div class="grow py-12 flex flex-col container mx-auto">
        <slot />
    </div>
</div>