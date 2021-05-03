// OLD AND NOT IN BUILD
function macronize(char, code) {
    // forwards message to background.js where it can be sent to the webpage
    chrome.runtime.sendMessage({char: char, code: code});

    // copies charachter to clipboard
    navigator.clipboard.writeText(fromCharCode(iden.code)).then(() => {
      console.log('Macronized clipboard.');
    });
  document.getElementById("buttons").innerHTML = "<h1 id=\"copiedmessage\">Copied To Clipboard</h1>";
    // setTimeout(() => { window.close(); }, 20);
}

for (let i = 0; i < char.length; i++) {
  document.getElementById(code[i]).addEventListener("click", () => macronize(char[i], code[i]));
}