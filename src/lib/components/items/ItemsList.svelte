<script lang="ts">
	import Item from "./Item.svelte";
	import { format } from "@formkit/tempo";
	import { itemsService } from "$lib/stores/items.svelte";

	let { selectedDate } = $props();
</script>

<main>
	<div>
		{#each itemsService.items as item (item.itemId)}
			{#if item?.itemDate && selectedDate}
				{#if format(item.itemDate, "short") == format(selectedDate, "short")}
					<Item {item} />
				{/if}
			{:else}
				<p>Chargement des dates...</p>
			{/if}
		{/each}
	</div>
</main>

<style>
</style>
