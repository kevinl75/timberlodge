<script lang="ts">
	import Item from "./Item.svelte";
	import { itemsService } from "$lib/stores/items.svelte";
	import DatePickerTitle from "../DatePickerTitle.svelte";
	import { selectedDatesService } from "$lib/stores/selectedDates.svelte";
</script>

<ul class="list rounded-box bg-base-100 shadow-md">
	<li class="flex items-center p-4 pb-2 tracking-wide">
		<p class="grow-2 text-sm opacity-70">Your items</p>
		<DatePickerTitle />
	</li>
	{#each itemsService.items as item (item.itemId)}
		{#if selectedDatesService.isDateBetween(item.itemDate)}
			<Item {item} />
		{/if}
	{/each}
</ul>
