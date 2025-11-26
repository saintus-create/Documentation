<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import MenuIcon from "@lucide/svelte/icons/menu";
	import XIcon from "@lucide/svelte/icons/x";
	import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
	import { fly, fade } from "svelte/transition";
	import { cubicOut } from "svelte/easing";

	let open = $state(false);
	let currentView = $state<"main" | string>("main");

	// Documentation structure with sub-sections
	const sections = [
		{
			id: "getting-started",
			title: "Getting Started",
			subsections: [
				{
					id: "intro",
					title: "Introduction",
					content: `
					<h2 class="text-3xl font-bold mb-6">Introduction</h2>
					<p class="text-lg mb-4">Welcome to your documentation site.</p>
					<p>Get started with quick setup and configuration.</p>
				`,
				},
				{
					id: "installation",
					title: "Installation",
					content: `
					<h2 class="text-3xl font-bold mb-6">Installation</h2>
					<pre class="bg-muted p-4 rounded-lg mb-4"><code>npm install your-package</code></pre>
					<p>Follow these steps to install and configure.</p>
				`,
				},
			],
		},
		{
			id: "guides",
			title: "Guides",
			subsections: [
				{
					id: "configuration",
					title: "Configuration",
					content: `
					<h2 class="text-3xl font-bold mb-6">Configuration</h2>
					<p>Learn how to configure your application.</p>
				`,
				},
				{
					id: "deployment",
					title: "Deployment",
					content: `
					<h2 class="text-3xl font-bold mb-6">Deployment</h2>
					<p>Deploy your application to production.</p>
				`,
				},
			],
		},
		{
			id: "api",
			title: "API Reference",
			subsections: [
				{
					id: "overview",
					title: "Overview",
					content: `
					<h2 class="text-3xl font-bold mb-6">API Overview</h2>
					<p>Complete API documentation and reference.</p>
				`,
				},
			],
		},
	];

	let activeContent = $state<string | null>(null);

	function openSection(sectionId: string) {
		currentView = sectionId;
		activeContent = null;
	}

	function selectSubsection(subsectionId: string) {
		activeContent = subsectionId;
	}

	function goBack() {
		currentView = "main";
		activeContent = null;
	}

	$effect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	});
</script>

<div>
	<Button variant="ghost" size="icon" class="size-8" onclick={() => (open = !open)}>
		<MenuIcon class="size-5" />
	</Button>

	{#if open}
		<!-- Content -->
		<div
			class="fixed inset-x-0 top-0 z-50 flex h-screen flex-col bg-[#161617] text-[#f5f5f7]"
			transition:fly={{ y: -20, duration: 400, easing: cubicOut, opacity: 0 }}
		>
			<!-- Header -->
			<div class="flex h-14 items-center justify-between bg-[#161617] px-6 pb-2 pt-4">
				<div class="flex items-center">
					{#if currentView !== "main"}
						<button
							onclick={goBack}
							class="flex items-center gap-1 text-sm font-medium text-[#86868b] transition-colors hover:text-[#f5f5f7]"
							transition:fade={{ duration: 200 }}
						>
							<ChevronLeftIcon class="size-5" />
							Back
						</button>
					{:else}
						<span class="text-lg font-semibold tracking-tight">Menu</span>
					{/if}
				</div>
				<button
					class="text-[#86868b] transition-colors hover:text-[#f5f5f7]"
					onclick={() => {
						open = false;
						currentView = "main";
						activeContent = null;
					}}
				>
					<XIcon class="size-6" />
				</button>
			</div>

			<!-- Navigation / Content -->
			<div class="flex-1 overflow-y-auto px-6 py-8">
				{#if currentView === "main"}
					<!-- Main menu - Apple style: Big, Bold, Clean -->
					<nav
						class="mx-auto max-w-2xl pt-10"
						in:fly={{ y: 20, duration: 400, delay: 100 }}
					>
						<ul class="space-y-4">
							{#each sections as section}
								<li>
									<button
										onclick={() => openSection(section.id)}
										class="group flex w-full items-center justify-between text-left text-2xl font-medium tracking-tight text-[#f5f5f7] transition-colors hover:text-[#f5f5f7]"
									>
										<span>{section.title}</span>
										<ChevronLeftIcon
											class="size-6 rotate-180 text-[#86868b] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
										/>
									</button>
								</li>
							{/each}
						</ul>
					</nav>
				{:else}
					<!-- Subsection menu or content -->
					{#key currentView}
						{@const section = sections.find((s) => s.id === currentView)}
						{#if section && !activeContent}
							<nav
								class="mx-auto max-w-2xl pt-4"
								in:fly={{ x: 50, duration: 300, easing: cubicOut }}
							>
								<h2 class="mb-6 text-xs font-medium tracking-wide text-[#86868b]">
									{section.title}
								</h2>
								<ul class="space-y-4">
									{#each section.subsections as subsection}
										<li>
											<button
												onclick={() => selectSubsection(subsection.id)}
												class="w-full text-left text-xl font-medium text-[#f5f5f7] transition-colors hover:text-white"
											>
												{subsection.title}
											</button>
										</li>
									{/each}
								</ul>
							</nav>
						{:else if activeContent}
							{#key activeContent}
								{@const content = section?.subsections.find(
									(s) => s.id === activeContent
								)}
								<div
									class="prose prose-invert prose-lg mx-auto max-w-2xl pt-4"
									in:fade={{ duration: 300, delay: 150 }}
								>
									{@html content?.content || ""}
								</div>
							{/key}
						{/if}
					{/key}
				{/if}
			</div>
		</div>
	{/if}
</div>
