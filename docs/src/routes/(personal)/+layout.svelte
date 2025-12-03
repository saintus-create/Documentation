<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	
	const navItems = [
		{ href: '/personal', label: 'Home' },
		{ href: '/personal/blog', label: 'Blog' },
		{ href: '/personal/components', label: 'Components' },
		{ href: '/personal/about', label: 'About' }
	];
</script>

<div class="min-h-screen bg-background">
	<!-- Navigation -->
	<header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<div class="container flex h-14 items-center">
			<div class="mr-4 flex">
				<a href="/personal" class="mr-6 flex items-center space-x-2">
					<span class="font-bold">Your Name</span>
				</a>
				<nav class="flex items-center space-x-6 text-sm font-medium">
					{#each navItems as item}
						<a
							href={item.href}
							class="transition-colors hover:text-foreground/80"
							class:text-foreground={$page.url.pathname === item.href}
							class:text-foreground/60={$page.url.pathname !== item.href}
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
			<p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
				Built with <a href="https://www.shadcn-svelte.com" target="_blank" rel="noreferrer" class="font-medium underline underline-offset-4">shadcn-svelte</a>
			</p>
		</div>
	</footer>
</div>
