# Building a Modern Blog Layout with shadcn-svelte

## Overview

This guide shows how to build the blog listing page you see in the image using shadcn-svelte components.

## 🎨 Design Analysis

### Key Features:
1. ✅ **Filter/Category Tabs** - All, Newsroom, Marketing, Company, Engineering
2. ✅ **Search Bar** with keyboard shortcut (⌘ K)
3. ✅ **RSS Feed Icon**
4. ✅ **Card Grid Layout** - Responsive 3-column grid
5. ✅ **Blog Post Cards** with:
   - Date
   - Title
   - Excerpt/Description
   - Author avatars (multiple)
   - "Read" CTA link
6. ✅ **Light, clean aesthetic** - Off-white background

---

## 📦 Required shadcn-svelte Components

Install these components first:

```bash
pnpm dlx shadcn-svelte@latest add card
pnpm dlx shadcn-svelte@latest add badge
pnpm dlx shadcn-svelte@latest add button
pnpm dlx shadcn-svelte@latest add avatar
pnpm dlx shadcn-svelte@latest add tabs
pnpm dlx shadcn-svelte@latest add input
pnpm dlx shadcn-svelte@latest add separator
```

---

## 🚀 Complete Implementation

### Full Blog Page Component

```svelte
<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
  import { Badge } from "$lib/components/ui/badge";
  import { Input } from "$lib/components/ui/input";
  import { Search, Rss } from "lucide-svelte";
  
  // Blog post type
  interface BlogPost {
    id: string;
    date: string;
    title: string;
    excerpt: string;
    authors: Array<{
      name: string;
      avatar: string;
      initials: string;
    }>;
    category: string;
  }
  
  // Sample data
  const categories = ['All', 'Newsroom', 'Marketing', 'Company', 'Engineering'];
  
  let activeCategory = $state('All');
  let searchQuery = $state('');
  
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      date: 'October 28, 2025',
      title: 'Embracing Remote Work Culture: Strategies for Success in a Distributed Workforce',
      excerpt: 'Explore the transformative shift towards remote work and how it has reshaped business operations globally.',
      authors: [
        { name: 'Shadcn', avatar: '', initials: 'SH' },
        { name: 'Guillermo Rauch', avatar: '', initials: 'GR' }
      ],
      category: 'Company'
    },
    {
      id: '2',
      date: 'October 28, 2025',
      title: 'Advancements in Cybersecurity',
      excerpt: 'Discover new technologies protecting businesses from digital threats.',
      authors: [
        { name: 'Shadcn', avatar: '', initials: 'SH' },
        { name: 'Méschac Irung', avatar: '', initials: 'MI' }
      ],
      category: 'Engineering'
    },
    {
      id: '3',
      date: 'October 28, 2025',
      title: 'Cutting-Edge Innovations in Data Analytics',
      excerpt: 'Learn about the latest trends in data analytics and how they can drive business growth.',
      authors: [
        { name: 'Shadcn', avatar: '', initials: 'SH' },
        { name: 'Méschac Irung', avatar: '', initials: 'MI' }
      ],
      category: 'Engineering'
    },
    {
      id: '4',
      date: 'October 28, 2025',
      title: 'Leveraging Big Data for Business Success',
      excerpt: 'See how big data analytics can unlock new opportunities.',
      authors: [
        { name: 'Shadcn', avatar: '', initials: 'SH' }
      ],
      category: 'Marketing'
    },
    {
      id: '5',
      date: 'October 28, 2025',
      title: 'Leveraging Big Data for Career Success',
      excerpt: 'See how big data analytics can unlock new opportunities insights and more from.',
      authors: [
        { name: 'Guillermo Rauch', avatar: '', initials: 'GR' }
      ],
      category: 'Newsroom'
    },
    {
      id: '6',
      date: 'October 28, 2025',
      title: 'The Top Industries and Business Models Using AI for Fraud Prevention and Detection',
      excerpt: 'Discover how various industries leverage AI tools to enhance fraud prevention and detection.',
      authors: [
        { name: 'Méschac Irung', avatar: '', initials: 'MI' }
      ],
      category: 'Engineering'
    }
  ];
  
  // Filter posts
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

<div class="min-h-screen bg-zinc-50">
  
  <!-- Header Section -->
  <div class="border-b bg-white sticky top-0 z-50">
    <div class="container mx-auto px-6 py-4">
      
      <!-- Navigation Tabs & Search -->
      <div class="flex items-center justify-between gap-6">
        
        <!-- Category Pills -->
        <div class="flex items-center gap-2 flex-1">
          {#each categories as category}
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all
                     {activeCategory === category 
                       ? 'bg-zinc-900 text-white' 
                       : 'text-zinc-600 hover:bg-zinc-100'}"
              onclick={() => activeCategory = category}
            >
              {category}
            </button>
          {/each}
        </div>
        
        <!-- Search Bar -->
        <div class="flex items-center gap-3">
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
          
          <!-- RSS Icon -->
          <Button variant="ghost" size="icon" class="text-zinc-600 hover:text-zinc-900">
            <Rss class="h-5 w-5" />
          </Button>
        </div>
        
      </div>
    </div>
  </div>
  
  <!-- Blog Grid -->
  <div class="container mx-auto px-6 py-12">
    
    <!-- Results count -->
    <div class="mb-6 text-sm text-zinc-600">
      {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
      {#if activeCategory !== 'All'}
        in {activeCategory}
      {/if}
    </div>
    
    <!-- Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredPosts as post (post.id)}
        <Card class="group hover:shadow-lg transition-all duration-300 bg-white border-zinc-200">
          <CardHeader class="space-y-3">
            <!-- Date -->
            <p class="text-sm text-zinc-500">
              {post.date}
            </p>
            
            <!-- Title -->
            <CardTitle class="text-xl leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent class="space-y-4">
            <!-- Excerpt -->
            <CardDescription class="text-zinc-600 leading-relaxed">
              {post.excerpt}
            </CardDescription>
            
            <!-- Authors & CTA -->
            <div class="flex items-center justify-between pt-2">
              
              <!-- Author Avatars -->
              <div class="flex items-center -space-x-2">
                {#each post.authors as author}
                  <Avatar class="h-8 w-8 border-2 border-white">
                    {#if author.avatar}
                      <AvatarImage src={author.avatar} alt={author.name} />
                    {/if}
                    <AvatarFallback class="text-xs bg-gradient-to-br from-primary/80 to-primary text-white">
                      {author.initials}
                    </AvatarFallback>
                  </Avatar>
                {/each}
              </div>
              
              <!-- Read Link -->
              <Button 
                variant="link" 
                href="/blog/{post.id}"
                class="text-primary hover:text-primary/80 p-0 h-auto font-medium"
              >
                Read →
              </Button>
              
            </div>
          </CardContent>
        </Card>
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

## 🎨 Styling Variations

### Option 1: With Author Names Below Avatars

```svelte
<!-- In CardContent -->
<div class="space-y-3">
  <!-- Avatars -->
  <div class="flex items-center gap-2">
    {#each post.authors as author}
      <div class="flex items-center gap-2">
        <Avatar class="h-7 w-7">
          <AvatarFallback class="text-xs bg-primary/80 text-white">
            {author.initials}
          </AvatarFallback>
        </Avatar>
        <span class="text-sm text-zinc-600">{author.name}</span>
      </div>
    {/each}
  </div>
  
  <!-- Read Link -->
  <Button variant="link" class="text-primary">
    Read →
  </Button>
</div>
```

### Option 2: With Category Badge

```svelte
<CardHeader class="space-y-3">
  <div class="flex items-center justify-between">
    <p class="text-sm text-zinc-500">{post.date}</p>
    <Badge variant="outline" class="text-xs">
      {post.category}
    </Badge>
  </div>
  
  <CardTitle class="text-xl leading-tight">
    {post.title}
  </CardTitle>
</CardHeader>
```

### Option 3: With Featured Image

```svelte
<Card class="overflow-hidden">
  <!-- Featured Image -->
  <div class="aspect-video bg-zinc-100 relative overflow-hidden">
    <img 
      src={post.image} 
      alt={post.title}
      class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
    />
  </div>
  
  <CardHeader>
    <!-- Rest of card content -->
  </CardHeader>
</Card>
```

---

## 📱 Responsive Design

### Mobile-First Approach

```svelte
<!-- Responsive Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  <!-- Cards -->
</div>

<!-- Mobile Navigation -->
<div class="flex md:hidden flex-col gap-4">
  <!-- Horizontal scroll tabs -->
  <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
    {#each categories as category}
      <button class="shrink-0 px-4 py-2 rounded-lg">
        {category}
      </button>
    {/each}
  </div>
  
  <!-- Search -->
  <Input placeholder="Search..." />
</div>
```

---

## 🔍 Search Functionality Enhancement

### With Keyboard Shortcuts

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  let searchInput: HTMLInputElement;
  
  onMount(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput?.focus();
      }
      
      // Escape to clear search
      if (e.key === 'Escape') {
        searchQuery = '';
        searchInput?.blur();
      }
    };
    
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<Input 
  bind:this={searchInput}
  bind:value={searchQuery}
  placeholder="Search..."
/>
```

---

## 🎯 Advanced Features

### 1. **Infinite Scroll / Pagination**

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  
  let page = $state(1);
  const postsPerPage = 9;
  
  const visiblePosts = $derived(
    filteredPosts.slice(0, page * postsPerPage)
  );
  
  const hasMore = $derived(
    visiblePosts.length < filteredPosts.length
  );
  
  function loadMore() {
    page += 1;
  }
</script>

<!-- After grid -->
{#if hasMore}
  <div class="flex justify-center mt-12">
    <Button onclick={loadMore} size="lg" variant="outline">
      Load More Posts
    </Button>
  </div>
{/if}
```

### 2. **Reading Time Estimate**

```svelte
<script lang="ts">
  function estimateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
</script>

<p class="text-sm text-zinc-500 flex items-center gap-2">
  {post.date} · {estimateReadingTime(post.content)} min read
</p>
```

### 3. **Bookmark/Save Feature**

```svelte
<script lang="ts">
  import { Bookmark } from "lucide-svelte";
  
  let savedPosts = $state<Set<string>>(new Set());
  
  function toggleSave(postId: string) {
    if (savedPosts.has(postId)) {
      savedPosts.delete(postId);
    } else {
      savedPosts.add(postId);
    }
    savedPosts = savedPosts; // Trigger reactivity
  }
</script>

<Button 
  variant="ghost" 
  size="icon"
  onclick={() => toggleSave(post.id)}
  class="absolute top-4 right-4"
>
  <Bookmark 
    class="h-4 w-4"
    fill={savedPosts.has(post.id) ? 'currentColor' : 'none'}
  />
</Button>
```

---

## 🎨 Color Scheme Customization

### Light Theme (Current)
```css
:root {
  --background: oklch(0.985 0 0);     /* Off-white */
  --card: oklch(1 0 0);               /* White */
  --card-foreground: oklch(0.145 0 0); /* Dark text */
  --muted: oklch(0.97 0 0);           /* Light gray */
  --muted-foreground: oklch(0.556 0 0); /* Medium gray */
  --primary: oklch(0.5 0.2 270);      /* Purple/blue */
}
```

### Dark Theme Option
```css
.dark {
  --background: oklch(0.145 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
}
```

---

## 📊 TypeScript Types

```typescript
// types/blog.ts
export interface Author {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: Date;
  updatedAt?: Date;
  authors: Author[];
  category: string;
  tags: string[];
  featuredImage?: string;
  readingTime?: number;
  views?: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count: number;
}
```

---

## 🚀 Performance Optimizations

### 1. **Lazy Load Images**

```svelte
<img 
  src={post.image}
  alt={post.title}
  loading="lazy"
  decoding="async"
  class="object-cover w-full h-full"
/>
```

### 2. **Virtualized List** (for large datasets)

```bash
pnpm add svelte-virtual-list
```

```svelte
<script>
  import VirtualList from 'svelte-virtual-list';
</script>

<VirtualList items={filteredPosts} let:item>
  <BlogCard post={item} />
</VirtualList>
```

### 3. **Debounced Search**

```svelte
<script lang="ts">
  import { debounce } from '$lib/utils';
  
  let searchInput = $state('');
  let searchQuery = $state('');
  
  const debouncedSearch = debounce((value: string) => {
    searchQuery = value;
  }, 300);
  
  $effect(() => {
    debouncedSearch(searchInput);
  });
</script>

<Input bind:value={searchInput} />
```

---

## 🎯 Quick Start Checklist

- [ ] Install required shadcn-svelte components
- [ ] Create blog post type definitions
- [ ] Set up category filtering
- [ ] Add search functionality
- [ ] Implement card grid layout
- [ ] Add author avatars
- [ ] Style hover states
- [ ] Add keyboard shortcuts
- [ ] Test responsive design
- [ ] Optimize for performance

---

## 💡 Pro Tips

1. **Use Card Hover Effects** - Subtle shadow lift on hover
2. **Consistent Spacing** - Use Tailwind's spacing scale
3. **Avatar Groups** - Overlap avatars with `-space-x-2`
4. **Color Consistency** - Use theme variables
5. **Loading States** - Add skeleton cards while fetching
6. **Empty States** - Show helpful message when no results
7. **SEO** - Add proper meta tags for each post
8. **Accessibility** - Ensure keyboard navigation works

This layout is production-ready and fully responsive! 🚀
