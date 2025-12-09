<script lang="ts">
  import { cn } from "$lib/utils.js";

  export let size: "sm" | "md" | "lg" = "md";
  export let className = "";

  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12"
  };

  const iconSizes = {
    sm: "[&_svg]:h-3.5 [&_svg]:w-3.5",
    md: "[&_svg]:h-4 [&_svg]:w-4",
    lg: "[&_svg]:h-5 [&_svg]:w-5"
  };
</script>

<button
  class={cn(
    "group relative inline-flex items-center justify-center rounded-full cursor-pointer isolation-auto overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95",
    sizes[size],
    iconSizes[size],
    className
  )}
  on:click
  on:mouseenter
  on:mouseleave
>
  <!-- Material Layer: Deep blur + subtle base tint + saturation boost -->
  <div class="absolute inset-0 z-0 bg-neutral-100/10 dark:bg-neutral-900/40 backdrop-blur-[12px] backdrop-saturate-150 transition-colors duration-500 will-change-[backdrop-filter]" />

  <!-- Noise Texture -->
  <div class="absolute inset-0 z-[1] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJYdWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg=='); pointer-events-none;"></div>

  <!-- Lighting & Depth Layer -->
  <div class="absolute inset-0 z-[2] rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),inset_0_-1px_0_0_rgba(255,255,255,0.02)] transition-shadow duration-300 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),inset_0_-1px_0_0_rgba(0,0,0,0.1)]" />

  <!-- Surface Shine -->
  <div class="absolute inset-0 z-[2] rounded-full bg-gradient-to-b from-white/10 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

  <!-- Border -->
  <div class="absolute inset-0 z-[3] rounded-full border border-black/5 dark:border-white/10 group-hover:border-black/10 dark:group-hover:border-white/20 transition-colors duration-300" />

   <!-- Dynamic Glare (Subtle rotate for icon) -->
  <div class="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine left-[-100%]" />

  <!-- Icon -->
  <div class="relative z-10 text-foreground/80 dark:text-foreground/70 transition-colors duration-300 group-hover:text-foreground drop-shadow-sm">
    <slot />
  </div>
</button>
