<script>
	  import Macrons from "./pages/Macrons.svelte";
	  import Dictionary from "./pages/Dictionary.svelte";
	  import Nav from "./pages/Nav.svelte";
	  import Tip from "./pages/Tip.svelte";
	  import Hor from "./ui/Hor.svelte";
	  import Form from "./ui/Form.svelte";
	  import Button from "./ui/Button.svelte";
	  import Small from "./ui/Button-Small.svelte";
	  let pagestate = 0;
	  let pages = ['macronizer', 'dictionary', 'noun endings', 'verb endings', 'feedback']
</script>

<main>
	<Nav pagestate={(e) => {pagestate = e}} pages={pages}/>
	<div id='main'>
		{#if pagestate == 0}
			<Macrons></Macrons>
		{:else if pagestate == 1}
			<Dictionary></Dictionary>
			<Tip>Powered By Whitaker's Works!</Tip>
		{:else if pagestate == 2}
		{:else if pagestate == 3}

		{:else if pagestate == 4}
			
		{:else}
			<b>ERROR</b>
		{/if}
	</div>
	{#if pagestate != 1}
		<Tip tip={true}></Tip>
	{/if}
</main>

<style>
</style>