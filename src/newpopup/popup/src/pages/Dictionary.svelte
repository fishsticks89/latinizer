<script>
	import Button from "../ui/Button-Small.svelte";
    import Form from "../ui/Form.svelte";
    let form = '';
    let search = [true, true];
    function searchize(type) {
        // get setting for latin-is-fun and wiktionary
        search = [false, type];
    }
</script>

<main>
    <div id="container">
        {#if search[0]}
            <Form bind:textContent={form} />
            <Button on:click={() => {searchize("latin")}}>to English</Button>
            <Button on:click={() => {searchize("english")}}>to Latin</Button>
        {:else}
            <!-- svelte-ignore a11y-missing-attribute -->
            <iframe src={"https://archives.nd.edu/cgi-bin/wordz.pl?" + search[1] + "=" + form} frameborder="0"></iframe>
        {/if}
    </div>
</main>

<style>
    #container {
        display: flex;
        flex-direction: row;
		justify-content: space-evenly;
		justify-items: center;
        margin-left: 5%;
        margin-right: 5%;
    }
</style>