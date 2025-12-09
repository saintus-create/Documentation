<script lang="ts">
  import { cva, type VariantProps } from "class-variance-authority";
  import { cn } from "$lib/utils.js";

  const glassButtonVariants = cva(
    "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none",
    {
      variants: {
        variant: {
          default: "text-foreground",
          primary: "text-white",
        },
        size: {
          sm: "h-8 px-4 text-[11px] font-medium rounded-full",
          default: "h-10 px-5 text-[13px] font-medium rounded-full",
          lg: "h-12 px-7 text-[15px] font-medium rounded-full",
          xl: "h-14 px-8 text-[15px] font-medium rounded-full",
          icon: "h-10 w-10 p-0 rounded-full",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  );

  export let variant: VariantProps<typeof glassButtonVariants>["variant"] = "default";
  export let size: VariantProps<typeof glassButtonVariants>["size"] = "default";
  export let className = "";
</script>

<button
  class={cn(
    "group relative isolation-auto overflow-hidden",
    glassButtonVariants({ variant, size, class: className })
  )}
  on:click
  on:mouseenter
  on:mouseleave
>
  <!-- Material Layer: Deep blur + subtle base tint + saturation boost -->
  <div class="absolute inset-0 z-0 bg-neutral-100/10 dark:bg-neutral-900/40 backdrop-blur-[16px] backdrop-saturate-150 transition-colors duration-500 will-change-[backdrop-filter]" />

  <!-- Noise Texture: Adds physical tactility -->
  <div class="absolute inset-0 z-[1] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJYdWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg=='); pointer-events-none;"></div>

  <!-- Lighting & Depth Layer: Inner shadows, rim light, and surface gradient -->
  <div class="absolute inset-0 z-[2] rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),inset_0_-1px_0_0_rgba(255,255,255,0.02)] transition-shadow duration-300 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),inset_0_-1px_0_0_rgba(0,0,0,0.1)]" />

  <!-- Surface Shine: Subtle gradient top-down -->
  <div class="absolute inset-0 z-[2] rounded-full bg-gradient-to-b from-white/10 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

  <!-- Border Integration: Ultra-thin, crisp border -->
  <div class="absolute inset-0 z-[3] rounded-full border border-black/5 dark:border-white/10 group-hover:border-black/10 dark:group-hover:border-white/20 transition-colors duration-300" />

  <!-- Dynamic Glare: Moves on hover for "liquid" feel -->
  <div class="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine left-[-100%]" />

  <!-- Content -->
  <span class="relative z-10 flex items-center justify-center gap-2 text-foreground/90 transition-colors duration-300 group-hover:text-foreground shadow-sm">
    <slot />
  </span>
</button>
