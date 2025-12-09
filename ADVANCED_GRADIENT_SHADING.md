# Advanced Shading Techniques - Dark Mode Gradients

## The "Simple Pricing" Effect

Looking at the image you shared, this uses **radial gradients with blur** to create a subtle glow/depth effect on dark backgrounds.

## 🎨 Key Visual Elements

### 1. **Radial Gradient Background**
The subtle glow around "Simple Pricing" is achieved with positioned radial gradients.

### 2. **Text Glow Effect**
The heading appears to have a subtle luminous quality.

### 3. **Layered Depth**
Multiple gradient layers create sophisticated depth.

---

## Implementation Examples

### Example 1: Radial Gradient Glow Background

```svelte
<script lang="ts">
  import Metadata from "$lib/components/metadata.svelte";
  import { Button } from "$lib/components/ui/button";
</script>

<Metadata title="Pricing" description="Simple pricing" />

<!-- Main container with dark background -->
<div class="relative min-h-screen bg-black overflow-hidden">
  <!-- Radial gradient overlays -->
  <div class="absolute inset-0 bg-gradient-radial from-zinc-900/50 via-transparent to-transparent 
              pointer-events-none blur-3xl" 
       style="background: radial-gradient(circle at 50% 20%, 
              oklch(0.3 0.05 270 / 0.4) 0%, 
              transparent 50%)" />
  
  <!-- Additional subtle glow -->
  <div class="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none"
       style="background: radial-gradient(circle at 50% 30%, 
              oklch(0.4 0.08 280 / 0.2) 0%, 
              transparent 60%)" />
  
  <!-- Content -->
  <div class="relative z-10 flex min-h-screen items-center justify-center px-6">
    <div class="container mx-auto max-w-5xl">
      <div class="flex flex-col items-center text-center space-y-6">
        <!-- Heading with subtle text glow -->
        <h1 class="text-[clamp(3rem,10vw,6rem)] font-bold text-white leading-[0.9] tracking-tight
                   drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
          Simple Pricing
        </h1>
        
        <!-- Subtitle -->
        <p class="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          Choose the perfect plan for your needs<br />
          and start optimizing your workflow today
        </p>
        
        <!-- Toggle buttons -->
        <div class="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-sm 
                    border border-zinc-800 rounded-full p-1 mt-8">
          <Button 
            variant="ghost" 
            class="rounded-full px-6 text-zinc-400 hover:text-white"
          >
            Monthly
          </Button>
          <Button 
            variant="default" 
            class="rounded-full px-6 bg-white text-black hover:bg-zinc-200"
          >
            Annually
          </Button>
        </div>
        
        <!-- Save badge -->
        <p class="text-sm text-zinc-500">
          Save 25% On Annual Billing
        </p>
      </div>
    </div>
  </div>
</div>
```

---

### Example 2: Multiple Radial Gradient Layers

```svelte
<div class="relative min-h-screen bg-[#0a0a0a]">
  <!-- Layer 1: Primary glow -->
  <div 
    class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] 
           opacity-20 blur-[100px] pointer-events-none"
    style="background: radial-gradient(circle, 
           oklch(0.45 0.15 280) 0%, 
           transparent 70%)"
  />
  
  <!-- Layer 2: Secondary accent -->
  <div 
    class="absolute top-1/4 right-1/4 w-[500px] h-[500px] 
           opacity-10 blur-[80px] pointer-events-none"
    style="background: radial-gradient(circle, 
           oklch(0.5 0.12 320) 0%, 
           transparent 70%)"
  />
  
  <!-- Layer 3: Left accent -->
  <div 
    class="absolute top-1/3 left-1/4 w-[400px] h-[400px] 
           opacity-10 blur-[80px] pointer-events-none"
    style="background: radial-gradient(circle, 
           oklch(0.45 0.10 240) 0%, 
           transparent 70%)"
  />
  
  <!-- Content goes here -->
  <div class="relative z-10">
    <!-- Your content -->
  </div>
</div>
```

---

### Example 3: Animated Gradient Glow

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  let mouseX = $state(0);
  let mouseY = $state(0);
  
  onMount(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });
</script>

<div class="relative min-h-screen bg-black overflow-hidden">
  <!-- Follows cursor -->
  <div 
    class="absolute w-[600px] h-[600px] opacity-15 blur-[120px] 
           pointer-events-none transition-all duration-300 ease-out"
    style="background: radial-gradient(circle, 
           oklch(0.5 0.2 280) 0%, 
           transparent 70%);
           left: {mouseX - 300}px;
           top: {mouseY - 300}px;"
  />
  
  <!-- Static background glow -->
  <div 
    class="absolute inset-0 opacity-20 pointer-events-none"
    style="background: radial-gradient(circle at 50% 20%, 
           oklch(0.35 0.1 270 / 0.3) 0%, 
           transparent 50%)"
  />
  
  <div class="relative z-10">
    <!-- Your content -->
  </div>
</div>
```

---

### Example 4: CSS-Only Gradient Shading

```css
/* Add to your global CSS or component styles */

.gradient-glow-bg {
  position: relative;
  background: #000000;
  overflow: hidden;
}

.gradient-glow-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  height: 600px;
  background: radial-gradient(
    circle,
    oklch(0.4 0.12 270 / 0.25) 0%,
    transparent 65%
  );
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;
}

.gradient-glow-bg::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 20%;
  width: 600px;
  height: 500px;
  background: radial-gradient(
    circle,
    oklch(0.45 0.15 300 / 0.15) 0%,
    transparent 65%
  );
  filter: blur(90px);
  pointer-events-none;
  z-index: 0;
}

.gradient-glow-bg > * {
  position: relative;
  z-index: 1;
}
```

Usage:
```svelte
<div class="gradient-glow-bg min-h-screen">
  <div class="relative z-10">
    <!-- Content -->
  </div>
</div>
```

---

## 🎯 Text Glow Effects

### Option 1: Drop Shadow
```svelte
<h1 class="text-6xl font-bold text-white 
           drop-shadow-[0_0_50px_rgba(255,255,255,0.12)]
           drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">
  Simple Pricing
</h1>
```

### Option 2: Text Shadow
```svelte
<h1 class="text-6xl font-bold text-white"
    style="text-shadow: 
           0 0 80px oklch(1 0 0 / 0.15),
           0 0 40px oklch(1 0 0 / 0.1),
           0 0 20px oklch(1 0 0 / 0.08);">
  Simple Pricing
</h1>
```

### Option 3: Gradient Text with Glow
```svelte
<h1 class="text-6xl font-bold bg-gradient-to-b from-white via-white to-zinc-400 
           bg-clip-text text-transparent
           drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
  Simple Pricing
</h1>
```

---

## 🔧 Complete Pricing Page Example

```svelte
<script lang="ts">
  import Metadata from "$lib/components/metadata.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  
  let billingPeriod = $state<'monthly' | 'annually'>('annually');
</script>

<Metadata title="Pricing" description="Simple, transparent pricing" />

<!-- Dark background with gradient glow -->
<div class="relative min-h-screen bg-black overflow-hidden">
  
  <!-- Radial gradient layers -->
  <div 
    class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] 
           opacity-20 blur-[120px] pointer-events-none"
    style="background: radial-gradient(circle, 
           oklch(0.4 0.12 270) 0%, 
           oklch(0.3 0.08 280) 40%,
           transparent 70%)"
  />
  
  <div 
    class="absolute top-1/3 right-1/4 w-[600px] h-[600px] 
           opacity-12 blur-[100px] pointer-events-none"
    style="background: radial-gradient(circle, 
           oklch(0.45 0.15 300) 0%, 
           transparent 65%)"
  />
  
  <!-- Content -->
  <div class="relative z-10">
    
    <!-- Navigation -->
    <nav class="border-b border-zinc-800/50 backdrop-blur-sm">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-8">
            <span class="text-xl font-bold text-white">Logo</span>
            <div class="hidden md:flex items-center gap-6 text-sm">
              <button class="text-zinc-400 hover:text-white transition-colors">
                Product
              </button>
              <button class="text-zinc-400 hover:text-white transition-colors">
                Solutions
              </button>
              <button class="text-white">
                Pricing
              </button>
              <button class="text-zinc-400 hover:text-white transition-colors">
                Company
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Hero Section -->
    <section class="flex items-center justify-center px-6 py-32">
      <div class="container mx-auto max-w-5xl">
        <div class="flex flex-col items-center text-center space-y-8">
          
          <!-- Heading with glow -->
          <h1 
            class="text-[clamp(3rem,10vw,6rem)] font-bold text-white 
                   leading-[0.9] tracking-tight"
            style="text-shadow: 
                   0 0 80px oklch(1 0 0 / 0.12),
                   0 0 40px oklch(1 0 0 / 0.08);"
          >
            Simple Pricing
          </h1>
          
          <!-- Subtitle -->
          <p class="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Choose the perfect plan for your needs<br />
            and start optimizing your workflow today
          </p>
          
          <!-- Billing toggle -->
          <div class="flex flex-col items-center gap-4 mt-8">
            <div class="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-sm 
                        border border-zinc-800 rounded-full p-1.5">
              <button 
                class="rounded-full px-6 py-2 text-sm font-medium transition-all
                       {billingPeriod === 'monthly' 
                         ? 'bg-white text-black' 
                         : 'text-zinc-400 hover:text-white'}"
                onclick={() => billingPeriod = 'monthly'}
              >
                Monthly
              </button>
              <button 
                class="rounded-full px-6 py-2 text-sm font-medium transition-all
                       {billingPeriod === 'annually' 
                         ? 'bg-white text-black' 
                         : 'text-zinc-400 hover:text-white'}"
                onclick={() => billingPeriod = 'annually'}
              >
                Annually
              </button>
            </div>
            
            {#if billingPeriod === 'annually'}
              <Badge variant="outline" class="border-zinc-700 text-zinc-400">
                Save 25% On Annual Billing
              </Badge>
            {/if}
          </div>
          
        </div>
      </div>
    </section>
    
  </div>
</div>
```

---

## 🎨 Color Values for Dark Gradients

### Purple/Blue Gradients (like in image)
```css
/* Primary glow - purple/blue */
oklch(0.4 0.12 270)   /* Deep purple */
oklch(0.45 0.15 280)  /* Purple-blue */
oklch(0.5 0.18 290)   /* Bright purple-blue */

/* Accent glow - magenta */
oklch(0.45 0.15 320)  /* Purple-magenta */
oklch(0.5 0.2 330)    /* Bright magenta */
```

### Green/Cyan Gradients
```css
oklch(0.45 0.12 180)  /* Cyan */
oklch(0.5 0.15 160)   /* Green-cyan */
```

### Orange/Red Gradients
```css
oklch(0.45 0.15 40)   /* Orange */
oklch(0.5 0.18 20)    /* Red-orange */
```

---

## 💡 Pro Tips

### 1. **Multiple Blur Layers**
Stack 2-3 gradient layers with different blur amounts for depth:
```svelte
<!-- Strong blur (background) -->
<div class="blur-[120px] opacity-20" />

<!-- Medium blur (mid) -->
<div class="blur-[80px] opacity-15" />

<!-- Light blur (foreground) -->
<div class="blur-[40px] opacity-10" />
```

### 2. **Positioning**
Use `top`, `left`, `right`, `bottom` percentages for dynamic placement:
```svelte
<div style="
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
" />
```

### 3. **Opacity Control**
Keep gradients subtle:
- Background glow: `opacity-10` to `opacity-20`
- Accent glows: `opacity-5` to `opacity-15`
- Text glow: `opacity-8` to `opacity-15`

### 4. **Blur Amount**
- Subtle: `blur-[40px]` to `blur-[60px]`
- Medium: `blur-[80px]` to `blur-[100px]`
- Strong: `blur-[120px]` to `blur-[150px]`

---

## 🚀 Quick Start Template

```svelte
<div class="relative min-h-screen bg-black overflow-hidden">
  <!-- Copy this gradient setup -->
  <div 
    class="absolute top-0 left-1/2 -translate-x-1/2 
           w-[1000px] h-[800px] opacity-20 blur-[100px] 
           pointer-events-none"
    style="background: radial-gradient(circle, 
           oklch(0.4 0.12 270) 0%, 
           transparent 70%)"
  />
  
  <div class="relative z-10">
    <!-- Your content here -->
  </div>
</div>
```

This creates the exact sophisticated shading effect you see in the "Simple Pricing" image! 🎨
