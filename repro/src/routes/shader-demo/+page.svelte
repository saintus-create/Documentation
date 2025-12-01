<script lang="ts">
	import ShaderLines from "$lib/components/ShaderLines.svelte";
</script>

<div
	class="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black"
>
	<ShaderLines />
	<span
		class="pointer-events-none z-10 whitespace-pre-wrap text-center text-7xl font-semibold leading-none tracking-tighter text-white"
	>
		Shader Lines
	</span>
</div>
