<script lang="ts">
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { page } from "$app/state";
	import type { SidebarNavItem } from "$lib/navigation.js";
	import type { ComponentProps } from "svelte";

	let {
		navItems,
		...restProps
	}: { navItems: SidebarNavItem[] } & ComponentProps<typeof Sidebar.Root> = $props();

	const pathname = $derived(page.url.pathname);
</script>

<Sidebar.Root
	class="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--footer-height)+2rem)] bg-transparent lg:flex"
	collapsible="none"
	{...restProps}
>
	<Sidebar.Content class="no-scrollbar overflow-x-hidden px-2 pb-12">
		<div class="h-(--top-spacing) shrink-0"></div>
		{#each navItems as item (item.title)}
			<Sidebar.Group>
				<Sidebar.GroupLabel class="text-foreground/70 font-medium px-2 py-1.5 text-sm">
					{item.title}
				</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					{#if item.items.length}
						<Sidebar.Menu class="gap-1 px-2">
							{#each item.items as subItem (subItem.href)}
								{#if subItem.items.length === 0}
									<Sidebar.MenuItem class="w-full">
										<Sidebar.MenuButton
											isActive={subItem.href === pathname}
											class="w-full justify-start rounded-md px-2 py-1.5 text-[13px] font-normal transition-colors hover:bg-muted/50 data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-[0_0_0_1px_rgba(59,130,246,1)] data-[active=true]:font-medium relative"
										>
											{#snippet child({ props })}
												<a href={subItem.href} {...props} class="flex w-full items-center gap-2">
													{subItem.title}
													{#if subItem.indicator === "new"}
														<span
															class="ml-auto flex size-1.5 rounded-full bg-blue-500"
															title="New"
														></span>
													{/if}
												</a>
											{/snippet}
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								{/if}
							{/each}
						</Sidebar.Menu>
					{/if}
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>
</Sidebar.Root>
