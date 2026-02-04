<script lang="ts">
	import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";
	import { signInWithEmailAndPassword } from "firebase/auth";

	import { authFirebaseApp } from "$lib/stores/auth.svelte";

	let errorMessage = $state("");

	function handleLogin(e: Event) {
		e.preventDefault();

		const formValue = e.target as HTMLFormElement;
		const email = formValue.inlineEmail.value;
		const password = formValue.inlinePassword.value;

		signInWithEmailAndPassword(authFirebaseApp, email, password)
			.then(() => {
				goto(resolve("/"));
			})
			.catch((error) => {
				console.log(error.code);
				console.log(error.message);
			});
	}
</script>

<div>
	<h2 class="h2 mb-4">Login</h2>
	<div class="preset-filled-surface-400-600 rounded-md p-5">
		<div class="grid grid-cols-2 divide-x-2 divide-solid">
			<form class="pr-10" onsubmit={handleLogin}>
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
				{#if errorMessage}
					<p class="mb-6 text-red-400">{errorMessage}</p>
				{/if}
				<button
					class="preset-filled-secondary-200-800 hover:preset-filled-secondary-800-200 rounded px-4 py-2"
					type="submit"
				>
					Sign In
				</button>
			</form>
			<div class="m-auto">
				<p>Create a new account?</p>
				<button
					class="preset-filled-secondary-200-800 hover:preset-filled-secondary-800-200 mt-4 rounded px-4 py-2"
					type="submit"
					onclick={() => goto(resolve("/auth/signup"))}
				>
					Sign Up
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
