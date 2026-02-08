<script lang="ts">
	import ItemsList from "./ItemsList.svelte";
	import { itemsService } from "$lib/stores/items.svelte";
	import NewItemDialog from "./NewItemDialog.svelte";
</script>

<div>
	<NewItemDialog />
	<div class="mt-5">
		{#if !itemsService.isInitializing}
			<ItemsList />
		{/if}
	</div>
</div>
