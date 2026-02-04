<script lang="ts">
	import { Circle, Minus, Square, CircleCheckBig, SquareCheckBig, X } from "lucide-svelte";

	import { itemsService } from "$lib/stores/items.svelte";
	import { ItemTypeEnum, type IItem } from "../../models/Item";

	let { item = $bindable() } = $props<{ item: IItem }>();

	function setToDone(itemToUpdate: IItem) {
		itemToUpdate.isDone = !itemToUpdate.isDone;
		itemsService.updateItem(itemToUpdate);
	}

	function removeItem() {
		itemsService.removeItem(item);
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
	<button onclick={() => removeItem()} class="rounded p-1 hover:bg-base-300">
		<X size={18} />
	</button>
</li>
