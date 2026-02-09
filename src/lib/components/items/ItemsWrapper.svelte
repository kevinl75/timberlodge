<script lang="ts">
	import ItemsList from "./ItemsList.svelte";
	import { itemsService } from "$lib/stores/items.svelte";
	import NewItemDialog from "./NewItemDialog.svelte";
</script>

<div class="flex">
	<NewItemDialog />
	<div class="flex-2/3 pl-2">
		{#if !itemsService.isInitializing}
			<ItemsList />
		{/if}
	</div>
</div>
