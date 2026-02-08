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
	{#if !selectedDatesService.areSelectedDatesTheSame()}
		{#each itemsService.returnItemAsMapPerDate().keys() as itemDate (itemDate)}
			<li class="flex items-center p-4 pb-2 tracking-wide">
				<p class="grow-2 text-base font-bold opacity-80">{itemDate}</p>
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
