<script lang="ts">
	import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";
	import { signInWithEmailAndPassword } from "firebase/auth";

	import { authFirebaseApp } from "$lib/stores/auth.svelte";

	let errorMessage = $state("");
	let { isSignInModalOpen, closeModal, handleKeyDown } = $props();

	function handleLogin(e: Event) {
		e.preventDefault();

		const formValue = e.target as HTMLFormElement;
		const email = formValue.inlineEmail.value;
		const password = formValue.inlinePassword.value;

		signInWithEmailAndPassword(authFirebaseApp, email, password)
			.then(() => {
				goto(resolve("/dashboard"));
			})
			.catch((error) => {
				console.log(error.code);
				console.log(error.message);
			});
		closeModal("signIn");
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<dialog class="modal" class:modal-open={isSignInModalOpen}>
	<div class="modal-box text-left">
		<h3 class="mb-4 text-lg font-bold">Sign in to your account:</h3>
		<form onsubmit={handleLogin} id="signin-form">
			<div>
				<fieldset class="mb-2 fieldset">
					<legend class="fieldset-legend">Email</legend>
					<input id="inlineEmail" type="email" class="input" placeholder="jane.doe@email.com" />
				</fieldset>
			</div>
			<div>
				<fieldset class="mb-10 fieldset">
					<legend class="fieldset-legend">Password</legend>
					<input id="inlinePassword" type="password" class="input" placeholder="********" />
				</fieldset>
			</div>
			{#if errorMessage}
				<p class="mb-4 text-red-400">{errorMessage}</p>
			{/if}
		</form>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn mr-4 btn-primary" type="submit" form="signin-form"> Sign In </button>
				<button class="btn btn-neutral" onclick={() => closeModal("signIn")}> Close </button>
			</form>
		</div>
	</div>
</dialog>
