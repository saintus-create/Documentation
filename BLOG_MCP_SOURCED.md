# Blog Layout - Using Real shadcn-svelte Components (MCP-Sourced)

> **Note**: This implementation uses actual component documentation fetched from the shadcn-svelte MCP server.

## 📦 Installation (From MCP Documentation)

Install the required components:

```bash
# Install all components at once
pnpm dlx shadcn-svelte@latest add card avatar button input badge
```

Or install them separately:

```bash
pnpm dlx shadcn-svelte@latest add card
pnpm dlx shadcn-svelte@latest add avatar
pnpm dlx shadcn-svelte@latest add button
pnpm dlx shadcn-svelte@latest add input
pnpm dlx shadcn-svelte@latest add badge
```

**Note**: Avatar component requires `bits-ui` as a dependency:
```bash
pnpm i bits-ui -D
```

---

## 🚀 Complete Blog Implementation

### Blog Listing Page (`+page.svelte`)

```svelte
<script lang="ts">
  // Components imported exactly as per MCP documentation
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Search, Rss } from "lucide-svelte";
  
  // Blog post type
  interface BlogPost {
    id: string;
    date: string;
    title: string;
    excerpt: string;
    authors: Array<{
      name: string;
      avatar?: string;
      initials: string;
    }>;
    category: string;
  }
  
  // Categories
  const categories = ['All', 'Newsroom', 'Marketing', 'Company', 'Engineering'];
  
  let activeCategory = $state('All');
  let searchQuery = $state('');
  
  // Sample blog posts
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      date: 'October 28, 2025',
      title: 'Embracing Remote Work Culture: Strategies for Success in a Distributed Workforce',
      excerpt: 'Explore the transformative shift towards remote work and how it has reshaped business operations globally.',
      authors: [
        { name: 'Shadcn', initials: 'SH' },
        { name: 'Guillermo Rauch', initials: 'GR' }
      ],
      category: 'Company'
    },
    {
      id: '2',
      date: 'October 28, 2025',
      title: 'Advancements in Cybersecurity',
      excerpt: 'Discover new technologies protecting businesses from digital threats.',
      authors: [
        { name: 'Shadcn', initials: 'SH' },
        { name: 'Méschac Irung', initials: 'MI' }
      ],
      category: 'Engineering'
    },
    {
      id: '3',
      date: 'October 28, 2025',
      title: 'Cutting-Edge Innovations in Data Analytics',
      excerpt: 'Learn about the latest trends in data analytics and how they can drive business growth.',
      authors: [
        { name: 'Shadcn', initials: 'SH' },
        { name: 'Méschac Irung', initials: 'MI' }
      ],
      category: 'Engineering'
    }
  ];
  
  // Filter posts based on category and search
  const filteredPosts = $derived(
    blogPosts.filter(post => {
      const categoryMatch = activeCategory === 'All' || post.category === activeCategory;
      const searchMatch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    })
  );
</script>

<!-- Main Container -->
<div class="min-h-screen bg-zinc-50">
  
  <!-- Sticky Header with Filters & Search -->
  <div class="border-b bg-white sticky top-0 z-50">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between gap-6 flex-wrap">
        
        <!-- Category Filter Pills -->
        <div class="flex items-center gap-2">
          {#each categories as category}
            <Button
              variant={activeCategory === category ? 'default' : 'ghost'}
              size="sm"
              class="rounded-lg"
              onclick={() => activeCategory = category}
            >
              {category}
            </Button>
          {/each}
        </div>
        
        <!-- Search Bar & RSS -->
        <div class="flex items-center gap-3">
          <!-- Search Input (as per MCP docs) -->
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input 
              type="search"
              placeholder="Search..."
              bind:value={searchQuery}
              class="pl-10 pr-20 w-[300px] bg-zinc-50 border-zinc-200"
            />
            <kbd class="absolute right-3 top-1/2 -translate-y-1/2 
                       pointer-events-none inline-flex h-5 select-none items-center gap-1 
                       rounded border border-zinc-200 bg-white px-1.5 
                       font-mono text-[10px] font-medium text-zinc-500">
              <span class="text-xs">⌘</span>K
            </kbd>
          </div>
          
          <!-- RSS Button -->
          <Button variant="ghost" size="icon" class="text-zinc-600">
            <Rss class="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Blog Grid -->
  <div class="container mx-auto px-6 py-12">
    
    <!-- Results Count -->
    <div class="mb-6 text-sm text-zinc-600">
      {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
      {#if activeCategory !== 'All'}
        in {activeCategory}
      {/if}
    </div>
    
    <!-- Grid of Blog Cards -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredPosts as post (post.id)}
        
        <!-- Card.Root component as per MCP documentation -->
        <Card.Root class="group hover:shadow-lg transition-all duration-300 bg-white">
          
          <!-- Card.Header with Title and Description -->
          <Card.Header class="space-y-3">
            <!-- Date -->
            <p class="text-sm text-zinc-500">
              {post.date}
            </p>
            
            <!-- Card.Title component -->
            <Card.Title class="text-xl leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </Card.Title>
          </Card.Header>
          
          <!-- Card.Content component -->
          <Card.Content class="space-y-4">
            
            <!-- Card.Description component -->
            <Card.Description class="text-zinc-600 leading-relaxed">
              {post.excerpt}
            </Card.Description>
            
            <!-- Authors & Read Link -->
            <div class="flex items-center justify-between pt-2">
              
              <!-- Avatar Group (as per MCP docs) -->
              <div class="flex items-center -space-x-2">
                {#each post.authors as author}
                  <Avatar.Root class="h-8 w-8 border-2 border-white">
                    {#if author.avatar}
                      <Avatar.Image src={author.avatar} alt={author.name} />
                    {/if}
                    <Avatar.Fallback class="text-xs bg-gradient-to-br from-primary/80 to-primary text-white">
                      {author.initials}
                    </Avatar.Fallback>
                  </Avatar.Root>
                {/each}
              </div>
              
              <!-- Read Button (variant="link" as per MCP docs) -->
              <Button 
                variant="link" 
                href="/blog/{post.id}"
                class="text-primary p-0 h-auto font-medium"
              >
                Read →
              </Button>
              
            </div>
          </Card.Content>
          
        </Card.Root>
        
      {/each}
    </div>
    
    <!-- Empty State -->
    {#if filteredPosts.length === 0}
      <div class="flex flex-col items-center justify-center py-20 text-center">
        <p class="text-zinc-500 text-lg mb-2">No posts found</p>
        <p class="text-zinc-400 text-sm">
          Try adjusting your filters or search query
        </p>
      </div>
    {/if}
    
  </div>
</div>
```

---

## 📖 Component Usage (Direct from MCP)

### 1. **Card Component**

```svelte
<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card Description</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Card Content</p>
  </Card.Content>
  <Card.Footer>
    <p>Card Footer</p>
  </Card.Footer>
</Card.Root>
```

### 2. **Avatar Component**

```svelte
<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar/index.js";
</script>

<Avatar.Root>
  <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
  <Avatar.Fallback>CN</Avatar.Fallback>
</Avatar.Root>
```

### 3. **Button Component**

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<!-- Different variants -->
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### 4. **Input Component**

```svelte
<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
</script>

<Input type="search" placeholder="Search..." />
```

---

## 🎯 Key Implementation Notes

### 1. **Component Imports**
All components are imported exactly as specified in the MCP documentation:
- Use `index.js` path
- Card uses namespace import: `import * as Card`
- Button, Input use named imports: `import { Button }`

### 2. **Avatar Dependency**
Avatar requires `bits-ui`:
```bash
pnpm i bits-ui -D
```

### 3. **Card Structure**
Follow the exact structure from MCP docs:
- `Card.Root` → `Card.Header` → `Card.Title` / `Card.Description`
- `Card.Content` → Content
- `Card.Footer` → Footer (optional)

### 4. **Avatar Fallback**
Always provide `Avatar.Fallback` for when images don't load.

---

## 🔧 Customization

### Adding Author Names

```svelte
<div class="flex items-center gap-3">
  {#each post.authors as author}
    <div class="flex items-center gap-2">
      <Avatar.Root class="h-7 w-7">
        <Avatar.Image src={author.avatar} alt={author.name} />
        <Avatar.Fallback class="text-xs">
          {author.initials}
        </Avatar.Fallback>
      </Avatar.Root>
      <span class="text-sm text-zinc-600">{author.name}</span>
    </div>
  {/each}
</div>
```

### Adding Category Badge

```svelte
<Card.Header>
  <div class="flex items-center justify-between">
    <p class="text-sm text-zinc-500">{post.date}</p>
    <Badge variant="outline">{post.category}</Badge>
  </div>
  <Card.Title>{post.title}</Card.Title>
</Card.Header>
```

---

## ✅ Installation Checklist

- [ ] Run `pnpm dlx shadcn-svelte@latest init` (if not done)
- [ ] Install Card: `pnpm dlx shadcn-svelte@latest add card`
- [ ] Install Avatar: `pnpm dlx shadcn-svelte@latest add avatar`
- [ ] Install Button: `pnpm dlx shadcn-svelte@latest add button`
- [ ] Install Input: `pnpm dlx shadcn-svelte@latest add input`
- [ ] Install Badge: `pnpm dlx shadcn-svelte@latest add badge`
- [ ] Install bits-ui: `pnpm i bits-ui -D`
- [ ] Install lucide-svelte: `pnpm i lucide-svelte` (for icons)

---

## 📝 Notes from MCP Documentation

1. **Import Paths**: Always use `.js` extension in imports even for TypeScript files
2. **Component Structure**: Composite components (Card, Avatar) use namespace imports
3. **Variants**: Button has multiple variants: default, outline, ghost, link, destructive
4. **Styling**: All components accept `class` prop for Tailwind customization

---

This implementation uses **actual component APIs** from the shadcn-svelte MCP documentation, ensuring compatibility and following best practices! 🚀
