<script lang="ts">
	import { format, addDay } from "@formkit/tempo";
	import { DatePicker } from "@svelte-plugins/datepicker";
	import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-svelte";

	const dateFormat = "medium";
	let isOpen: boolean = $state(false);
	let { getSelectedDate, setSelectedDate } = $props();

	function toggleDatePicker() {
		isOpen = !isOpen;
	}

	interface IDatePickerDate {
		startDate: string;
	}
	function setDateFromDatePicker(newDate: IDatePickerDate) {
		setSelectedDate(new Date(newDate.startDate));
	}
</script>

<div class="flex size-min grow-2">
	<button onclick={() => setSelectedDate(addDay(getSelectedDate(), -1))} class="mr-10">
		<ChevronLeft size={24} />
	</button>
	<div class="flex items-center">
		<div class="mr-4">
			<p class="text-base">{format(getSelectedDate(), dateFormat)}</p>
		</div>
		<DatePicker bind:isOpen onDateChange={setDateFromDatePicker}>
			<button onclick={toggleDatePicker}>
				<CalendarDays class="h-7 w-7 pt-1" />
			</button>
		</DatePicker>
	</div>
	<button onclick={() => setSelectedDate(addDay(getSelectedDate(), 1))} class="ml-10">
		<ChevronRight size={24} />
	</button>
</div>
