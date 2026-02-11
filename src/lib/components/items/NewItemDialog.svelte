<script lang="ts">
	import { format } from "@formkit/tempo";
	import { Square, Circle, Minus } from "lucide-svelte";
	import { DatePicker } from "@svelte-plugins/datepicker";

	import { itemsService } from "$lib/stores/items.svelte";
	import { ItemTypeEnum, type IItem } from "../../models/Item";
	import { type IDatePickerDate } from "$lib/stores/selectedDates.svelte";

	let { handleIsNewItemPanelOpen } = $props();
	let isOpen: boolean = $state(false);
	let newItemDate: Date = $state(new Date());
	let itemContent: string = $state("");
	let placeholder: string = $state("Your new tasks.");
	let newItemType: ItemTypeEnum = $state(ItemTypeEnum.TASK);

	function chooseItemType(type: ItemTypeEnum) {
		console.log(placeholder, type);
		if (type == ItemTypeEnum.TASK) {
			placeholder = "Your new tasks.";
			newItemType = type;
		} else if (type == ItemTypeEnum.EVENT) {
			placeholder = "Your new event.";
			newItemType = type;
		} else {
			placeholder = "Your new note.";
			newItemType = type;
		}
	}

	function createNewItem() {
		const newItem: IItem = {
			itemId: crypto.randomUUID(),
			itemContent: itemContent,
			itemType: newItemType,
			isDone: false,
			itemDate: newItemDate,
		};
		itemsService.addItem(newItem);
		itemContent = "";
	}

	function toggleDatePicker() {
		isOpen = !isOpen;
	}

	function setDateFromDatePicker(newDate: IDatePickerDate) {
		newItemDate = new Date(newDate.startDate);
	}
</script>

<div class="rounded-box bg-base-100">
	<p class="mb-4 text-lg font-bold">Add a new Item</p>
	<form>
		<div class="mb-2 flex">
			<fieldset class="fieldset flex-1">
				<legend class="fieldset-legend">Choose your item type</legend>
				<div
					class="max-h-fit max-w-fit rounded-md bg-primary p-2 pb-1 font-bold text-primary-content"
					id="newItemsIcons"
				>
					<button
						onclick={() => chooseItemType(ItemTypeEnum.TASK)}
						class="rounded-md {newItemType === ItemTypeEnum.TASK ? 'bg-primary-content' : ''}"
					>
						<Square
							size={28}
							class="p-1 {newItemType === ItemTypeEnum.TASK ? 'text-primary' : ''}"
						/>
					</button>
					<button
						onclick={() => chooseItemType(ItemTypeEnum.EVENT)}
						class="mx-2 rounded-md {newItemType === ItemTypeEnum.EVENT ? 'bg-primary-content' : ''}"
					>
						<Circle
							size={28}
							class="p-1 {newItemType === ItemTypeEnum.EVENT ? 'text-primary' : ''}"
						/>
					</button>
					<button
						onclick={() => chooseItemType(ItemTypeEnum.NOTE)}
						class="rounded-md {newItemType === ItemTypeEnum.NOTE ? 'bg-primary-content' : ''}"
					>
						<Minus
							size={28}
							class="p-1 {newItemType === ItemTypeEnum.NOTE ? 'text-primary' : ''}"
						/>
					</button>
				</div>
			</fieldset>
			<fieldset class="fieldset flex-1">
				<legend class="fieldset-legend">Item date (default today)</legend>
				<DatePicker bind:isOpen onDateChange={setDateFromDatePicker} enableFutureDates={true}>
					<input
						type="text"
						placeholder="Select date"
						value={format(newItemDate, "short")}
						onclick={toggleDatePicker}
					/>
				</DatePicker>
			</fieldset>
		</div>
		<fieldset class="mb-4 fieldset w-full">
			<legend class="fieldset-legend">Give your new item a label</legend>
			<input type="text" class="input w-full" bind:value={itemContent} {placeholder} />
		</fieldset>
	</form>
	<div class="flex justify-center">
		<button class="btn mr-10 btn-primary" onclick={() => createNewItem()}> Save </button>
		<button class="btn btn-neutral" onclick={() => handleIsNewItemPanelOpen()}> Close </button>
	</div>
</div>
