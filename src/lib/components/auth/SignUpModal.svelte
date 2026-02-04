<script lang="ts">
	import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";
	import { createUserWithEmailAndPassword } from "firebase/auth";

	import { authFirebaseApp } from "$lib/stores/auth.svelte";

	let errorMessage = $state("");
	let { isSignUpModalOpen, closeModal, handleKeyDown } = $props();

	function handleSignUp(e: Event) {
		e.preventDefault();

		const formValue = e.target as HTMLFormElement;

		const email = formValue.inlineEmail.value;
		const password = formValue.inlinePassword.value;
		const confirmPassword = formValue.inlineConfirmPassword.value;

		if (password != confirmPassword) {
			errorMessage = "Your password must be the same.";
			return;
		}

		createUserWithEmailAndPassword(authFirebaseApp, email, password)
			.then(() => {
				goto(resolve("/dashboard"));
			})
			.catch((error) => {
				console.log(error);
			});

		closeModal("signUp");
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<dialog class="modal" class:modal-open={isSignUpModalOpen}>
	<div class="modal-box text-left">
		<h3 class="mb-4 text-lg font-bold">One more step to create your Lodge</h3>
		<form onsubmit={handleSignUp} id="signup-form">
			<div>
				<fieldset class="mb-2 fieldset">
					<legend class="fieldset-legend">Email</legend>
					<input id="inlineEmail" type="email" class="input" placeholder="jane.doe@email.com" />
				</fieldset>
			</div>
			<div>
				<fieldset class="mb-2 fieldset">
					<legend class="fieldset-legend">Password</legend>
					<input id="inlinePassword" type="password" class="input" placeholder="********" />
				</fieldset>
			</div>
			<div>
				<fieldset class="mb-10 fieldset">
					<legend class="fieldset-legend">Confirm your password</legend>
					<input id="inlineConfirmPassword" type="password" class="input" placeholder="********" />
				</fieldset>
			</div>
			{#if errorMessage}
				<p class="mb-6 text-red-400">{errorMessage}</p>
			{/if}
		</form>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn mr-4 btn-primary" type="submit" form="signup-form"> Sign Up </button>
				<button class="btn btn-neutral" onclick={() => closeModal("signUp")}> Close </button>
			</form>
		</div>
	</div>
</dialog>
