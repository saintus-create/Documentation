<script lang="ts">
	import { onMount } from "svelte";
	import JeweledButton from "$lib/components/JeweledButton.svelte";
	import WaterShader from "$lib/components/WaterShader.svelte";

	let tiltX = 0;
	let tiltY = 0;

	onMount(() => {
		const handleMouseMove = (event: MouseEvent) => {
			const centerX = window.innerWidth / 2;
			const centerY = window.innerHeight / 2;
			tiltX = ((event.clientX - centerX) / centerX) * 20;
			tiltY = ((event.clientY - centerY) / centerY) * 10;
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	});
</script>

<svelte:head>
	<title>Diamond Lagoon</title>
</svelte:head>

<div class="relative min-h-screen overflow-hidden bg-slate-900">
	<!-- Lagoon Bottom (Sand/Dark Blue) -->
	<div class="absolute inset-0 bg-gradient-to-b from-cyan-900 to-slate-900" />

	<!-- Water Surface Shader (The Lagoon) -->
	<div class="absolute inset-0 opacity-40">
		<WaterShader />
	</div>

	<!-- Floating autumn leaves (SVG) - Below surface -->
	<div class="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay">
		{#each Array(8) as _, i}
			<div
				class="animate-float-slow absolute"
				style="left: {Math.random() * 100}%; top: {Math.random() *
					100}%; animation-delay: {i * 0.5}s;"
			>
				<svg class="h-12 w-12 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M17.5 3c-1.8 0-3.5.8-4.7 2.3-1.2.8-2.3 2-3.3 3.7-.7 1.3-1.5 3-2 5-.3 1.3-.3 2.7 0 4 .5 2 1.3 3.7 2 5 1 1.7 2.1 2.9 3.3 3.7C14 21.2 15.7 22 17.5 22s3.5-.8 4.7-2.3c.5-.7.8-1.5.8-2.3 0-1.2-.7-2.2-1.7-2.8-.5-.3-1-.5-1.8-.5-1.2 0-2.2.7-2.8 1.7-.3.5-.5 1-.5 1.8 0 .8.2 1.5.5 2 .7 1 1.6 1.7 2.8 1.7.8 0 1.3-.2 1.8-.5 1-.6 1.7-1.6 1.7-2.8 0-.8-.3-1.6-.8-2.3C21 15.8 19.3 15 17.5 15c-1.2 0-2.3.3-3.3 1-1.7 1.2-2.9 3-3.7 5.3-.3 1-.5 2-.5 3 0 1.7.5 3.3 1.5 4.7z"
					/>
				</svg>
			</div>
		{/each}
	</div>

	<!-- Main content -->
	<div class="relative z-10 flex min-h-screen items-center justify-center px-6">
		<div class="space-y-12 text-center">
			<h1
				class="mb-12 text-6xl font-black tracking-tight text-white/90 drop-shadow-lg md:text-8xl"
			>
				Diamond Lagoon
			</h1>

			<!-- The Jewel Button Floating Above -->
			<div class="perspective-1000 relative inline-block">
				<!-- Shadow on the lagoon floor -->
				<div
					class="absolute left-1/2 top-20 h-8 w-3/4 -translate-x-1/2 scale-y-50 transform rounded-full bg-black/40 blur-xl"
				/>

				<JeweledButton
					{tiltX}
					{tiltY}
					style="transform: rotateX({tiltY}deg) rotateY({tiltX}deg);"
				>
					Discover
				</JeweledButton>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes float-slow {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-20px) rotate(180deg);
		}
	}

	.animate-float-slow {
		animation: float-slow 15s ease-in-out infinite;
	}

	@keyframes ping {
		75%,
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	.animate-ping {
		animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
	}
</style>
