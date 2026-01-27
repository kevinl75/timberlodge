<script lang="ts">
	import { Circle, Minus, Square, CircleCheckBig, SquareCheckBig, X, PenIcon } from "lucide-svelte";

	import { itemsService } from "$lib/stores/items.svelte";
	import { ItemTypeEnum, type IItem } from "../../models/Item";

	let { item = $bindable() } = $props<{ item: IItem }>();
	let isEdited: boolean = $state(false);

	function setToDone(itemToUpdate: IItem) {
		itemToUpdate.isDone = !itemToUpdate.isDone;
		itemsService.updateItem(itemToUpdate);
	}

	function removeItem() {
		itemsService.removeItem(item);
	}
</script>

<div class="group/sub my-2 flex items-center card preset-filled-secondary-200-800 py-2">
	<button onclick={() => setToDone(item)} class="ml-5 flex-none">
		{#if item.itemType == ItemTypeEnum.EVENT}
			{#if item.isDone}
				<CircleCheckBig />
			{:else}
				<Circle />
			{/if}
		{:else if item.itemType == ItemTypeEnum.NOTE}
			<Minus />
		{:else if item.isDone}
			<SquareCheckBig />
		{:else}
			<Square />
		{/if}
	</button>
	{#if isEdited}
		<input
			class="w-full appearance-none rounded bg-gray-200 px-4 py-2 text-gray-900 focus:outline-none"
			type="text"
		/>
	{:else}
		<p class="mx-5 text-lg {item.isDone ? 'line-through' : ''} flex-1">{item.itemContent}</p>
	{/if}
	<button
		onclick={() => (isEdited = !isEdited)}
		class="mr-5 flex-none opacity-0 group-hover/sub:opacity-100"
	>
		<PenIcon />
	</button>
	<button onclick={() => removeItem()} class="mr-5 flex-none opacity-0 group-hover/sub:opacity-100">
		<X />
	</button>
</div>
