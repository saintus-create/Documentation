<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	type Props = HTMLButtonAttributes & {
		class?: string;
		children?: Snippet;
		tiltX?: number;
		tiltY?: number;
	};

	let { class: className = "", children, tiltX = 0, tiltY = 0, ...restProps }: Props = $props();

	// Dynamic light position based on tilt (simulating reflection)
	let lightX = $derived(50 + tiltX * 1.5);
	let lightY = $derived(50 + tiltY * 1.5);
</script>

<button
	{...restProps}
	class="group relative overflow-hidden rounded-full px-12 py-6 text-xl font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 {className}"
	style="
    /* Dynamic Glass Material */
    background: radial-gradient(circle at {lightX}% {lightY}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    
    /* Complex Depth Shadows */
    box-shadow: 
      0 4px 24px -1px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.2),
      inset 0 0 0 1px rgba(255, 255, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  "
>
	<!-- Moving Specular Reflection -->
	<div
		class="pointer-events-none absolute inset-0 opacity-50"
		style="background: radial-gradient(circle at {lightX}% {lightY}%, rgba(255,255,255,0.8) 0%, transparent 40%); mix-blend-mode: overlay;"
	/>

	<!-- Bottom Rim Light (Refraction) -->
	<div
		class="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-70"
	/>

	<!-- Text content with subtle shadow -->
	<span class="relative z-10 font-semibold tracking-wide text-white/95 drop-shadow-md">
		{@render children?.()}
	</span>
</button>
