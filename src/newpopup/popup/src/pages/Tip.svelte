<script>
	import Nav from "../ui/Nav.svelte";
	import link from "../functions/link.js";
    export let tip = false;
	let rand = Math.random() * (3 - 0) + 0;
	rand = parseInt(rand);
</script>

<main>
	<div id='spacer'></div>
	<Nav>
		<div id="tip">
			{#if tip}
				<b>Tip: </b>
				{#if rand == 0}
				use Alt+m to open the macronizer!
				{:else if rand == 1}
				Don't like the Alt+m hotkey? <button class="notabutton" style="background-color: rgba(0, 0, 0, 0); border: none" on:click={link('chrome://extensions/shortcuts')}>Click here</button> to disable it
				{:else if rand == 2}
				Click a to type ā once you've opened the macronizer
				{:else}
				Error
				{/if}
			{/if}
			<slot/>
		</div>
	</Nav>
</main>

<style>
	.notabutton {
		font-size: inherit;
		color: inherit;
		font-family: inherit;
		height: fit-content;
		width: fit-content;
		position: relative;
		top: 0px;
		margin: 0px;
		padding: 0px;
		font-weight: inherit;
		text-decoration: underline;
	}
	#spacer {
		height: 5px;
	}
	#tip {
		width: 100%;
		height: 100%;
		margin-bottom: 15%;
		text-align: center;
		position: relative;
		top: 7px;
	}
</style>