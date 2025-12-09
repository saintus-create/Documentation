<script lang="ts">
  import { Toaster } from "$lib/registry/ui/sonner/index.js";
  import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
</script>

<Toaster position="top-center" />
<div class="bg-background relative z-10 flex min-h-svh flex-col">
  <header class="bg-background/60 border-border/20 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
    <div class="container mx-auto px-6 h-16 flex items-center">
      <a href="/" class="font-semibold text-lg">shadcn-svelte</a>
      <nav class="ml-auto flex gap-6">
        <a href="/docs" class="text-sm hover:text-foreground/80">Docs</a>
        <a href="/blog" class="text-sm hover:text-foreground/80">Blog</a>
      </nav>
    </div>
  </header>
  <main class="flex flex-1 flex-col">
    <Tooltip.Provider>
      <slot />
    </Tooltip.Provider>
  </main>
  <footer class="border-t py-6">
    <div class="container text-center text-sm text-muted-foreground">
      Built with SvelteKit
    </div>
  </footer>
</div>
