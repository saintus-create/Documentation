<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";
	import JeweledButton from "$lib/components/JeweledButton.svelte";

	let visible = false;
	onMount(() => (visible = true));

	const title = "Build faster with Svelte.";
</script>

<svelte:head>
	<title>Shadcn Svelte</title>
</svelte:head>

<main class="min-h-screen bg-gradient-to-b from-[#E0F2FE] via-[#F8FFFE] to-[#E0F2FE]">
	<!-- Navigation -->
	<nav
		class="fixed left-0 right-0 top-0 z-50 border-b border-gray-300/50 bg-white/30 backdrop-blur-md"
	>
		<div class="relative mx-auto flex max-w-7xl items-center justify-center px-6 py-4">
			<div class="absolute left-6">
				<span class="text-lg font-bold text-gray-900">Shadcn Svelte</span>
			</div>
			<div class="hidden gap-6 text-xs font-medium md:flex">
				{#each ["About", "Features", "Learn", "For Business", "Pricing", "Download", "Documentation"] as item}
					<a href="#" class="text-gray-700 transition-colors hover:text-gray-900"
						>{item}</a
					>
				{/each}
			</div>
		</div>
	</nav>

	<div class="pb-32 pt-24">
		<!-- Hero -->
		<section class="mx-auto max-w-4xl px-6 text-center">
			<h1
				class="mb-6 flex min-h-[1.1em] flex-wrap justify-center text-4xl font-medium tracking-tighter text-gray-900 sm:text-6xl md:text-8xl"
			>
				{#if visible}
					{#each title.split(" ") as word, i}
						<span class="mr-[0.25em] inline-block whitespace-nowrap">
							{#each word.split("") as char, j}
								<span
									class="inline-block"
									in:fly={{ y: 40, duration: 800, delay: 100 + i * 150 + j * 40 }}
								>
									{char}
								</span>
							{/each}
						</span>
					{/each}
				{/if}
			</h1>
			<p class="mx-auto mb-8 max-w-2xl text-xl text-gray-700 md:text-2xl">
				Beautifully designed components that you can copy and paste into your apps.
				Accessible. Customizable. Open Source.
			</p>
			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<Button
					size="lg"
					class="border border-gray-400 px-6 py-3 text-base text-gray-700 hover:bg-gray-100"
				>
					Get Started</Button
				>
			</div>
			<p class="mt-4 text-sm text-gray-500/70">Free and open source.</p>
		</section>

		<section class="bg-gradient-to-b from-transparent to-[#60A5FA] py-64">
			<div class="mx-auto max-w-4xl px-6 text-center">
				<h3 class="text-4xl font-bold text-slate-900/80">Dive Deeper</h3>
			</div>
		</section>

		<!-- Solid Color Extension (Content Area) -->
		<!-- Solid Color Extension (Content Area) -->
		<section class="space-y-32 bg-[#60A5FA] py-64">
			<!-- Feature Sections (Moved Here) -->
			<div
				class="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 lg:grid-cols-4"
			>
				{#each ["Card: Root • Header • Title • Description • Content • Footer", "Button: Default • Outline • Ghost • Link • Destructive + Sizes & Icons", "Dialog: Trigger • Content • Header • Title • Description • Footer • Close", "Form: Label • Control • Input • Description • Error • Field • Item"] as item}
					<div
						class="flex h-64 items-center justify-center rounded-2xl border-2 border-white/20 bg-white/10 p-8 text-center backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
					>
						<div>
							<h3 class="mb-2 text-xl font-bold text-white">{item.split(":")[0]}</h3>
							<p class="text-sm text-white/80">{item.split(":")[1]}</p>
						</div>
					</div>
				{/each}
			</div>

			<!-- More Features -->
			<div class="mx-auto max-w-7xl px-6">
				<h2 class="mb-12 text-center text-4xl font-bold text-white">More Components</h2>
				<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
					{#each ["Badge", "Breadcrumb", "Sidebar", "Sheet", "Table", "Tabs", "Toast", "Tooltip"] as item}
						<div
							class="flex h-32 items-center justify-center rounded-xl border border-white/20 bg-white/5 p-4 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
						>
							<span class="font-medium">{item}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- CTA -->
			<div class="mx-auto max-w-4xl px-6 pt-16 text-center">
				<h2 class="mb-8 text-6xl font-black text-white md:text-8xl">Ready to Build?</h2>
				<Button size="lg" class="bg-black px-12 py-6 text-xl text-white hover:bg-gray-800"
					>Get Started</Button
				>
				<p class="mt-4 text-white/80">Start building with shadcn-svelte today.</p>
			</div>
		</section>

		<!-- Bottom Gradient (Extended) -->
		<section class="bg-gradient-to-b from-[#60A5FA] to-transparent py-64"></section>
	</div>

	<!-- Vertical Footer -->
	<footer class="py-24">
		<div class="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6">
			<!-- Brand/Logo -->
			<div class="text-2xl font-bold text-slate-900">Shadcn Svelte</div>

			<!-- Vertical Links -->
			<nav class="flex flex-col items-start gap-4 text-sm font-medium text-gray-600">
				<a href="#" class="transition-colors hover:text-black">Documentation</a>
				<a href="#" class="transition-colors hover:text-black">GitHub</a>
				<a href="#" class="transition-colors hover:text-black">Twitter</a>
				<a href="#" class="transition-colors hover:text-black">Terms of Service</a>
				<a href="#" class="transition-colors hover:text-black">Privacy Policy</a>
			</nav>

			<!-- Copyright -->
			<p class="mt-8 text-xs text-gray-400">
				&copy; 2024 Shadcn Svelte. All rights reserved.
			</p>
		</div>
	</footer>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: "Inter", system-ui, sans-serif;
	}
</style>
