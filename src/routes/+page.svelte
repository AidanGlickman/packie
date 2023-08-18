<script lang="ts">
	import ProductCard from '$lib/productCards.svelte';
	import type { ItemListing } from '$lib/server/item';
	export let form: { success: boolean; body: ItemListing[] };
</script>

<h1>Welcome to Packie</h1>
<form method="POST">
	<label for="product">Product:</label>
	<input type="text" name="term" placeholder="Mellow Corn" />
	<button type="submit">Search</button>
</form>

<!-- after submit, display the results of the action -->

{#if form?.success}
	<ProductCard items={form.body} />
{/if}
