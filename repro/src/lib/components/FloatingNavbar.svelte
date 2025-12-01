<script lang="ts">
	import AnimatedMobileNav from "$lib/components/animated-mobile-nav.svelte";
	import { onMount } from "svelte";

	const menuItems = [
		{ title: "Home", href: "/" },
		{ title: "Docs", href: "/docs" },
		{ title: "Blog", href: "/blog" },
		{ title: "Contact", href: "/contact" },
	];

	let isDark = false;
	let isOpen = $state(false);
	onMount(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		isDark = media.matches;
		media.addEventListener("change", (e) => (isDark = e.matches));
	});
</script>

<header
	class="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-white/30 px-4 backdrop-blur-md dark:bg-[#161617]/30"
>
	<a href="/" class="text-primary text-xl font-bold">
		<slot name="logo">MySite</slot>
	</a>

	<nav class="hidden space-x-6 md:flex">
		{#each menuItems as { title, href }}
			<a
				{href}
				class="hover:text-primary text-sm font-medium text-[#f5f5f7] transition-colors"
			>
				{title}
			</a>
		{/each}
	</nav>

	<AnimatedMobileNav class="md:hidden" bind:isOpen {menuItems} />
</header>
