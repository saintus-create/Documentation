<script lang="ts">
	import * as Card from "$lib/registry/ui/card";
	import { Button } from "$lib/registry/ui/button";
</script>

<div class="pricing-section">
	<div class="hero-text">
		<h1>
			<span class="solid">Simple</span>
			<span class="outlined">Pricing</span>
		</h1>
		<p class="subtitle">
			Choose the perfect plan for your needs and start optimizing your workflow today
		</p>
	</div>

	<div class="pricing-grid">
		<Card.Root>
			<Card.Header>
				<Card.Title>Starter</Card.Title>
				<Card.Description>Perfect for individuals</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="price">
					<span class="amount">$9</span>
					<span class="period">/month</span>
				</div>
				<ul class="features">
					<li>Up to 10 projects</li>
					<li>Basic analytics</li>
					<li>24/7 support</li>
				</ul>
			</Card.Content>
			<Card.Footer>
				<Button class="w-full">Get Started</Button>
			</Card.Footer>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Pro</Card.Title>
				<Card.Description>For growing teams</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="price">
					<span class="amount">$29</span>
					<span class="period">/month</span>
				</div>
				<ul class="features">
					<li>Unlimited projects</li>
					<li>Advanced analytics</li>
					<li>Priority support</li>
					<li>Custom integrations</li>
				</ul>
			</Card.Content>
			<Card.Footer>
				<Button class="w-full">Get Started</Button>
			</Card.Footer>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title>Enterprise</Card.Title>
				<Card.Description>For large organizations</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="price">
					<span class="amount">Custom</span>
				</div>
				<ul class="features">
					<li>Everything in Pro</li>
					<li>Dedicated support</li>
					<li>SLA guarantee</li>
					<li>Custom development</li>
				</ul>
			</Card.Content>
			<Card.Footer>
				<Button class="w-full" variant="outline">Contact Sales</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>

<style>
	.pricing-section {
		min-height: 100vh;
		background: hsl(var(--background));
		padding: 4rem 2rem;
	}

	.hero-text {
		text-align: center;
		margin-bottom: 4rem;
	}

	.hero-text h1 {
		font-size: clamp(3rem, 8vw, 5rem);
		font-weight: 700;
		line-height: 1.1;
		margin: 0 0 1rem 0;
	}

	.hero-text .solid {
		color: hsl(var(--foreground));
	}

	.hero-text .outlined {
		color: transparent;
		-webkit-text-stroke: 2px hsl(var(--foreground));
		text-stroke: 2px hsl(var(--foreground));
	}

	.subtitle {
		color: hsl(var(--muted-foreground));
		font-size: clamp(1rem, 2vw, 1.25rem);
		max-width: 600px;
		margin: 0 auto;
	}

	.pricing-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.price {
		margin-bottom: 2rem;
	}

	.price .amount {
		font-size: 3rem;
		font-weight: 700;
		color: hsl(var(--foreground));
	}

	.price .period {
		color: hsl(var(--muted-foreground));
		font-size: 1.25rem;
	}

	.features {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.features li {
		color: hsl(var(--muted-foreground));
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.features li::before {
		content: "✓";
		color: hsl(var(--primary));
		font-weight: 700;
	}
</style>
