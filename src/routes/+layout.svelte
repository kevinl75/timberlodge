<script lang="ts">
	import "./layout.css";
	import { onMount } from "svelte";
	import favicon from "$lib/assets/logo/logo-64.png";
	import NavBar from "$lib/components/NavBar.svelte";
	import { initAuth } from "$lib/stores/auth.svelte";

	onMount(() => initAuth());

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<main class="h-screen w-screen bg-base-300">
	<NavBar />
	<div>
		{@render children()}
	</div>
</main>
