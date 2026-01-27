<script lang="ts">
	import { Square, Circle, Minus } from "lucide-svelte";

	import { itemsService } from "$lib/stores/items.svelte";
	import { ItemTypeEnum, type IItem } from "../../models/Item";

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

	function createNewItem(event: KeyboardEvent) {
		if (event.key == "Enter") {
			const newItem: IItem = {
				itemId: crypto.randomUUID(),
				itemContent: itemContent,
				itemType: newItemType,
				isDone: false,
				itemDate: new Date(),
			};
			itemsService.addItem(newItem);
			itemContent = "";
		}
	}
</script>

<!-- grid-cols-[auto_1fr_auto] -->

<div class="flex">
	<div class="mr-2 flex rounded-md preset-filled-secondary-200-800 p-2" id="newItemsIcons">
		<button
			onclick={() => chooseItemType(ItemTypeEnum.TASK)}
			class="rounded-md {newItemType == ItemTypeEnum.TASK ? 'preset-filled-secondary-800-200' : ''}"
		>
			<Square class="h-10 w-10 p-2 " />
		</button>
		<button
			onclick={() => chooseItemType(ItemTypeEnum.EVENT)}
			class="rounded-md {newItemType == ItemTypeEnum.EVENT
				? 'preset-filled-secondary-800-200'
				: ''}"
		>
			<Circle class="h-10 w-10 p-2" />
		</button>
		<button
			onclick={() => chooseItemType(ItemTypeEnum.NOTE)}
			class="rounded-md {newItemType == ItemTypeEnum.NOTE ? 'preset-filled-secondary-800-200' : ''}"
		>
			<Minus class="h-10 w-10 rounded-md p-2" />
		</button>
	</div>
	<input
		class="w-full appearance-none rounded bg-gray-200 px-4 py-2 text-gray-900 focus:outline-none"
		type="text"
		bind:value={itemContent}
		{placeholder}
		onkeydowncapture={createNewItem}
	/>
</div>

<style>
	input[type="text"]:focus {
		border: 2px solid var(--color-secondary-500);
	}
</style>
