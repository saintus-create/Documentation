# shadcn-svelte Shading, Shadows & Theming Guide

## Overview

Yes! The MCP has extensive information about shading, theming, colors, and visual styling in shadcn-svelte. Here's everything you need to know.

## 🎨 CSS Variables for Theming

shadcn-svelte uses **CSS Variables** for all styling, making it incredibly easy to customize colors, shadows, and the overall look without touching component code.

### Convention: Background & Foreground

Every color follows a simple pattern:
- `--<name>`: Background color
- `--<name>-foreground`: Text/foreground color

**Example:**
```css
--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
```

Used in component:
```svelte
<div class="bg-primary text-primary-foreground">
  Hello
</div>
```

## 📋 Complete List of CSS Variables

### Light Theme (`:root`)

```css
:root {
  /* Border Radius */
  --radius: 0.625rem;
  
  /* Base Colors */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  
  /* Card */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  
  /* Popover */
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  
  /* Primary */
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  
  /* Secondary */
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  
  /* Muted */
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  
  /* Accent */
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  
  /* Destructive */
  --destructive: oklch(0.577 0.245 27.325);
  
  /* Borders & Inputs */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  
  /* Charts */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  
  /* Sidebar */
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}
```

### Dark Theme (`.dark`)

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  
  --popover: oklch(0.269 0 0);
  --popover-foreground: oklch(0.985 0 0);
  
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  
  --accent: oklch(0.371 0 0);
  --accent-foreground: oklch(0.985 0 0);
  
  --destructive: oklch(0.704 0.191 22.216);
  
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.439 0 0);
}
```

## 🌈 Available Base Colors

shadcn-svelte supports multiple base color palettes:

### 1. **Neutral**
- Classic gray scale
- Most versatile

### 2. **Stone**
- Warm gray tones
- Earthy feel

### 3. **Zinc**
- Cool gray tones
- Modern, clean

### 4. **Gray**
- Balanced gray
- Standard palette

### 5. **Slate**
- Blue-tinted gray
- Professional look

## 🎭 Adding Custom Colors

To add new colors like "warning" or "info":

```css
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}

.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

Now use it in components:
```svelte
<div class="bg-warning text-warning-foreground">
  Warning message
</div>
```

## 🎨 Color Formats Supported

shadcn-svelte uses **OKLCH** by default, but supports:

1. **OKLCH** (Recommended)
   ```css
   --primary: oklch(0.205 0 0);
   ```
   - Perceptually uniform
   - Better for gradients
   - More predictable lightness

2. **HSL**
   ```css
   --primary: hsl(220 83% 53%);
   ```

3. **RGB**
   ```css
   --primary: rgb(37 99 235);
   ```

4. **HEX** (converted to oklch)
   ```css
   --primary: #2563eb;
   ```

See [Tailwind Colors Docs](https://tailwindcss.com/docs/colors) for more.

## 🌑 Shadows & Depth

### Built-in Shadow Variables

While shadcn-svelte primarily uses borders and backgrounds for depth, you can add custom shadow variables:

```css
:root {
  /* Subtle shadows */
  --shadow-sm: 0 1px 2px 0 oklch(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 oklch(0 0 0 / 0.1), 
            0 1px 2px -1px oklch(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px oklch(0 0 0 / 0.1),
               0 2px 4px -2px oklch(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px oklch(0 0 0 / 0.1),
               0 4px 6px -4px oklch(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px oklch(0 0 0 / 0.1),
               0 8px 10px -6px oklch(0 0 0 / 0.1);
}

.dark {
  /* Darker shadows for dark mode */
  --shadow: 0 1px 3px 0 oklch(0 0 0 / 0.3),
            0 1px 2px -1px oklch(0 0 0 / 0.3);
}
```

### Using Shadows

```svelte
<!-- Using Tailwind -->
<Card class="shadow-md hover:shadow-lg transition-shadow">
  Content
</Card>

<!-- Using custom variables -->
<div style="box-shadow: var(--shadow-lg)">
  Content
</div>
```

## 🎯 Common Shading Patterns

### 1. **Card Elevation**
```svelte
<Card class="border shadow-sm hover:shadow-md transition-all">
  <CardHeader>
    <CardTitle>Elevated Card</CardTitle>
  </CardHeader>
</Card>
```

### 2. **Glass Morphism**
```css
.glass {
  background: oklch(from var(--background) l c h / 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid oklch(from var(--border) l c h / 0.5);
}
```

### 3. **Subtle Depth**
```svelte
<div class="bg-muted/30 border border-border/50">
  Subtle background
</div>
```

### 4. **Gradient Backgrounds**
```svelte
<div class="bg-gradient-to-r from-primary/10 to-accent/10">
  Gradient background
</div>
```

## 🌐 Theme Resources from MCP

The shadcn-svelte MCP provides access to:

### 1. **Theming Documentation**
- URL: `/docs/theming`
- Complete CSS variable reference
- Color customization guide
- Adding new colors

### 2. **Interactive Theme Generator**
- URL: `/themes`
- Visual theme customization
- Copy-paste ready CSS
- Live preview

### 3. **Color Palette Reference**
- URL: `/colors`
- All Tailwind colors
- Multiple formats: HEX, RGB, HSL, OKLCH
- CSS variable syntax

### 4. **Dark Mode Guide**
- URL: `/docs/dark-mode/svelte`
- Dark mode implementation
- Theme switching
- System preference detection

## 🛠️ Accessing via MCP Tools

You can use the MCP to fetch theming documentation:

```typescript
// Using shadcnSvelteGetTool
{
  name: 'theming',
  type: 'doc'
}

// Or search for it
{
  query: 'theming colors shadows',
  type: 'docs'
}
```

## 💡 Practical Examples

### Example 1: Themed Card with Shadow
```svelte
<script>
  import { Card, CardHeader, CardTitle, CardContent } from "$lib/components/ui/card";
</script>

<Card class="bg-card text-card-foreground shadow-lg border-border">
  <CardHeader>
    <CardTitle class="text-xl">Themed Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p class="text-muted-foreground">
      This card uses theme variables for colors and shadows.
    </p>
  </CardContent>
</Card>
```

### Example 2: Custom Accent Section
```svelte
<section class="bg-accent/20 border-l-4 border-accent p-6">
  <h3 class="text-accent-foreground font-semibold">
    Important Note
  </h3>
  <p class="text-muted-foreground">
    Using accent colors for emphasis
  </p>
</section>
```

### Example 3: Gradient Hero
```svelte
<section class="relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
  <div class="relative z-10 p-20">
    <h1 class="text-4xl font-bold text-foreground">
      Hero Section
    </h1>
  </div>
</section>
```

## 📚 Key Takeaways

1. **CSS Variables** - Everything is customizable through CSS variables
2. **OKLCH Format** - More perceptually uniform than HSL/RGB
3. **Background/Foreground** - Consistent naming convention
4. **Dark Mode** - Simple `.dark` class toggle
5. **Custom Colors** - Easy to add new color schemes
6. **Shadows** - Use Tailwind utilities or custom variables
7. **MCP Access** - Full theming docs available via MCP tools

## 🔗 Related Documentation

Access these via the MCP:

- **Theming**: `{ name: 'theming', type: 'doc' }`
- **Dark Mode**: `{ name: 'svelte', type: 'doc' }` (under dark-mode)
- **Colors**: Visit `/colors` page
- **Themes**: Visit `/themes` page for interactive generator

---

**Need more info?** Use the MCP search tool:
```typescript
{
  query: 'colors shadows theming',
  type: 'all'
}
```
