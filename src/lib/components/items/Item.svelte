<script lang="ts">
	import {
		Circle,
		Minus,
		Square,
		CircleCheckBig,
		SquareCheckBig,
		X,
		CalendarDays,
	} from "lucide-svelte";
	import { DatePicker } from "@svelte-plugins/datepicker";
	import { itemsService } from "$lib/stores/items.svelte";
	import { ItemTypeEnum, type IItem } from "../../models/Item";
	import { type IDatePickerDate } from "$lib/stores/selectedDates.svelte";

	let { item = $bindable() } = $props<{ item: IItem }>();
	let isOpen: boolean = $state(false);

	function toggleDatePicker() {
		isOpen = !isOpen;
	}

	function setToDone(itemToUpdate: IItem) {
		itemToUpdate.isDone = !itemToUpdate.isDone;
		itemsService.updateItem(itemToUpdate);
	}

	function removeItem() {
		itemsService.removeItem(item);
	}

	function rescheduleItem(newDate: IDatePickerDate) {
		const itemToUpdate: IItem = item;
		itemToUpdate.itemDate = new Date(newDate.startDate);
		itemsService.updateItem(itemToUpdate);
		// newItemDate = new Date(newDate.startDate);
	}
</script>

<li class="list-row">
	<button onclick={() => setToDone(item)} class="ml-4 flex-none rounded p-1 hover:bg-base-300">
		{#if item.itemType == ItemTypeEnum.EVENT}
			{#if item.isDone}
				<CircleCheckBig size={18} />
			{:else}
				<Circle size={18} />
			{/if}
		{:else if item.itemType == ItemTypeEnum.NOTE}
			<Minus size={18} />
		{:else if item.isDone}
			<SquareCheckBig size={18} />
		{:else}
			<Square size={18} />
		{/if}
	</button>
	<p class="mx-5 text-base {item.isDone ? 'line-through' : ''} flex-1">{item.itemContent}</p>
	<DatePicker
		bind:isOpen
		onDateChange={rescheduleItem}
		enableFutureDates={true}
	>
		<div class="tooltip" data-tip="Reschedule">
			<button onclick={toggleDatePicker} class="mr-2 p-1">
				<CalendarDays size={18} />
			</button>
		</div>
	</DatePicker>
	<div class="tooltip" data-tip="Delete">
		<button onclick={() => removeItem()} class="rounded p-1">
			<X size={18} />
		</button>
	</div>
</li>
