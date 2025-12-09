<script lang="ts">
	import DocsSidebar from "$lib/components/docs-sidebar.svelte";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { sidebarNavItems } from "$lib/navigation.js";
	let { children } = $props();
</script>

<div class="container-wrapper flex flex-1 flex-col px-2">
	<Sidebar.Provider
		class="3xl:fixed:container 3xl:fixed:px-3 min-h-min flex-1 items-start px-0 [--sidebar-width:200px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:gap-16 lg:pl-24 lg:[--sidebar-width:220px] lg:[--top-spacing:calc(var(--spacing)*4)]"
	>
		<DocsSidebar navItems={sidebarNavItems} />
		<div class="h-full w-full">{@render children()}</div>
	</Sidebar.Provider>
</div>
