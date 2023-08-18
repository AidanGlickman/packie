<script lang="ts">
	import ProductCards from '$lib/productCards.svelte';
	import type { ItemListing } from '$lib/server/item';
	let items: ItemListing[] = Array(9).fill({
		item: {
			name: 'Item Name',
			image: '/two-bottles.jpg',
			ids: 'dummy1234'
		},
		price: 99.99,
		directLink: '/',
		provider: 'Example Wines Co.',
		size: {
			measure: 'ml', // the volume measure, e.g. ml, g, kg
			quantity: 1, // number of units
			pack: 'Single', // the pack size, e.g. 6pk
			unit: 'Bottle' // the unit, e.g. bottle, can
		}
	});
</script>

<h1>Welcome to Packie</h1>

<!-- after submit, display the results of the action -->

<!-- add a for loop -->
<ProductCards {items} />
