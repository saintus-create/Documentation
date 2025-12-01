<script lang="ts">
	import { Menu, X } from "@lucide/svelte";
	import { fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import { cn } from "$lib/utils.js";

	let { isOpen = $bindable(false), menuItems = [], class: className, ...rest } = $props();

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	});

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}
</script>

<div class={cn(className)} {...rest}>
	<button
		class="hover:bg-accent hover:text-accent-foreground flex size-8 items-center justify-center rounded-md md:hidden"
		onclick={toggleMenu}
		type="button"
		aria-label="Toggle menu"
	>
		<Menu class="size-5" />
	</button>

	{#if isOpen}
		<div
			class="fixed inset-x-0 top-0 z-50 flex h-screen flex-col bg-[#161617] text-[#f5f5f7]"
			transition:fly={{ y: -20, duration: 400, easing: cubicOut, opacity: 0 }}
		>
			<div class="flex h-14 items-center justify-between bg-[#161617] px-6 pb-2 pt-4">
				<div class="flex items-center">
					<span class="text-lg font-semibold tracking-tight">Menu</span>
				</div>
				<button
					class="text-[#86868b] transition-colors hover:text-[#f5f5f7]"
					onclick={closeMenu}
					type="button"
					aria-label="Close menu"
				>
					<X class="size-6" />
				</button>
			</div>

			<div class="flex-1 overflow-y-auto px-6 py-8">
				<ul class="space-y-4 p-4">
					{#each menuItems as { title, href }}
						<li>
							<a
								{href}
								class="hover:text-primary block text-lg font-medium text-[#f5f5f7]"
								onclick={closeMenu}
							>
								{title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</div>
