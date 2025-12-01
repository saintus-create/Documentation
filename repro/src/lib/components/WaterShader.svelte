<script lang="ts">
	import { onMount, onDestroy } from "svelte";

	let containerEl: HTMLDivElement;
	let renderer: any = null;
	let animationId: number | null = null;

	onMount(() => {
		const script = document.createElement("script");
		script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js";
		script.onload = () => {
			if (containerEl && (window as any).THREE) {
				initThreeJS();
			}
		};
		document.head.appendChild(script);

		return () => {
			// Cleanup handled in onDestroy
		};
	});

	onDestroy(() => {
		if (animationId) cancelAnimationFrame(animationId);
		if (renderer) renderer.dispose();
	});

	function initThreeJS() {
		if (!containerEl || !(window as any).THREE) return;
		const THREE = (window as any).THREE;

		containerEl.innerHTML = "";
		const camera = new THREE.Camera();
		camera.position.z = 1;
		const scene = new THREE.Scene();
		const geometry = new THREE.PlaneBufferGeometry(2, 2);

		const uniforms = {
			time: { type: "f", value: 1.0 },
			resolution: { type: "v2", value: new THREE.Vector2() },
		};

		const vertexShader = `void main() { gl_Position = vec4( position, 1.0 ); }`;

		// Water/Caustics Shader
		const fragmentShader = `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;

      void main( void ) {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= resolution.x / resolution.y;

        float t = time * 0.5;
        
        // Water layers
        vec2 p1 = p + vec2(cos(t*0.2), sin(t*0.3));
        vec2 p2 = p + vec2(sin(t*0.4), cos(t*0.2));
        
        float r = length(p);
        float a = atan(p.y, p.x);
        
        float v = 0.0;
        v += sin(p1.x*10.0 + t);
        v += sin(p1.y*10.0 + t);
        v += sin(p2.x*10.0 - t);
        v += sin(p2.y*10.0 - t);
        
        v *= 0.1; // Amplitude
        
        // Color - Cyan/Blue tint but mostly transparent
        vec3 col = vec3(0.4, 0.7, 1.0); // Cyan base
        
        // Caustic highlights
        float highlight = smoothstep(0.4, 0.6, v + 0.5);
        
        // Output: Color + Alpha
        // We want it semi-transparent
        gl_FragColor = vec4(col + highlight, 0.3 + highlight * 0.4); 
      }
    `;

		const material = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			transparent: true, // Enable transparency
		});

		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha enabled renderer
		renderer.setPixelRatio(window.devicePixelRatio);
		containerEl.appendChild(renderer.domElement);

		const onWindowResize = () => {
			const rect = containerEl.getBoundingClientRect();
			renderer.setSize(rect.width, rect.height);
			uniforms.resolution.value.x = renderer.domElement.width;
			uniforms.resolution.value.y = renderer.domElement.height;
		};

		onWindowResize();
		window.addEventListener("resize", onWindowResize, false);

		const animate = () => {
			animationId = requestAnimationFrame(animate);
			uniforms.time.value += 0.02;
			renderer.render(scene, camera);
		};

		animate();
	}
</script>

<div bind:this={containerEl} class="absolute h-full w-full" />
