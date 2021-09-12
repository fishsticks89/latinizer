<script>
	import Button from "../ui/Button.svelte";
    const char = ["&#x0101", "&#x0113", "&#x012B", "&#x014D", "&#x016B"];
    const unmacronized = [65, 69, 73, 79, 85];
    const code = ["257", "275", "299", "333", "363"];
    let pressedKeyCode;
    function send(e) {
        pressedKeyCode = e.keyCode;
        // console.log(pressedKeyCode);

        if (unmacronized.includes(pressedKeyCode)) {
            i = unmacronized.indexOf(pressedKeyCode)
            // forwards message to background.js where it can be sent to the webpage
            chrome.runtime.sendMessage({char: char[i], code: code[i]});
            setTimeout(() => { window.close(); }, 10);
        }
    }
</script>

<svelte:window on:keydown={send}/>

<main>
    <div id="buttons">
        {#each code as letter}
            <Button on:click={send(code[code.indexOf(letter)])}>{String.fromCharCode(letter)}</Button>
        {/each}
    </div>
</main>

<style>
    #buttons {
        display: flex;
        flex-direction: row;
		justify-content: space-evenly;
		justify-items: center;
    }
</style>