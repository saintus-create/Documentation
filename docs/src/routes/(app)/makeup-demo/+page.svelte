<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Card } from "$lib/registry/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	let products = [
		{
			id: 1,
			title: "Lipstick",
			price: "$19",
			image: "https://via.placeholder.com/300x300?text=Lipstick",
		},
		{
			id: 2,
			title: "Eyeshadow Palette",
			price: "$35",
			image: "https://via.placeholder.com/300x300?text=Eyeshadow",
		},
		{
			id: 3,
			title: "Foundation",
			price: "$29",
			image: "https://via.placeholder.com/300x300?text=Foundation",
		},
		{
			id: 4,
			title: "Mascara",
			price: "$22",
			image: "https://via.placeholder.com/300x300?text=Mascara",
		},
		{
			id: 5,
			title: "Blush",
			price: "$18",
			image: "https://via.placeholder.com/300x300?text=Blush",
		},
		{
			id: 6,
			title: "Highlighter",
			price: "$24",
			image: "https://via.placeholder.com/300x300?text=Highlighter",
		},
	];

	let categories = [
		"All",
		"Lipstick",
		"Eyeshadow",
		"Foundation",
		"Mascara",
		"Blush",
		"Highlighter",
	];
	let selectedCategory = "All";
	let search = "";
</script>

<svelte:head>
	<title>Makeup Demo</title>
	<meta
		name="description"
		content="Demo page showcasing makeup products with a stylish layout."
	/>
</svelte:head>

<!-- Hero Section -->
<section
	class="relative flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 py-24 text-white"
>
	<div class="max-w-2xl text-center">
		<h1 class="mb-4 text-5xl font-bold">Discover Your Perfect Look</h1>
		<p class="mb-6 text-lg">Explore our curated collection of makeup essentials.</p>
		<Button variant="default" size="lg">Shop Now</Button>
	</div>
</section>

<!-- Filter Bar -->
<div class="bg-muted flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild>
			<Button variant="outline">{selectedCategory}</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="start" class="w-48">
			{#each categories as cat}
				<DropdownMenu.Item on:click={() => (selectedCategory = cat)}
					>{cat}</DropdownMenu.Item
				>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>

	<Input placeholder="Search products…" bind:value={search} class="max-w-sm" />
</div>

<!-- Product Grid -->
<div class="grid gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
	{#each products as product (product.id)}
		<Card class="flex flex-col">
			<img
				src={product.image}
				alt={product.title}
				class="h-48 w-full rounded-t-lg object-cover"
			/>
			<div class="flex flex-1 flex-col p-4">
				<h3 class="mb-2 text-lg font-semibold">{product.title}</h3>
				<p class="text-muted-foreground mb-4">{product.price}</p>
				<Button variant="default" class="mt-auto w-full">Add to Cart</Button>
			</div>
		</Card>
	{/each}
</div>
