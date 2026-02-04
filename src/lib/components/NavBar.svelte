<script lang="ts">
	import { signOut } from "firebase/auth";
	import { CircleUserIcon } from "lucide-svelte";

	import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";
	import logo from "$lib/assets/logo/logo-128.png";
	import { authService, authFirebaseApp } from "$lib/stores/auth.svelte";

	async function handleLogout() {
		try {
			await signOut(authFirebaseApp);
			goto(resolve("/"));
		} catch (error) {
			console.log("Error while deconnecting.", error);
		}
	}
</script>

<div class="navbar bg-base-100 shadow-sm">
	<div class="navbar-start">
		<img alt="website logo" src={logo} class="mx-5 h-15 w-15" />
		<p class="text-3xl"><a href={resolve("/")}>TimberLodge</a></p>
	</div>
	<div class="mr-5 navbar-end">
		{#if authService.isAuthenticated}
			<button type="button" class="btn-icon hover:preset-tonal mr-5">
				<CircleUserIcon size={24} />
			</button>
			<button class="btn" onclick={handleLogout}> Log Out </button>
		{/if}
	</div>
</div>
