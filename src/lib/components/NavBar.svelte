<script lang="ts">
	import { signOut } from "firebase/auth";
	import { AppBar } from "@skeletonlabs/skeleton-svelte";
	import { CalendarIcon, CircleUserIcon, MenuIcon, SearchIcon } from "lucide-svelte";

	import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";
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

<AppBar class="preset-filled-secondary-200-800">
	<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
		<AppBar.Lead>
			<button type="button" class="btn-icon btn-icon-lg hover:preset-tonal">
				<MenuIcon />
			</button>
		</AppBar.Lead>
		<AppBar.Headline>
			<p class="text-2xl"><a href={resolve("/")}>Bujo App</a></p>
		</AppBar.Headline>
		<AppBar.Trail>
			<button type="button" class="btn-icon py-3 hover:preset-tonal">
				<SearchIcon class="size-10" />
			</button>
			<button type="button" class="btn-icon py-3 hover:preset-tonal">
				<CalendarIcon class="size-10" />
			</button>
			{#if authService.isAuthenticated}
				<button type="button" class="btn-icon py-3 hover:preset-tonal">
					<CircleUserIcon class="size-10" />
				</button>
				<button
					class="rounded preset-filled-secondary-800-200 px-4 py-2 hover:preset-filled-secondary-200-800"
					onclick={handleLogout}
				>
					Log Out
				</button>
			{:else}
				<button
					class="rounded preset-filled-secondary-800-200 px-4 py-2 hover:preset-filled-secondary-200-800"
					onclick={() => goto(resolve("/auth/login"))}
				>
					Log In
				</button>
			{/if}
		</AppBar.Trail>
	</AppBar.Toolbar>
</AppBar>
