<script lang="ts">
	import ItemsList from "./ItemsList.svelte";
	import { itemsService } from "$lib/stores/items.svelte";
</script>

<div>
	<div>
		{#if !itemsService.isInitializing}
			<ItemsList />
		{/if}
	</div>
</div>
