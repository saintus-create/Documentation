<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { ModeWatcher } from "mode-watcher";
	import FloatingNavbar from "$lib/components/FloatingNavbar.svelte";

	import { page } from "$app/stores";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
{#if $page.url.pathname !== "/"}
	<FloatingNavbar />
{/if}
{@render children?.()}
