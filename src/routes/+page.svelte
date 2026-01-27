<script lang="ts">
	import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";

	import Welcome from "$lib/components/Welcome.svelte";
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
	<Welcome />
{/if}
