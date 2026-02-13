<script lang="ts">
	import Item from "./Item.svelte";
	import { itemsService } from "$lib/stores/items.svelte";
	import DatePickerTitle from "../DatePickerTitle.svelte";
	import { selectedDatesService } from "$lib/stores/selectedDates.svelte";
	import NewItemDialog from "./NewItemDialog.svelte";

	let isNewItemPanelOpen: boolean = false;

	function handleIsNewItemPanelOpen() {
		isNewItemPanelOpen = !isNewItemPanelOpen;
	}
</script>

<ul class="list rounded-box bg-base-100 p-4 shadow-md">
	<li class="flex items-center tracking-wide">
		<div class="grow-2">
			<button
				class="btn {!isNewItemPanelOpen ? '' : 'btn-neutral'}"
				onclick={handleIsNewItemPanelOpen}
			>
				{!isNewItemPanelOpen ? "New item" : "Close"}
			</button>
		</div>
		<DatePickerTitle />
	</li>
	{#if isNewItemPanelOpen}
		<li class="mt-4">
			<NewItemDialog {handleIsNewItemPanelOpen} />
		</li>
	{/if}
</ul>
<ul class="list mt-2 rounded-box bg-base-100 shadow-md">
	<li class="p-4 tracking-wide">
		<p class="grow-2 text-sm font-bold opacity-80">Your items</p>
	</li>
	{#if !selectedDatesService.areSelectedDatesTheSame()}
		{#each itemsService.returnItemAsMapPerDate().keys() as itemDate (itemDate)}
			<li class="p-4 pb-2 tracking-wide">
				<p class="grow-2 text-sm opacity-80">{itemDate}</p>
			</li>
			{#each itemsService.returnItemAsMapPerDate().get(itemDate) as item (item.itemId)}
				{#if selectedDatesService.isDateBetween(item.itemDate)}
					<Item {item} />
				{/if}
			{/each}
		{/each}
	{:else}
		{#each itemsService.items as item (item.itemId)}
			{#if selectedDatesService.isDateBetween(item.itemDate)}
				<Item {item} />
			{/if}
		{/each}
	{/if}
</ul>
