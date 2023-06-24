<script lang="ts">
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
	{#each form.body as item}
		<div style="display:flex;">
			<img src={item.image} alt={item.name} style="max-height: 20vh;" />
			<div>
				<h4>{item.name}</h4>
				<h5>{item.price}</h5>

				<a href={item.directLink}>{item.provider}</a>
			</div>
		</div>
		<hr />
	{/each}
{/if}
