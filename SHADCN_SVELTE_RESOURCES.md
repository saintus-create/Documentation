# shadcn-svelte Available Resources

> Generated from shadcnSvelteListTool - Complete list of all available components and documentation

## Components

Found **62 UI components** available in shadcn-svelte:

### Form & Input Components
`accordion` · `alert-dialog` · `alert` · `aspect-ratio` · `avatar` · `badge` · `breadcrumb` · `button-group` · `button` · `calendar` · `checkbox` · `combobox` · `command` · `date-picker` · `field` · `form` (Formsnap) · `input-group` · `input-otp` · `input` · `kbd` · `label` · `native-select` · `radio-group` · `range-calendar` · `select` · `slider` · `switch` · `textarea` · `toggle-group` · `toggle`

### Layout & Navigation
`breadcrumb` · `card` · `carousel` · `context-menu` · `data-table` · `drawer` · `dropdown-menu` · `menubar` · `navigation-menu` · `pagination` · `resizable` · `scroll-area` · `separator` · `sheet` · `sidebar` · `table` · `tabs`

### Feedback & Overlay
`alert-dialog` · `alert` · `dialog` · `empty` · `hover-card` · `popover` · `progress` · `skeleton` · `sonner` (Toast) · `spinner` · `tooltip`

### Display & Media
`aspect-ratio` · `avatar` · `badge` · `card` · `chart` · `collapsible` · `item` · `typography`

### Complete Alphabetical List
1. `accordion`
2. `alert-dialog`
3. `alert`
4. `aspect-ratio`
5. `avatar`
6. `badge`
7. `breadcrumb`
8. `button-group`
9. `button`
10. `calendar`
11. `card`
12. `carousel`
13. `chart`
14. `checkbox`
15. `collapsible`
16. `combobox`
17. `command`
18. `context-menu`
19. `data-table`
20. `date-picker`
21. `dialog`
22. `drawer`
23. `dropdown-menu`
24. `empty`
25. `field`
26. `form` (Formsnap)
27. `hover-card`
28. `input-group`
29. `input-otp`
30. `input`
31. `item`
32. `kbd`
33. `label`
34. `menubar`
35. `native-select`
36. `navigation-menu`
37. `pagination`
38. `popover`
39. `progress`
40. `radio-group`
41. `range-calendar`
42. `resizable`
43. `scroll-area`
44. `select`
45. `separator`
46. `sheet`
47. `sidebar`
48. `skeleton`
49. `slider`
50. `sonner`
51. `spinner`
52. `switch`
53. `table`
54. `tabs`
55. `textarea`
56. `toggle-group`
57. `toggle`
58. `tooltip`
59. `typography`

## Blocks

Pre-built sections (dashboards, sidebars, login pages, etc.):

### Featured
- `dashboard-01`

### Sidebar
- `sidebar-03`
- `sidebar-07`

### Login
- `login-03`
- `login-04`

## Charts

Pre-built chart components using chart.js:

### Area Charts
- `chart-area-default`
- `chart-area-interactive`

### Bar Charts
- `chart-bar-default`
- `chart-bar-interactive`

### Line Charts
- `chart-line-default`
- `chart-line-interactive`

### Pie Charts
- `chart-pie-default`
- `chart-pie-interactive`

### Radar Charts
- `chart-radar-default`
- `chart-radar-interactive`

### Radial Charts
- `chart-radial-default`
- `chart-radial-interactive`

### Tooltip Charts
- `chart-tooltip-default`
- `chart-tooltip-icons`

## Documentation

### Installation Guides
- `sveltekit` - Set up shadcn-svelte with SvelteKit
- `vite` - Set up shadcn-svelte with Vite
- `astro` - Set up shadcn-svelte with Astro

### Dark Mode
- `svelte` - Dark mode implementation for Svelte

### Migration Guides
- `svelte-5` - Migrate to Svelte 5
- `tailwind-v4` - Migrate to Tailwind CSS v4

### General Documentation
- `cli` - Command-line interface usage
- `theming` - Customizing themes and CSS variables
- `components-json` - Configuration file reference
- `figma` - Figma design resources
- `changelog` - Version history and updates
- `about` - About shadcn-svelte

## Additional Resources

### Themes
Interactive theme generator available at `/themes`. Themes are not individual components but CSS configurations you can copy and paste.

**Available themes:**
- Default
- New York
- And custom color schemes

### Colors
Tailwind color palette reference available at `/colors`. Shows colors in:
- HEX
- RGB
- HSL
- OKLCH
- CSS variable formats

### Icons
Lucide Svelte icons documentation and search available via the `shadcnSvelteIconsTool`. 

**Features:**
- Browse 1600+ Lucide icons
- Search by name and tags
- Usage examples
- SVG code snippets

---

## Usage Examples

### Get Component Documentation
To retrieve detailed information about a component:

```typescript
{
  name: 'button',
  type: 'component'
}
```

### Get Chart Documentation
```typescript
{
  name: 'chart-tooltip-default',
  type: 'component'
}
```

### Get Block Documentation
```typescript
{
  name: 'dashboard-01',
  type: 'component'
}
```

### Get Installation Docs
```typescript
{
  name: 'sveltekit',
  type: 'doc'
}
```

## Installation Quick Reference

### Initialize shadcn-svelte
```bash
npx shadcn-svelte@latest init
```

### Add a Component
```bash
# Single component
npx shadcn-svelte@latest add button

# Multiple components
npx shadcn-svelte@latest add button input card

# With package manager
pnpm dlx shadcn-svelte@latest add button
```

### Add a Block
```bash
npx shadcn-svelte@latest add dashboard-01
```

### Add a Chart
```bash
npx shadcn-svelte@latest add chart-area-default
```

## Component Categories Summary

| Category | Count | Examples |
|----------|-------|----------|
| **Form & Input** | 29 | button, input, select, checkbox, textarea |
| **Layout** | 17 | card, sidebar, tabs, table, separator |
| **Feedback** | 11 | alert, dialog, toast, tooltip, progress |
| **Display** | 8 | avatar, badge, typography, chart |
| **Blocks** | 4+ | dashboard, sidebar, login pages |
| **Charts** | 14 | area, bar, line, pie, radar, radial |

---

**Total Resources:** 62 components + 14 charts + 4 blocks + 12 documentation sections = **92+ resources**

## Next Steps

1. **Explore Components**: Browse individual component documentation
2. **Install Components**: Use the CLI to add components to your project
3. **Search Components**: Use `shadcnSvelteSearchTool` for fuzzy search
4. **Find Icons**: Use `shadcnSvelteIconsTool` to browse Lucide icons
5. **Get Details**: Use `shadcnSvelteGetTool` for complete component docs

---

*Last Updated: December 4, 2025*  
*Source: [shadcn-svelte.com](https://www.shadcn-svelte.com)*
