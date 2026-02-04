<script lang="ts">
	import ItemsList from "./ItemsList.svelte";
	import { itemsService } from "$lib/stores/items.svelte";
	import NewItemDialog from "./NewItemDialog.svelte";

	let { selectedDate } = $props();
</script>

<div>
	<NewItemDialog />
	<div class="mt-5">
		{#if !itemsService.isInitializing && itemsService.items.length > 0}
			<ItemsList {selectedDate} />
		{/if}
	</div>
</div>
