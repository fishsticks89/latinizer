var char = ["&#x0101", "&#x0113", "&#x012B", "&#x014D", "&#x016B"];
var code = ["257", "275", "299", "333", "363"];
var text = "<table>\n<tr>\n";

// Initialises the UI
for (i = 0; i < char.length; i++) {
    text += "<button id=\"" + code[i] + "\">" + char[i] + "</button>\n";
}

text += "</tr>\n</table>\n";

document.getElementById("buttons").innerHTML = text;

// for when the buttons are pressed
function macronize(char, code) {
    // forwards message to background.js where it can be sent to the webpage
    chrome.runtime.sendMessage({char: char, code: code});

    // copies charachter to clipboard
    navigator.clipboard.writeText(String.fromCharCode(code)).then(() => {
      console.log('Macronized clipboard.');
    });
    document.getElementById("buttons").innerHTML = "<h1 id=\"copiedmessage\">Copied To Clipboard</h1>";
    setTimeout(() => { window.close(); }, 1000);
}

// listens for button presses
for (let i = 0; i < char.length; i++) {
  document.getElementById(code[i]).addEventListener("click", () => macronize(char[i], code[i]));
}