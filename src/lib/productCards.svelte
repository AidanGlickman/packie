<script lang="ts">
	import type { ItemListing, Item } from './server/item';

	// add a prop fro the item of type ItemListing
	export let items: ItemListing[];
</script>

<div class="container mx-auto px-4">
	{#each items as item}
		<div class="grid grid-cols-4 h-40 border-2 rounded bg-slate-100">
			<div class="col-span-1 h-full">
				<img src={item.item.image} alt={item.item.name} class="object-scale-down max-h-40" />
			</div>
			<div class="col-span-2">
				<h1 class="text-lg text-red-600 font-mono">{item.item.name}</h1>
				<h5>${item.price}</h5>

				<a href={item.directLink}>{item.provider}</a>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
</style>
