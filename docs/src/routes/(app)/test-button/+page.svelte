<script lang="ts">
  import LiquidButton from "$lib/components/liquid-button.svelte";
  import LiquidIcon from "$lib/components/liquid-icon.svelte";
  import { Search, Menu, Bell, Settings, User, Moon, Sun } from "lucide-svelte";
</script>

<div class="min-h-screen bg-background flex flex-col items-center justify-center gap-12 p-8">
  <h1 class="text-2xl font-medium">Liquid Components</h1>
  
  <!-- Liquid Icon Nav Demo -->
  <div class="flex flex-col items-center gap-4">
    <p class="text-sm text-muted-foreground">Nav Icons</p>
    <div class="flex items-center gap-3">
      <LiquidIcon size="md">
        <Search />
      </LiquidIcon>
      <LiquidIcon size="md">
        <Bell />
      </LiquidIcon>
      <LiquidIcon size="md">
        <Settings />
      </LiquidIcon>
      <LiquidIcon size="md">
        <User />
      </LiquidIcon>
      <LiquidIcon size="md">
        <Moon />
      </LiquidIcon>
    </div>
  </div>

  <!-- Icon Sizes -->
  <div class="flex flex-col items-center gap-4">
    <p class="text-sm text-muted-foreground">Icon Sizes</p>
    <div class="flex items-center gap-4">
      <LiquidIcon size="sm"><Menu /></LiquidIcon>
      <LiquidIcon size="md"><Menu /></LiquidIcon>
      <LiquidIcon size="lg"><Menu /></LiquidIcon>
    </div>
  </div>
  
  <!-- Liquid Buttons -->
  <div class="flex flex-col items-center gap-4">
    <p class="text-sm text-muted-foreground">Buttons</p>
    <div class="flex gap-4 items-center">
      <LiquidButton size="sm">Small</LiquidButton>
      <LiquidButton size="default">Default</LiquidButton>
      <LiquidButton size="lg">Large</LiquidButton>
    </div>
  </div>
  
  <!-- On dark background -->
  <div class="bg-neutral-950 p-12 rounded-xl flex flex-col items-center gap-6">
    <p class="text-sm text-neutral-400">Dark Mode</p>
    <div class="flex items-center gap-3">
      <LiquidIcon size="md"><Search /></LiquidIcon>
      <LiquidIcon size="md"><Bell /></LiquidIcon>
      <LiquidIcon size="md"><Sun /></LiquidIcon>
    </div>
    <LiquidButton>
      Get Started
    </LiquidButton>
  </div>
</div>
