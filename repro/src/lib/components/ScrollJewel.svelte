<script lang="ts">
	import { onMount } from "svelte";
	import ShaderLines from "$lib/components/ShaderLines.svelte";

	let scrollY = 0;
	let visible = false;

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
			// Show jewel after scrolling 200px
			visible = scrollY > 200;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});
</script>

{#if visible}
	<div
		class="fixed bottom-8 right-8 z-50 transition-all duration-700 ease-out"
		style="transform: translateY({visible ? '0' : '100px'}); opacity: {visible ? '1' : '0'};"
	>
		<!-- Jewel container with glassmorphic water bubble effect -->
		<div class="group relative cursor-pointer">
			<!-- Outer glow/aura -->
			<div
				class="absolute -inset-4 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
			/>

			<!-- Main jewel bubble -->
			<div
				class="relative h-32 w-32 overflow-hidden rounded-full border-2 border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl transition-transform duration-500 group-hover:scale-110"
			>
				<!-- Shader background -->
				<div class="absolute inset-0 opacity-60">
					<ShaderLines />
				</div>

				<!-- Glass reflection effect -->
				<div
					class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-50"
				/>

				<!-- Inner content -->
				<div class="relative z-10 flex h-full items-center justify-center">
					<svg
						class="h-12 w-12 text-white drop-shadow-lg"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
						/>
					</svg>
				</div>

				<!-- Bottom highlight -->
				<div
					class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent"
				/>
			</div>

			<!-- Floating ripple effect -->
			<div class="absolute inset-0 animate-ping rounded-full border-2 border-cyan-400/30" />
		</div>
	</div>
{/if}

<style>
	@keyframes ping {
		75%,
		100% {
			transform: scale(1.5);
			opacity: 0;
		}
	}

	.animate-ping {
		animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
	}
</style>
