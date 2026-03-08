<script lang="ts">
	import { onMount } from "svelte";

	const { nbSeconds, isTimerOn } = $props();

	let totalSeconds = $state(nbSeconds);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);

	onMount(() => {
		hours = Math.floor(nbSeconds / 3600);
		minutes = Math.floor((nbSeconds % 3600) / 60);
		seconds = (nbSeconds % 3600) % 60;
	});

	setInterval(() => {
		if (isTimerOn) {
			countDown();
		}
	}, 1000);

	function countDown() {
		totalSeconds = totalSeconds - 1;
		hours = Math.floor(totalSeconds / 3600);
		minutes = Math.floor((totalSeconds % 3600) / 60);
		seconds = (totalSeconds % 3600) % 60;
	}
</script>

<span id="timer">
	<span>{hours}</span> : <span>{minutes}</span> : <span>{seconds}</span>
</span>
