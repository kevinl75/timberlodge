<script lang="ts">
	import { DatePicker } from "@svelte-plugins/datepicker";
	import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-svelte";
	import { type IDatePickerDate, selectedDatesService } from "$lib/stores/selectedDates.svelte";

	let isOpen: boolean = $state(false);

	function toggleDatePicker() {
		isOpen = !isOpen;
	}

	function setDateFromDatePicker(newDate: IDatePickerDate) {
		selectedDatesService.startDate = new Date(newDate.startDate);
		if (newDate.endDate) {
			selectedDatesService.endDate = new Date(newDate.endDate);
		}
	}
</script>

<div class="flex size-min grow-2">
	<button
		onclick={() => selectedDatesService.shiftSelectedDates(-1)}
		class="mr-6 rounded-md bg-primary"
	>
		<ChevronLeft size={30} class="p-1 text-primary-content" />
	</button>
	<!-- <button onclick={() => selectedDatesService.shiftSelectedDates(-1)} class="mr-6">
		<ChevronLeft size={24} />
	</button> -->
	<div class="flex items-center">
		<div class="mr-4">
			{#if selectedDatesService.endDate && selectedDatesService.startDate && !selectedDatesService.areSelectedDatesTheSame()}
				<p class="text-base font-bold">
					{selectedDatesService.formatStartDate()} to {selectedDatesService.formatEndDate()}
				</p>
			{:else}
				<p class="text-base font-bold">{selectedDatesService.formatStartDate()}</p>
			{/if}
		</div>
		<DatePicker
			bind:isOpen
			onDateChange={setDateFromDatePicker}
			isRange={true}
			enableFutureDates={true}
		>
			<button onclick={toggleDatePicker}>
				<CalendarDays class="h-7 w-7 pt-1" />
			</button>
		</DatePicker>
	</div>
	<button
		onclick={() => selectedDatesService.shiftSelectedDates(1)}
		class="ml-6 rounded-md bg-primary"
	>
		<ChevronRight size={30} class="p-1 text-primary-content" />
	</button>
</div>
