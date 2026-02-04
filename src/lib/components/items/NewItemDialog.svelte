<script lang="ts">
	import { Square, Circle, Minus } from "lucide-svelte";

	import { itemsService } from "$lib/stores/items.svelte";
	import { ItemTypeEnum, type IItem } from "../../models/Item";
	import { selectedDatesService } from "$lib/stores/selectedDates.svelte";

	let isModalOpen: boolean = $state(false);
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
			itemDate: selectedDatesService.startDate,
		};
		itemsService.addItem(newItem);
		itemContent = "";
		isModalOpen = !isModalOpen;
	}
</script>

<button class="btn" onclick={() => (isModalOpen = true)}> New Item </button>

<dialog class="modal" class:modal-open={isModalOpen}>
	<div class="modal-box text-left">
		<h3 class="mb-4 text-lg font-bold">Want to add a new item?</h3>
		<form>
			<fieldset class="mb-2 fieldset">
				<legend class="fieldset-legend">Choose your item type</legend>
				<div
					class="mb-4 max-h-fit max-w-fit rounded-md bg-primary p-2 pb-1 text-primary-content"
					id="newItemsIcons"
				>
					<button
						onclick={() => chooseItemType(ItemTypeEnum.TASK)}
						class="rounded-md {newItemType === ItemTypeEnum.TASK ? 'bg-primary-content' : ''}"
					>
						<Square class="size-10 p-2 {newItemType === ItemTypeEnum.TASK ? 'text-primary' : ''}" />
					</button>
					<button
						onclick={() => chooseItemType(ItemTypeEnum.EVENT)}
						class="rounded-md {newItemType === ItemTypeEnum.EVENT ? 'bg-primary-content' : ''}"
					>
						<Circle
							class="size-10 p-2 {newItemType === ItemTypeEnum.EVENT ? 'text-primary' : ''}"
						/>
					</button>
					<button
						onclick={() => chooseItemType(ItemTypeEnum.NOTE)}
						class="rounded-md {newItemType === ItemTypeEnum.NOTE ? 'bg-primary-content' : ''}"
					>
						<Minus class="size-10 p-2 {newItemType === ItemTypeEnum.NOTE ? 'text-primary' : ''}" />
					</button>
				</div>
			</fieldset>
			<fieldset class="mb-2 fieldset">
				<legend class="fieldset-legend">Give your new item a label</legend>
				<input type="text" class="input" bind:value={itemContent} {placeholder} />
			</fieldset>
		</form>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn mr-4 btn-primary" onclick={() => createNewItem()}> Save </button>
				<button class="btn btn-neutral" onclick={() => (isModalOpen = false)}> Close </button>
			</form>
		</div>
	</div>
</dialog>
