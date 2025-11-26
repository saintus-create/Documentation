<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import ChevronUpIcon from "@lucide/svelte/icons/chevron-up";
	import HouseIcon from "@lucide/svelte/icons/house";
	import InboxIcon from "@lucide/svelte/icons/inbox";
	import SearchIcon from "@lucide/svelte/icons/search";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import UserIcon from "@lucide/svelte/icons/user";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { LightSwitch } from "$lib/components/ui/light-switch";

	// Menu items.
	const navItems = [
		{
			title: "Home",
			url: "#",
			icon: HouseIcon,
		},
		{
			title: "Inbox",
			url: "#",
			icon: InboxIcon,
			badge: "12",
		},
		{
			title: "Calendar",
			url: "#",
			icon: CalendarIcon,
		},
		{
			title: "Search",
			url: "#",
			icon: SearchIcon,
		},
		{
			title: "Settings",
			url: "#",
			icon: SettingsIcon,
		},
	];
</script>

<Sidebar.Provider>
	<Sidebar.Root>
		<!-- Sidebar Header -->
		<Sidebar.Header>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton size="lg">
						{#snippet child({ props })}
							<a href="/" {...props}>
								<div
									class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
								>
									<span class="text-lg font-bold">S</span>
								</div>
								<div class="flex flex-col gap-0.5 leading-none">
									<span class="font-semibold">Sidebar App</span>
									<span class="text-xs">v1.0.0</span>
								</div>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Header>

		<!-- Sidebar Content -->
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each navItems as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<a href={item.url} {...props}>
											<item.icon />
											<span>{item.title}</span>
											{#if item.badge}
												<Sidebar.MenuBadge>{item.badge}</Sidebar.MenuBadge>
											{/if}
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>

		<!-- Sidebar Footer -->
		<Sidebar.Footer>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Sidebar.MenuButton size="lg" builders={[builder]}>
								{#snippet child({ props })}
									<button {...props}>
										<div
											class="bg-sidebar-accent flex aspect-square size-8 items-center justify-center rounded-lg"
										>
											<UserIcon class="size-4" />
										</div>
										<div class="flex flex-col items-start gap-0.5 leading-none">
											<span class="font-semibold">John Doe</span>
											<span class="text-xs">john@example.com</span>
										</div>
										<ChevronUpIcon class="ml-auto" />
									</button>
								{/snippet}
							</Sidebar.MenuButton>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end" class="w-56">
							<DropdownMenu.Group>
								<DropdownMenu.Label>My Account</DropdownMenu.Label>
								<DropdownMenu.Separator />
								<DropdownMenu.Item>Profile</DropdownMenu.Item>
								<DropdownMenu.Item>Settings</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item>Log out</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Footer>
	</Sidebar.Root>

	<!-- Main Content Area -->
	<Sidebar.Inset>
		<header
			class="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4"
		>
			<Sidebar.Trigger />
			<div class="ml-auto">
				<LightSwitch variant="outline" size="icon" />
			</div>
		</header>

		<main class="flex flex-1 flex-col gap-4 p-4">
			<div class="grid auto-rows-min gap-4 md:grid-cols-3">
				<div class="bg-muted/50 aspect-video rounded-xl p-4">
					<h3 class="font-semibold">Card 1</h3>
					<p class="text-muted-foreground text-sm">Some content here</p>
				</div>
				<div class="bg-muted/50 aspect-video rounded-xl p-4">
					<h3 class="font-semibold">Card 2</h3>
					<p class="text-muted-foreground text-sm">Some content here</p>
				</div>
				<div class="bg-muted/50 aspect-video rounded-xl p-4">
					<h3 class="font-semibold">Card 3</h3>
					<p class="text-muted-foreground text-sm">Some content here</p>
				</div>
			</div>

			<div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl p-4">
				<h2 class="mb-4 text-2xl font-bold">Welcome to Your Sidebar Page</h2>
				<p class="text-muted-foreground mb-4">
					This is a fully functional sidebar layout with navigation, header, and footer.
				</p>
				<ul class="text-muted-foreground list-inside list-disc space-y-2">
					<li>Click the menu button in the header to toggle the sidebar</li>
					<li>Navigate between different sections using the sidebar menu</li>
					<li>Access user account options from the footer dropdown</li>
					<li>Toggle between light and dark mode with the theme switcher</li>
				</ul>
			</div>
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>

<style>
	:global(body) {
		overflow: hidden;
	}
</style>
