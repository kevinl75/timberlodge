<script lang="ts">
	import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";

	import WelcomeHero from "$lib/components/WelcomeHero.svelte";
	import { authService } from "$lib/stores/auth.svelte";

	$effect(() => {
		if (!authService.isInitializing && authService.isAuthenticated) {
			goto(resolve("/dashboard"));
		} else {
			return;
		}
	});
</script>

{#if !authService.isAuthenticated && !authService.isInitializing}
	<WelcomeHero />
{/if}
