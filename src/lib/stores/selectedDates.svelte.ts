import { format, addDay, isAfter, isBefore, sameDay } from "@formkit/tempo";

const dateFormat = "short";
export interface IDatePickerDate {
	startDate: string;
	endDate: string;
}

interface ISelectedDates {
	startDate: Date;
	endDate: Date | null;
}

const selectedDatesState = $state<ISelectedDates>({
	startDate: new Date(),
	endDate: null,
});

export const selectedDatesService = {
	get startDate(): Date {
		return selectedDatesState.startDate;
	},
	get endDate(): Date | null {
		return selectedDatesState.endDate;
	},
	set startDate(newStartDate: Date) {
		selectedDatesState.startDate = newStartDate;
	},
	set endDate(newEndDate: Date) {
		selectedDatesState.endDate = newEndDate;
	},
	shiftSelectedDates(nbDays: number) {
		selectedDatesState.startDate = addDay(selectedDatesState.startDate, nbDays);
		if (selectedDatesState.endDate) {
			selectedDatesState.endDate = addDay(selectedDatesState.endDate, nbDays);
		}
	},
	areSelectedDatesTheSame(): boolean {
		if (this.formatStartDate() === this.formatEndDate()) {
			return true;
		}
		return false;
	},
	isDateBetween(date: Date) {
		if (selectedDatesService.endDate) {
			if (
				(sameDay(date, selectedDatesService.startDate) ||
					isAfter(date, selectedDatesService.startDate)) &&
				(sameDay(date, selectedDatesService.endDate) ||
					isBefore(date, selectedDatesService.endDate))
			) {
				return true;
			}
			return false;
		}
		return sameDay(date, selectedDatesService.startDate);
	},
	formatStartDate(): string {
		return format(selectedDatesService.startDate, dateFormat);
	},
	formatEndDate(): string {
		if (selectedDatesService.endDate) {
			return format(selectedDatesService.endDate, dateFormat);
		}
		return "";
	},
};
