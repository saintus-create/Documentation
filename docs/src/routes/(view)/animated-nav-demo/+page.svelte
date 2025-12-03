<script lang="ts">
	import AnimatedMobileNav from "$lib/components/animated-mobile-nav.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<svelte:head>
	<title>Animated Overlay Navigation Demo</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<!-- Header with animated nav -->
	<header
		class="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
	>
		<div class="container flex h-14 items-center">
			<div class="mr-4 flex">
				<a class="mr-6 flex items-center space-x-2" href="/">
					<span class="text-xl font-bold">Your Docs</span>
				</a>
			</div>

			<!-- Animated Mobile Navigation -->
			<div class="flex flex-1 items-center justify-end md:justify-end">
				<AnimatedMobileNav />
			</div>
		</div>
	</header>

	<!-- Main content -->
	<main class="container flex-1 py-12">
		<div class="mx-auto max-w-3xl space-y-8">
			<div>
				<h1 class="text-4xl font-bold tracking-tight">Animated Overlay Navigation</h1>
				<p class="text-muted-foreground mt-4 text-lg">
					Click the menu button to see the animated overlay navigation in action.
				</p>
			</div>

			<div class="space-y-4 rounded-lg border p-6">
				<h2 class="text-2xl font-semibold">How it works</h2>
				<ul class="text-muted-foreground list-inside list-disc space-y-2">
					<li>Click the menu icon in the header</li>
					<li>An overlay slides down from the top</li>
					<li>Click different sections to see content animate</li>
					<li>Each section smoothly fades in/slides up</li>
					<li>Perfect for mobile-first documentation</li>
				</ul>
			</div>

			<div class="space-y-4 rounded-lg border p-6">
				<h2 class="text-2xl font-semibold">Features</h2>
				<div class="grid gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<h3 class="font-medium">Smooth Animations</h3>
						<p class="text-muted-foreground text-sm">
							Content fades in and slides up with smooth transitions
						</p>
					</div>
					<div class="space-y-2">
						<h3 class="font-medium">Pill Navigation</h3>
						<p class="text-muted-foreground text-sm">
							Easy-to-use pill-style section switcher
						</p>
					</div>
					<div class="space-y-2">
						<h3 class="font-medium">Mobile Optimized</h3>
						<p class="text-muted-foreground text-sm">
							Designed specifically for mobile experiences
						</p>
					</div>
					<div class="space-y-2">
						<h3 class="font-medium">shadcn-svelte</h3>
						<p class="text-muted-foreground text-sm">
							Built with real shadcn-svelte components
						</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
