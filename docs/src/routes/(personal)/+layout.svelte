<script lang="ts">
	import { page } from "$app/stores";

	const navItems = [
		{ href: "/personal", label: "Home" },
		{ href: "/personal/blog", label: "Blog" },
		{ href: "/personal/components", label: "Components" },
		{ href: "/personal/about", label: "About" },
	];
</script>

<div class="bg-background min-h-screen">
	<!-- Navigation -->
	<header
		class="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
	>
		<div class="container flex h-14 items-center">
			<div class="mr-4 flex">
				<a href="/personal" class="mr-6 flex items-center space-x-2">
					<span class="font-bold">Your Name</span>
				</a>
				<nav class="flex items-center space-x-6 text-sm font-medium">
					{#each navItems as item (item.href)}
						<a
							href={item.href}
							class="hover:text-foreground/80 transition-colors {$page.url
								.pathname === item.href
								? 'text-foreground'
								: 'text-foreground/60'}"
						>
							{item.label}
						</a>
					{/each}
				</nav>
			</div>
			<div class="flex flex-1 items-center justify-end space-x-2">
				<!-- Theme toggle or other buttons can go here -->
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="container py-6">
		<slot />
	</main>

	<!-- Footer -->
	<footer class="border-t py-6 md:py-0">
		<div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
			<p class="text-muted-foreground text-center text-sm leading-loose md:text-left">
				Built with <a
					href="https://www.shadcn-svelte.com"
					target="_blank"
					rel="noreferrer"
					class="font-medium underline underline-offset-4">shadcn-svelte</a
				>
			</p>
		</div>
	</footer>
</div>
