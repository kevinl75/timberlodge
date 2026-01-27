<script lang="ts">
	import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";
	import { createUserWithEmailAndPassword } from "firebase/auth";

	import { authFirebaseApp } from "$lib/stores/auth.svelte";

	let errorMessage = $state("");

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
				goto(resolve("/"));
			})
			.catch((error) => {
				console.log(error);
			});
	}
</script>

<div>
	<h2 class="mb-4 h2">Sign Up</h2>
	<div class="rounded-md preset-filled-surface-400-600 p-5">
		<div class="grid grid-cols-2 divide-x-2 divide-solid">
			<form class="pr-10" onsubmit={handleSignUp}>
				<div class="mb-6">
					<label class="mb-1 block pr-4" for="inlineEmail"> Email </label>
					<input
						class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-gray-900 focus:outline-none"
						id="inlineEmail"
						type="email"
						placeholder="jane.doe@email.com"
					/>
				</div>
				<div class="mb-6">
					<label class="mb-1 block pr-4" for="inlinePassword"> Password </label>
					<input
						class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-gray-900 focus:outline-none"
						id="inlinePassword"
						type="password"
						placeholder="******************"
					/>
				</div>
				<div class="mb-6">
					<label class="mb-1 block pr-4" for="inlineConfirmPassword"> Confirm your password </label>
					<input
						class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-gray-900 focus:outline-none"
						id="inlineConfirmPassword"
						type="password"
						placeholder="******************"
					/>
				</div>
				{#if errorMessage}
					<p class="mb-6 text-red-400">{errorMessage}</p>
				{/if}
				<button
					class="rounded preset-filled-secondary-200-800 px-4 py-2 hover:preset-filled-secondary-800-200"
					type="submit"
				>
					Sign Up
				</button>
			</form>
			<div class="m-auto">
				<p>Already have an account?</p>
				<button
					class="mt-4 rounded preset-filled-secondary-200-800 px-4 py-2 hover:preset-filled-secondary-800-200"
					type="submit"
					onclick={() => goto(resolve("/auth/login"))}
				>
					Sign In
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	input[type="email"]:focus {
		border: 3px solid var(--color-secondary-500);
	}
	input[type="password"]:focus {
		border: 3px solid var(--color-secondary-500);
	}
</style>
