<script lang="ts">
	import { systemErrorStore, systemLoadingStore } from "$stores";
    import { getWalletBySource, isWalletInstalled } from "@subwallet/wallet-connect/dotsama/wallets";
    import { stringToHex } from "@polkadot/util";
	import type { BaseDotSamaWallet } from "@subwallet/wallet-connect/dotsama/BaseDotSamaWallet";
	import type { WalletAccount } from "@subwallet/wallet-connect/types";
	import ButtonPrimary from "$component/ButtonPrimary.svelte";
	
    enum SupportedWallet {
		SUBWALLET = "subwallet-js",
		TALISMAN = "talisman",
		POLKADOT = "polkadot-js",
	}

    let wallet: BaseDotSamaWallet | undefined = undefined;
    let accounts: WalletAccount[] = [];
    let address: string | undefined = undefined;
    let signature: string | undefined = undefined;
    let message: string;
    
    $: systemLoading = $systemLoadingStore;

    const getWallet = (source: string): Promise<[BaseDotSamaWallet, WalletAccount[]]> => {
        return new Promise((resolve, reject) => {
            if (!isWalletInstalled(source)) {
                reject(`${source} is not installed or activated.`);
                return;
            }

            const wallet = getWalletBySource(source) as BaseDotSamaWallet;

            if (!wallet) {
                reject(`${source} could not be found.`);
                return;
            }

            wallet
                .enable()
                .then(() => wallet.getAccounts())
                .then((accounts) => {
                    if (!accounts || accounts.length < 1) throw new Error(`${source} has no wallets.`);

                    resolve([wallet, accounts]);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    const connectWallet = async (name: SupportedWallet) => {
		if (systemLoading) return;

		systemLoadingStore.set(true);

		try {
			[wallet, accounts] = await getWallet(name);
		}
        catch(error) {
            wallet = undefined;
            accounts = [];
            
            systemErrorStore.set(error);
		}
        finally {
            address = undefined;
            signature = undefined;
            message = "Explora Online demo message.";

            systemLoadingStore.set(false);
        }
	}

    const shortAddress = (address: string) => {
        return `${address.slice(0, 9)}...${address.slice(-9)}`;
    }

    const signMessage = async () => {
		if (systemLoading || !wallet ) return;
		
		systemLoadingStore.set(true);
        signature = undefined;

		try {
			if (!wallet.signer) throw new Error("Signer not valid");
			if (!wallet.signer.signRaw) throw new Error("Sign raw not valid");

			const result = await wallet.signer.signRaw({
				address: address!,
				type: "bytes",
				data: stringToHex(message)
			});

            signature = result.signature;
		}
		catch (error) {
			systemErrorStore.set(error);
		}
        finally {
            systemLoadingStore.set(false);
        }
	}
</script>

<div class="flex flex-col gap-8">
    <p class="text-6xl text-center font-bold">
        Wallet Connect Demo
    </p>

    <div
        class="place-self-center flex flex-col gap-6 rounded-2xl border border-solid px-8 py-7 max-w-[702px] text-2xl border-expGray-200 bg-white"
    >
        <p class="text-center">
            This is a demo page to interact with
            <a class="text-expRed-800" href="https://polkadot.js.org/extension/" target="_blank">Polkadot.js</a>,
            <a class="text-expRed-800" href="https://www.subwallet.app/" target="_blank">SubWallet</a> and
            <a class="text-expRed-800" href="https://www.talisman.xyz/" target="_blank">Talisman</a> injected wallets.
            This demo is restricted to signing messages and returned signatures are not sent anywhere.
        </p>

        <hr />

        <p class="text-center">
            Select a wallet
        </p>

        <div class="flex place-content-center gap-6">
            <button on:click={() => connectWallet(SupportedWallet.SUBWALLET)}>
                <img src="/subwallet.png" alt="" />
            </button>

            <button on:click={() => connectWallet(SupportedWallet.TALISMAN)}>
                <img src="/talisman.png" alt="" />
            </button>

            <button on:click={() => connectWallet(SupportedWallet.POLKADOT)}>
                <img src="/polkadotjs.png" alt="" />
            </button>
        </div>

        {#if wallet}
            <hr />

            <p class="text-center">
                Select an address
            </p>

            {#each accounts as account}
                <button
                    class="px-4 py-3 transition-colors rounded-md bg-expGray-50 {address == account.address ? "bg-expRed-800 text-white" : ""}"
                    on:click={(e) => address = account.address}
                >
                    {shortAddress(account.address)} - {account.name}
                </button>
            {/each}
        {/if}

        {#if address}
            <hr />

            <p class="text-center">
                Sign a message
            </p>

            <input class="px-4 py-3 border border-solid border-expGray-75" type="text" bind:value={message}  />

            <ButtonPrimary on:click={(e) => signMessage()}>
                Sign
            </ButtonPrimary>
        {/if}

        {#if signature}
            <hr />

            <p class="text-center">
                Your signature
            </p>

            <p class="break-all text-expRed-800">
                {signature}
            </p>
        {/if}
    </div>
</div>