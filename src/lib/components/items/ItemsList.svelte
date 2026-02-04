<script lang="ts">
	import Item from "./Item.svelte";
	import { format } from "@formkit/tempo";
	import { itemsService } from "$lib/stores/items.svelte";
	import DatePickerTitle from "../DatePickerTitle.svelte";

	let { selectedDate } = $props();

	function setSelectedDate(newDate: Date) {
		selectedDate = newDate;
	}

	function getSelectedDate() {
		return selectedDate;
	}
</script>

<ul class="list rounded-box bg-base-100 shadow-md">
	<li class="flex items-center p-4 pb-2 tracking-wide">
		<p class="grow-2 text-sm opacity-70">Your items</p>
		<DatePickerTitle {getSelectedDate} {setSelectedDate} />
	</li>
	{#each itemsService.items as item (item.itemId)}
		{#if item?.itemDate && selectedDate}
			{#if format(item.itemDate, "short") == format(selectedDate, "short")}
				<Item {item} />
			{/if}
		{:else}
			<p>Chargement des dates...</p>
		{/if}
	{/each}
</ul>
