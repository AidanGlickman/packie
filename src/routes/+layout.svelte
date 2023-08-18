<script>
	import '../app.css';
	import userloc from '$lib/userloc';
	import { browser } from '$app/environment';

	if (browser) {
		console.log('TSET');
		navigator.geolocation.getCurrentPosition((pos) => {
			$userloc = [pos.coords.latitude, pos.coords.longitude];
		});
	}
</script>

<h1 class="text-3xl font-bold underline">Packie</h1>
<p>Current Location: {$userloc}</p>
<slot />
