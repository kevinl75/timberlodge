<script lang="ts">
	import DatePickerTitle from "$lib/components/DatePickerTitle.svelte";
	import ItemsWrapper from "$lib/components/items/ItemsWrapper.svelte";

	let selectedDate: Date = $state(new Date());

	function setSelectedDate(newDate: Date) {
		selectedDate = newDate;
	}

	function getSelectedDate() {
		return selectedDate;
	}
</script>

<div class="flex pb-4">
	<h2 class="mb-4 grow h2">Daily Log</h2>
	<DatePickerTitle {getSelectedDate} {setSelectedDate} />
</div>
<ItemsWrapper {selectedDate} />
