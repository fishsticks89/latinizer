var char = ["&#x0101", "&#x0113", "&#x012B", "&#x014D", "&#x016B"];
var code = ["257", "275", "299", "333", "363"];
var text = "";
const tips = ["<b>Tip:</b> use Alt+m to open the macronizer and (use tab to navigate/press the letter of the macronized character), and enter to send the macron", "<b>Tip:</b> Don't like the Alt+m hotkey? <a href=\"chrome://extensions/shortcuts\">click here</a> to disable it"];
var pagestate = 1;

// forwards keypress to background.js when the buttons are pressed
function macronize(char, code) {
    // makes sure you are on the macronizer page \/
    if (pagestate = 1) {
      // forwards message to background.js where it can be sent to the webpage
      chrome.runtime.sendMessage({char: char, code: code});
      setTimeout(() => { window.close(); }, 10);
    }
}

// copies charachter to clipboard
function clipboard(code) {
  navigator.clipboard.writeText(String.fromCharCode(code)).then(() => {
    console.log('Macronized clipboard.');
  });
  // notifies user
  document.getElementById("buttons").innerHTML = "<h1 id=\"copiedmessage\">Copied To Clipboard</h1>";
  setTimeout(() => { window.close(); }, 1000);
}

// Random # from range 
function random(mn, mx) { 
  return Math.random() * (mx - mn) + mn; 
} 

function tip(tip) {
  if (tip == null) {
    text = tips[parseInt(random(0, tips.length))];
  } else {
    text = tip;
  } 
  document.getElementById("tip").innerHTML = text;
}

function macronizer() {
  pagestate = 1;
  // Initialises the UI
  for (i = 0; i < char.length; i++) {
    text += "<button class=\"macronbutton\" id=\"" + code[i] + "\">" + char[i] + "</button>\n";
  }

  document.getElementById("buttons").innerHTML = text;

  // listens for button presses on the macron buttons
  for (let i = 0; i < char.length; i++) {
    document.getElementById(code[i]).addEventListener("click", () => macronize(char[i], code[i]));
  }
  tip(null);
}

macronizer();