<script lang="ts">
	import * as Card from '$lib/registry/ui/card';
	import * as Avatar from '$lib/registry/ui/avatar';
	import { Button } from '$lib/registry/ui/button';
	import { Badge } from '$lib/registry/ui/badge';

	// Mock data representing what would come from a CMS or API
	const posts = [
		{
			title: 'The Future of Web Development',
			description: 'Exploring the next generation of frontend tools and frameworks.',
			date: 'October 27, 2025',
			authors: [
				{
					name: 'shadcn',
					avatar: 'https://github.com/shadcn.png',
					initials: 'CN'
				}
			],
			category: 'Engineering'
		},
		{
			title: 'Understanding Server Components',
			description: 'A deep dive into the architecture of modern React and Svelte applications.',
			date: 'October 25, 2025',
			authors: [
				{
					name: 'Rich Harris',
					avatar: 'https://github.com/rich-harris.png',
					initials: 'RH'
				}
			],
			category: 'Engineering'
		},
		{
			title: 'Mastering Tailwind CSS',
			description: 'Tips and tricks for building beautiful, responsive UIs faster.',
			date: 'October 20, 2025',
			authors: [
				{
					name: 'Adam Wathan',
					avatar: 'https://github.com/adamwathan.png',
					initials: 'AW'
				}
			],
			category: 'Design'
		},
        {
			title: 'Building Accessible Components',
			description: 'Ensuring your application is usable by everyone.',
			date: 'October 15, 2025',
			authors: [
				{
					name: 'shadcn',
					avatar: 'https://github.com/shadcn.png',
					initials: 'CN'
				}
			],
			category: 'Engineering'
		},
        {
			title: 'State Management in 2025',
			description: 'How signals are changing the way we think about state.',
			date: 'October 10, 2025',
			authors: [
				{
					name: 'Evan You',
					avatar: 'https://github.com/yyx990803.png',
					initials: 'EY'
				}
			],
			category: 'Engineering'
		},
        {
			title: 'Deploying to the Edge',
			description: 'Making your application faster and more reliable globally.',
			date: 'October 5, 2025',
			authors: [
				{
					name: 'Guillermo Rauch',
					avatar: 'https://github.com/rauchg.png',
					initials: 'GR'
				}
			],
			category: 'DevOps'
		}
	];
</script>

<div class="container py-10">
	<div class="mb-12 space-y-4 text-center">
		<h1 class="text-4xl font-bold tracking-tighter sm:text-5xl">Blog</h1>
		<p class="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
			Updates, insights, and stories from the team.
		</p>
	</div>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each posts as post}
			<Card.Root class="flex flex-col justify-between hover:shadow-lg transition-shadow">
				<Card.Header>
					<div class="flex items-center justify-between mb-2">
                         <span class="text-sm text-muted-foreground">{post.date}</span>
                         <Badge variant="outline">{post.category}</Badge>
                    </div>
					<Card.Title class="leading-tight">{post.title}</Card.Title>
					<Card.Description class="line-clamp-3 mt-2">
						{post.description}
					</Card.Description>
				</Card.Header>
				<Card.Content class="mt-auto pt-6">
					<div class="flex items-center space-x-3">
						{#each post.authors as author}
							<div class="flex items-center space-x-2">
								<Avatar.Root class="h-8 w-8">
									<Avatar.Image src={author.avatar} alt={author.name} />
									<Avatar.Fallback>{author.initials}</Avatar.Fallback>
								</Avatar.Root>
								<span class="text-sm font-medium">{author.name}</span>
							</div>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>
