<script lang="ts">
	import NewItem from "./NewItem.svelte";
	import ItemsList from "./ItemsList.svelte";
	import { itemsService } from "$lib/stores/items.svelte";

	let { selectedDate } = $props();
</script>

<div class="rounded-md preset-filled-surface-400-600 p-5">
	<NewItem />
	<div class="mt-5">
		{#if !itemsService.isInitializing && itemsService.items.length > 0}
			<ItemsList {selectedDate} />
		{/if}
	</div>
</div>
