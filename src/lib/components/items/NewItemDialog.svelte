<script lang="ts">
	import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte";

	import { Square, Circle, Minus, XIcon } from "lucide-svelte";

	import { itemsService } from "$lib/stores/items.svelte";
	import { ItemTypeEnum, type IItem } from "../../models/Item";

    let isDialogOpen: boolean = $state(false);
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
			itemDate: new Date(),
		};
		itemsService.addItem(newItem);
		itemContent = "";
        isDialogOpen = !isDialogOpen;
	}
	const animation =
		"transition transition-discrete opacity-0 translate-y-[100px] starting:data-[state=open]:opacity-0 starting:data-[state=open]:translate-y-[100px] data-[state=open]:opacity-100 data-[state=open]:translate-y-0";
</script>

<button
	class="rounded preset-filled-secondary-200-800 px-4 py-2 hover:preset-filled-secondary-800-200"
	type="submit"
    onclick={() => isDialogOpen = !isDialogOpen}
>
	New Item
</button>
<Dialog open={isDialogOpen}>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<Dialog.Content
				class="w-full max-w-xl space-y-4 card bg-surface-100-900 p-4 shadow-xl {animation}"
			>
				<header class="flex items-center justify-between">
					<Dialog.Title class="text-lg font-bold">Create a new item</Dialog.Title>
					<Dialog.CloseTrigger class="btn-icon hover:preset-tonal">
						<XIcon class="size-4" />
					</Dialog.CloseTrigger>
				</header>
				<Dialog.Description>
					<div>
                        <span class="label-text mb-1">Choose your item type:</span>
						<div
							class="max-w-fit max-h-fit rounded-md preset-filled-secondary-200-800 mb-4 p-2 pb-1"
							id="newItemsIcons"
						>
                            
							<button
								onclick={() => chooseItemType(ItemTypeEnum.TASK)}
								class="rounded-md {newItemType == ItemTypeEnum.TASK
									? 'preset-filled-secondary-800-200'
									: ''}"
							>
								<Square class="size-10 p-2" />
							</button>
							<button
								onclick={() => chooseItemType(ItemTypeEnum.EVENT)}
								class="rounded-md {newItemType == ItemTypeEnum.EVENT
									? 'preset-filled-secondary-800-200'
									: ''}"
							>
								<Circle class="size-10 p-2" />
							</button>
							<button
								onclick={() => chooseItemType(ItemTypeEnum.NOTE)}
								class="rounded-md {newItemType == ItemTypeEnum.NOTE
									? 'preset-filled-secondary-800-200'
									: ''}"
							>
								<Minus class="size-10 p-2" />
							</button>
						</div>
                        <span class="label-text mb-1">Description:</span>
						<input
							class="w-full appearance-none rounded bg-gray-200 px-4 py-2 text-gray-900 focus:outline-none mb-4"
							type="text"
							bind:value={itemContent}
							{placeholder}
						/>
					</div>
				</Dialog.Description>
				<footer class="flex justify-end gap-2">
					<button 
                        type="button"
                        class="btn preset-filled"
                        onclick={() => isDialogOpen = !isDialogOpen}
                    >Cancel</button>
                    <button 
                        type="button"
                        class="btn preset-filled"
                        onclick={() => createNewItem()}
                    >Save</button>
				</footer>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
