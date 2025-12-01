<script lang="ts">
  // ── Lucide icons ────────────────────────────────────────────────────────
  import {
    Book as BookIcon,
    Plus as PlusIcon,
    Play as PlayIcon,
    Send as SendIcon,
    Settings as SettingsIcon,
    ChevronUp as ChevronUpIcon,
    Moon as MoonIcon,
    Sun as SunIcon,
    Loader2 as LoaderIcon
  } from "@lucide/svelte";

  // ── shadcn‑Svelte UI components ────────────────────────────────────────
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { LightSwitch } from "$lib/components/ui/light-switch";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "$lib/components/ui/dialog/index.js";

  // ── Sample data ────────────────────────────────────────────────────────
  type Notebook = { id: string; title: string; updated: string };
  const notebooks: Notebook[] = [
    { id: "1", title: "🧠 AI Research", updated: "2025‑11‑30" },
    { id: "2", title: "📊 Marketing Plan", updated: "2025‑11‑28" },
    { id: "3", title: "🚀 Startup Pitch", updated: "2025‑11‑25" }
  ];

  // UI state
  let activeNotebook: Notebook = notebooks[0];
  let markdownContent = `# ${activeNotebook.title}\n\nWrite your notes here…`;
  let aiResponse = "";
  let isGenerating = false;
  let showAiDialog = false;

  // -------------------------------------------------------------------------
  async function runCell() {
    // Placeholder – in a real app you’d call the Gemini/Vertex AI endpoint.
    isGenerating = true;
    await new Promise(r => setTimeout(r, 1500));
    aiResponse = "✅ AI generated a summary for the cell.";
    isGenerating = false;
    showAiDialog = true;
  }

  function addNewNotebook() {
    const newNb: Notebook = {
      id: crypto.randomUUID(),
      title: "Untitled Notebook",
      updated: new Date().toISOString().split("T")[0]
    };
    notebooks.push(newNb);
    activeNotebook = newNb;
    markdownContent = "# Untitled Notebook\n\n";
  }
</script>

<!-- ──────────────────────────────────────────────────────────────────────── -->
<Sidebar.Provider>
  <Sidebar.Root>

    <!-- ── Sidebar Header (logo) ──────────────────────────────────────── -->
    <Sidebar.Header>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton size="lg">
            {#snippet child({ props })}
              <a href="/" {...props} class="flex items-center gap-2">
                <BookIcon class="size-5" />
                <span class="font-semibold">Notebook LM</span>
              </a>
            {/snippet}
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Header>

    <!-- ── Notebook list ───────────────────────────────────────────────── -->
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>My notebooks</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {#each notebooks as nb (nb.id)}
              <Sidebar.MenuItem>
                <Sidebar.MenuButton
                  class:selected={nb.id === activeNotebook.id}
                  on:click={() => (activeNotebook = nb)}
                >
                  {#snippet child({ props })}
                    <a href="#" {...props} class="flex items-center gap-2">
                      <BookIcon class="size-4" />
                      <span>{nb.title}</span>
                      <Sidebar.MenuBadge>{nb.updated}</Sidebar.MenuBadge>
                    </a>
                  {/snippet}
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            {/each}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton on:click={addNewNotebook}>
                <PlusIcon class="size-4" />
                <span>New notebook</span>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>

    <!-- ── Footer (profile / settings) ──────────────────────────────────── -->
    <Sidebar.Footer>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
          <Sidebar.MenuButton size="lg" builders={[builder]}>
            {#snippet child({ props })}
              <button {...props} class="flex items-center gap-2 w-full">
                <SettingsIcon class="size-5" />
                <span>Settings</span>
                <ChevronUpIcon class="ml-auto" />
              </button>
            {/snippet}
          </Sidebar.MenuButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content align="end" class="w-56">
          <DropdownMenu.Item>Account</DropdownMenu.Item>
          <DropdownMenu.Item>Theme</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Sign out</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Sidebar.Footer>
  </Sidebar.Root>

  <!-- ── Main content (notebook editor) ─────────────────────────────────── -->
  <Sidebar.Inset>
    <header class="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <Sidebar.Trigger />
      <h1 class="flex-1 text-xl font-semibold">{activeNotebook.title}</h1>

      <Button variant="outline" size="icon" on:click={runCell} disabled={isGenerating}>
        {#if isGenerating}
          <LoaderIcon class="animate-spin size-4" />
        {:else}
          <PlayIcon class="size-4" />
        {/if}
      </Button>

      <LightSwitch variant="outline" size="icon" />
    </header>

    <main class="flex flex-1 flex-col gap-4 p-4 overflow-auto">
      <!-- ── Editor Card ──────────────────────────────────────────────── -->
      <Card.Root class="flex flex-col h-full">
        <Card.Header class="flex items-center justify-between pb-2">
          <Card.Title class="text-sm font-medium">Editor</Card.Title>
          <Badge variant="secondary">Live</Badge>
        </Card.Header>

        <Card.Content class="flex-1 overflow-auto">
          <Textarea
            bind:value={markdownContent}
            class="w-full h-full resize-none p-4 font-mono text-sm"
            placeholder="Write markdown…"
          />
        </Card.Content>
      </Card.Root>

      <!-- ── AI Assistant Card ───────────────────────────────────────────── -->
      <Card.Root>
        <Card.Header class="flex items-center justify-between pb-2">
          <Card.Title class="text-sm font-medium">AI Assistant</Card.Title>
        </Card.Header>

        <Card.Content class="flex flex-col gap-2">
          {#if aiResponse}
            <div class="rounded-md bg-muted/20 p-3 text-sm">{aiResponse}</div>
          {/if}
          <div class="flex gap-2">
            <Input placeholder="Ask the AI…" class="flex-1" />
            <Button size="icon" on:click={runCell} disabled={isGenerating}>
              {#if isGenerating}
                <LoaderIcon class="animate-spin size-4" />
              {:else}
                <SendIcon class="size-4" />
              {/if}
            </Button>
          </div>
        </Card.Content>
      </Card.Root>
    </main>
  </Sidebar.Inset>
</Sidebar.Provider>

<!-- ── AI Dialog (optional) ───────────────────────────────────────────── -->
{#if showAiDialog}
  <Dialog open bind:open={showAiDialog}>
    <DialogContent class="max-w-xl">
      <DialogHeader>
        <DialogTitle>AI Generated Summary</DialogTitle>
        <DialogDescription>{aiResponse}</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
{/if}
