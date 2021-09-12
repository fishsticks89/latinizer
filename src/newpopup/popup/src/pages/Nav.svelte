<script>
	import Nav from "../ui/Nav.svelte";
    export let pages;
    export let pagestate;
</script>

<main>
	<Nav>
		<div class="navBar">
			{#each pages as title}
				<button class="navButton" on:click={pagestate(pages.indexOf(title))}>{title}</button>
			{/each}
		</div>
	</Nav>
</main>

<style>
	.navBar {
		width: 100%;
		height: 1px;
		display: flex;
		margin-bottom: 15%;
		flex-direction: row;
		justify-content: space-evenly;
		justify-items: center;
		position: relative;
		top: 3px;
	}
	.navButton {
		font-size: small;
        border: none;
        background-color: rgba(0, 0, 0, 0);
	}
    .navButton:focus {
		box-shadow: rgba(0, 155, 202, 0.377) 0px -14px 0px;
	}
</style>