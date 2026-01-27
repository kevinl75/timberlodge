<script lang="ts">
	import "./layout.css";
	import { onMount } from "svelte";
	import favicon from "$lib/assets/favicon.svg";
	import NavBar from "$lib/components/NavBar.svelte";
	import { initAuth } from "$lib/stores/auth.svelte";

	onMount(() => initAuth());

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<main>
	<NavBar />
	<div class="m-auto max-w-5xl object-top pt-10">
		{@render children()}
	</div>
</main>
