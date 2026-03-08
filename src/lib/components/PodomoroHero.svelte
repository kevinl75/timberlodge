<script lang="ts">
	import { itemsService } from "$lib/stores/items.svelte";
	import { CirclePlay, CirclePause } from "lucide-svelte";
	import { onMount } from "svelte";

	let isTimerOn: boolean = $state(false);
	let totalNbSeconds = $state(60 * 25);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);
	let intervalId = $state(0);

	async function toogleIsTimerOn() {
		isTimerOn = !isTimerOn;
		if (isTimerOn) {
			setInterval(() => {
				if (isTimerOn) countDown();
			}, 1000);
		} else {
			if (intervalId !== 0) clearInterval(intervalId);
		}
	}

	onMount(() => {
		hours = Math.floor(totalNbSeconds / 3600);
		minutes = Math.floor((totalNbSeconds % 3600) / 60);
		seconds = (totalNbSeconds % 3600) % 60;
	});

	function countDown() {
		totalNbSeconds = totalNbSeconds - 1;
		hours = Math.floor(totalNbSeconds / 3600);
		minutes = Math.floor((totalNbSeconds % 3600) / 60);
		seconds = (totalNbSeconds % 3600) % 60;
	}

	function displayHoursComponents(value: number) {
		if (value < 10) return `0${value}`;
		else return value.toString();
	}
</script>

<div class="hero mt-20">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<p class="text-3xl font-bold">
				{itemsService.getSelectedItem()?.itemContent}
				<button onclick={toogleIsTimerOn} class="mr-2 p-1">
					{#if !isTimerOn}
						<CirclePlay size={22} />
					{:else}
						<CirclePause size={22} />
					{/if}
				</button>
			</p>
			<p class="text-4xl font-bold">
				<span>{displayHoursComponents(hours)}</span>:<span>{displayHoursComponents(minutes)}</span
				>:<span>{displayHoursComponents(seconds)}</span>
			</p>
			<div class="tooltip mt-5" data-tip="Play">
				<button onclick={toogleIsTimerOn} class="mr-2 p-1">
					{#if !isTimerOn}
						<CirclePlay size={40} />
					{:else}
						<CirclePause size={40} />
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>
