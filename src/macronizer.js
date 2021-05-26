const char = ["&#x0101", "&#x0113", "&#x012B", "&#x014D", "&#x016B"];
const unmacronized = [65, 69, 73, 79, 85];
const code = ["257", "275", "299", "333", "363"];
var text = "";
const tips = ["<b>Tip:</b> use Alt+m to open the macronizer, use tab to navigate/press the letter of the macronized character, and enter to send the macron", "<b>Tip:</b> Don't like the Alt+m hotkey?<button class=\"notabutton\" id=\"settingsShortcuts\">Click here</button>to disable it"];
var tipsinit = 0;

// these tell whether or not the button listeners for that part of the extention are initialized
var macronlistenerinit = 0;
var dictionarylistenerinit = 0;
var nounchartlistenerinit = 0;
var verbendingslistenerinit = 0;
var feedbacklistenerinit = 0;

// pagestate tells what page you are on
var pagestate = 1;
var i;

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
  i = parseInt(random(0, tips.length));
  if (tip == null) {
    text = tips[i];
  } else {
    text = tip;
  } 
  document.getElementById("tip").innerHTML = text;

  // initialises listeners for tips
  if (tipsinit == 0){
    if (i == 1) {
      // sends the user to settings if they want to go
      document.getElementById('settingsShortcuts').addEventListener("click", () => {chrome.tabs.create({url: 'chrome://extensions/shortcuts'});});
      tipsinit = 1
    }
  }
}

// Sets the buttons div to the macronizer UI
function macronizer() {
  pagestate = 1;

  // destroys the UI
  document.getElementById("buttons").innerHTML = '';
  text = '';
  // Initialises the UI
  for (i = 0; i < char.length; i++) {
    text += "<button class=\"macronbutton\" id=\"" + code[i] + "\">" + char[i] + "</button>\n";
  }

  document.getElementById("buttons").innerHTML = text;

  // listens for button presses on the macron buttons
  for (let i = 0; i < char.length; i++) {
    document.getElementById(code[i]).addEventListener("click", () => macronize(char[i], code[i]));
  }
  // Sets the tip to a randon tip
  tip(null);

  // initializes the event listeners:
  if (macronlistenerinit == 0) {
    var pressedKeyCode;
    // listens for keypresses on the unmacronized keyboard charachter
    for (let i = 0; i < char.length; i++) {
      document.addEventListener("keypress", function (e) {
        pressedKeyCode = e.code.charCodeAt(3);
        // console.log(pressedKeyCode);

        if (pressedKeyCode == unmacronized[i]) {
          macronize(char[i], code[i]);
        }
    });
    }
  }
  macronlistenerinit = 1;
}

function dictionary() {
  document.getElementById("buttons").innerHTML = '<iframe id="whit" src="http://archives.nd.edu/words.html"></iframe>';
  pagestate = 2;

  if (dictionarylistenerinit == 0) {
    // init buttonlisteners
  }
  dictionarylistenerinit = 1;
}

function nounChart() {
  pagestate = 3;
  chrome.tabs.create({url: 'NounChart.html'});

  if (nounchartlistenerinit == 0) {
    // init buttonlisteners
  }
  nounchartlistenerinit = 1;
}

function verbEndings() {
  pagestate = 4;
  chrome.tabs.create({url: 'ActiveVerbEndings.html'});

  if (verbendingslistenerinit == 0) {
    // init buttonlisteners
  }
  verbendingslistenerinit = 1;
}

function feedback() {
  pagestate = 5;
  chrome.tabs.create({url: 'https://github.com/fishsticks89/Latinizer/issues/new'});

  if (feedbacklistenerinit == 0) {
    // init buttonlisteners
  }
  dictionarylistenerinit = 1;
}

// Initialises the navbar buttons
function nav() {
  document.getElementById("macronizerbutton").addEventListener("click", () => macronizer());
  document.addEventListener("keydown", (e) => {console.log(e.key); if (e.key == 'm') {macronizer()}});

  document.getElementById("dictionarybutton").addEventListener("click", () => dictionary());
  document.addEventListener("keydown", (e) => {console.log(e.key); if (e.key == 'd') {dictionary()}});

  document.getElementById('nounendingsbutton').addEventListener("click", () => {nounChart()});
  document.addEventListener("keydown", (e) => {console.log(e.key); if (e.key == 'n') {nounChart()}});

  document.getElementById('verbendingsbutton').addEventListener("click", () => {verbEndings()});
  document.addEventListener("keydown", (e) => {console.log(e.key); if (e.key == 'v') {verbEndings()}});

  document.getElementById('feedbackbutton').addEventListener("click", () => {feedback()});
  document.addEventListener("keydown", (e) => {console.log(e.key); if (e.key == 'f') {feedback()}});
}

// calls nav to initiate the navbar buttons
nav();
// calls macronizer to initiate the macronization button ui
macronizer();