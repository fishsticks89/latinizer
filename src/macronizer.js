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

// ------- FUNTIONS TO COMMUNICATE WITH BACKGROUND.JS ------

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

// ------ USEFUL FUNCTIONS ------

// Random # from range 
function random(mn, mx) { 
  return Math.random() * (mx - mn) + mn; 
} 

// ------ FUNCTIONS TO INITIALIZE UI ------

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
          if (pagestate == 1) {
            macronize(char[i], code[i]);
          }
        }
    });
    }
  }
  macronlistenerinit = 1;
}

function dictionary() {
  pagestate = 2;

  document.getElementById("buttons").innerHTML = '<div id="dictionarySearch"><form id="dictionaryForm"><input id="dictionaryFormField" type="text" /></form><button id="to Latin" class="dictionaryButton">to Latin</button><button id="to English" class="dictionaryButton">to English</button></div>';

  tip("Powered by Whitaker's Words!");

  if (dictionarylistenerinit == 0) {
    // init buttonlisteners
    document.getElementById("to Latin").addEventListener("click", () => {
      document.getElementById("buttons").innerHTML = '<iframe id="whit" src="https://archives.nd.edu/cgi-bin/wordz.pl?english=' + document.getElementById("dictionaryFormField").value + '"></iframe>';
      dictionarylistenerinit = 0;
      whitstyle();
    });
    
    document.getElementById("to English").addEventListener("click", () => {
      document.getElementById("buttons").innerHTML = '<iframe id="whit" src="https://archives.nd.edu/cgi-bin/wordz.pl?keyword=' + document.getElementById("dictionaryFormField").value + '"></iframe>';
      dictionarylistenerinit = 0;
      whitstyle();
    });
  }
  dictionarylistenerinit = 1;
}

function whitstyle() {
  document.getElementById('whit').contentDocument.body.innerHTML + document.getElementById('whit').contentDocument.body.innerHTML + '<link rel="stylesheet" href="popup.css" />';
  setTimeout(() => {
    console.log(document.getElementById('whit')/* do .substring or another way to only get whats in the body of the html, then overwrite the iframe with it */);
  }, 10);
}

// massive javascript object with all the endings
if (true) {
var nounEndings = {} /*'<button class="endingsButton" id="1">1st Declension</button><button class="endingsButton" id="2">2nd Declension</button><button class="endingsButton" id="3">3rd Declension</button><button class="endingsButton" id="4">4th Declension</button><button class="endingsButton" id="5">5th Declension</button>'*/;
  nounEndings.first = {} /*'<button class="endingsButton" id="1">nominative</button><button class="endingsButton" id="2">Genative</button><button class="endingsButton" id="3">Dative</button><button class="endingsButton" id="4">Accusative</button><button class="endingsButton" id="5">Ablative</button>'*/;
    nounEndings.first.nom = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.first.nom.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.nom.masc.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.first.nom.masc.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.first.nom.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.nom.fem.singular = '<h4 class="endingsButton">-a</h4>';
        nounEndings.first.nom.fem.plural = '<h4 class="endingsButton">-ae</h4>';

      nounEndings.first.nom.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.nom.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.first.nom.neuter.plural = '<h4 class="endingsButton"></h4>';


    nounEndings.first.gen = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.first.gen.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.gen.masc.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.first.gen.masc.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.first.gen.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.gen.fem.singular = '<h4 class="endingsButton">-ae</h4>';
        nounEndings.first.gen.fem.plural = '<h4 class="endingsButton">-ārum</h4>';

      nounEndings.first.gen.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.gen.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.first.gen.neuter.plural = '<h4 class="endingsButton"></h4>';


    nounEndings.first.dat = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.first.dat.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.dat.masc.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.first.dat.masc.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.first.dat.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.dat.fem.singular = '<h4 class="endingsButton">-ae</h4>';
        nounEndings.first.dat.fem.plural = '<h4 class="endingsButton"-īs</h4>';

      nounEndings.first.dat.neuter = '<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>';
        nounEndings.first.dat.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.first.dat.neuter.plural = '<h4 class="endingsButton"></h4>';


    nounEndings.first.acc = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.first.acc.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.acc.masc.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.first.acc.masc.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.first.acc.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.acc.fem.singular = '<h4 class="endingsButton">-am</h4>';
        nounEndings.first.acc.fem.plural = '<h4 class="endingsButton">-ās</h4>';

      nounEndings.first.acc.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.acc.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.first.acc.neuter.plural = '<h4 class="endingsButton"></h4>';


    nounEndings.first.abl = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.first.abl.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.abl.masc.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.first.abl.masc.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.first.abl.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.abl.fem.singular = '<h4 class="endingsButton">-ā</h4>';
        nounEndings.first.abl.fem.plural = '<h4 class="endingsButton">-īs</h4>';

      nounEndings.first.abl.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.abl.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.first.abl.neuter.plural = '<h4 class="endingsButton"></h4>';



  nounEndings.second = {} /*'<button class="endingsButton" id="1">nominative</button><button class="endingsButton" id="2">Genative</button><button class="endingsButton" id="3">Dative</button><button class="endingsButton" id="4">Accusative</button><button class="endingsButton" id="5">Ablative</button>'*/;
    nounEndings.second.nom = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.second.nom.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.nom.masc.singular = '<h4 class="endingsButton">-us</h4>';
        nounEndings.second.nom.masc.plural = '<h4 class="endingsButton">-ī</h4>';

      nounEndings.second.nom.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.nom.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.second.nom.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.second.nom.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.nom.neuter.singular = '<h4 class="endingsButton">-um</h4>';
        nounEndings.second.nom.neuter.plural = '<h4 class="endingsButton">-a</h4>';


    nounEndings.second.gen = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.second.gen.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.gen.masc.singular = '<h4 class="endingsButton">-ī</h4>';
        nounEndings.second.gen.masc.plural = '<h4 class="endingsButton">-ōrum</h4>';

      nounEndings.second.gen.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.gen.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.second.gen.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.second.gen.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.gen.neuter.singular = '<h4 class="endingsButton">-ī</h4>';
        nounEndings.second.gen.neuter.plural = '<h4 class="endingsButton">-ōrum</h4>';


    nounEndings.second.dat = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.second.dat.masc = '<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>';
        nounEndings.second.dat.masc.singular = '<h4 class="endingsButton">-ō</h4>';
        nounEndings.second.dat.masc.plural = '<h4 class="endingsButton">-īs</h4>';

      nounEndings.second.dat.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.dat.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.second.dat.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.second.dat.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.dat.neuter.singular = '<h4 class="endingsButton">-ō</h4>';
        nounEndings.second.dat.neuter.plural = '<h4 class="endingsButton">-īs</h4>';


    nounEndings.second.acc = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.second.acc.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.acc.masc.singular = '<h4 class="endingsButton">-um</h4>';
        nounEndings.second.acc.masc.plural = '<h4 class="endingsButton">-ōs</h4>';

      nounEndings.second.acc.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.acc.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.second.acc.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.second.acc.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.acc.neuter.singular = '<h4 class="endingsButton">-um</h4>';
        nounEndings.second.acc.neuter.plural = '<h4 class="endingsButton">-a</h4>';


    nounEndings.second.abl = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.second.abl.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.abl.masc.singular = '<h4 class="endingsButton">-ō</h4>';
        nounEndings.second.abl.masc.plural = '<h4 class="endingsButton">-īs</h4>';

      nounEndings.second.abl.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.abl.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.second.abl.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.second.abl.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.abl.neuter.singular = '<h4 class="endingsButton">-ō</h4>';
        nounEndings.second.abl.neuter.plural = '<h4 class="endingsButton">-īs</h4>';



  nounEndings.third = {} /*'<button class="endingsButton" id="1">nominative</button><button class="endingsButton" id="2">Genative</button><button class="endingsButton" id="3">Dative</button><button class="endingsButton" id="4">Accusative</button><button class="endingsButton" id="5">Ablative</button>'*/;
    nounEndings.third.nom = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.third.nom.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.nom.masc.singular = '<h4 class="endingsButton">(varies)</h4>';
        nounEndings.third.nom.masc.plural = '<h4 class="endingsButton">-ēs</h4>';

      nounEndings.third.nom.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.nom.fem.singular = '<h4 class="endingsButton">(varies)</h4>';
        nounEndings.third.nom.fem.plural = '<h4 class="endingsButton">-ēs</h4>';

      nounEndings.third.nom.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.nom.neuter.singular = '<h4 class="endingsButton">(varies)</h4>';
        nounEndings.third.nom.neuter.plural = '<h4 class="endingsButton">-a</h4>';


    nounEndings.third.gen = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.third.gen.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.gen.masc.singular = '<h4 class="endingsButton">-is</h4>';
        nounEndings.third.gen.masc.plural = '<h4 class="endingsButton">-um</h4>';

      nounEndings.third.gen.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.gen.fem.singular = '<h4 class="endingsButton">-is</h4>';
        nounEndings.third.gen.fem.plural = '<h4 class="endingsButton">-um</h4>';

      nounEndings.third.gen.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.gen.neuter.singular = '<h4 class="endingsButton">-is</h4>';
        nounEndings.third.gen.neuter.plural = '<h4 class="endingsButton">-um</h4>';


    nounEndings.third.dat = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.third.dat.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.dat.masc.singular = '<h4 class="endingsButton">-ī</h4>';
        nounEndings.third.dat.masc.plural = '<h4 class="endingsButton">-ibus</h4>';

      nounEndings.third.dat.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.dat.fem.singular = '<h4 class="endingsButton">-ī</h4>';
        nounEndings.third.dat.fem.plural = '<h4 class="endingsButton">-ibus</h4>';

      nounEndings.third.dat.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.dat.neuter.singular = '<h4 class="endingsButton">-ī</h4>';
        nounEndings.third.dat.neuter.plural = '<h4 class="endingsButton">-ibus</h4>';


    nounEndings.third.acc = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.third.acc.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.acc.masc.singular = '<h4 class="endingsButton">-em</h4>';
        nounEndings.third.acc.masc.plural = '<h4 class="endingsButton">-ēs</h4>';

      nounEndings.third.acc.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.acc.fem.singular = '<h4 class="endingsButton">-em</h4>';
        nounEndings.third.acc.fem.plural = '<h4 class="endingsButton">-ēs</h4>';

      nounEndings.third.acc.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.acc.neuter.singular = '<h4 class="endingsButton">(varies)</h4>';
        nounEndings.third.acc.neuter.plural = '<h4 class="endingsButton">-a</h4>';


    nounEndings.third.abl = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.third.abl.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.abl.masc.singular = '<h4 class="endingsButton">-e</h4>';
        nounEndings.third.abl.masc.plural = '<h4 class="endingsButton">-ibus</h4>';

      nounEndings.third.abl.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.abl.fem.singular = '<h4 class="endingsButton">-e</h4>';
        nounEndings.third.abl.fem.plural = '<h4 class="endingsButton">-ibus</h4>';

      nounEndings.third.abl.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.abl.neuter.singular = '<h4 class="endingsButton">-e</h4>';
        nounEndings.third.abl.neuter.plural = '<h4 class="endingsButton">-ibus</h4>';



  nounEndings.fourth = {} /*'<button class="endingsButton" id="1">nominative</button><button class="endingsButton" id="2">Genative</button><button class="endingsButton" id="3">Dative</button><button class="endingsButton" id="4">Accusative</button><button class="endingsButton" id="5">Ablative</button>'*/;
    nounEndings.fourth.nom = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fourth.nom.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.nom.masc.singular = '<h4 class="endingsButton">-us</h4>';
        nounEndings.fourth.nom.masc.plural = '<h4 class="endingsButton">-ūs</h4>';

      nounEndings.fourth.nom.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.nom.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fourth.nom.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fourth.nom.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.nom.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fourth.nom.neuter.plural = '<h4 class="endingsButton"></h4>';


    nounEndings.fourth.gen = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fourth.gen.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.gen.masc.singular = '<h4 class="endingsButton">-ūs</h4>';
        nounEndings.fourth.gen.masc.plural = '<h4 class="endingsButton">-uum</h4>';

      nounEndings.fourth.gen.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.gen.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fourth.gen.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fourth.gen.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.gen.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fourth.gen.neuter.plural = '<h4 class="endingsButton"></h4>';


    nounEndings.fourth.dat = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fourth.dat.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.dat.masc.singular = '<h4 class="endingsButton">-uī</h4>';
        nounEndings.fourth.dat.masc.plural = '<h4 class="endingsButton">ibus</h4>';

      nounEndings.fourth.dat.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.dat.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fourth.dat.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fourth.dat.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.dat.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fourth.dat.neuter.plural = '<h4 class="endingsButton"></h4>';


    nounEndings.fourth.acc = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fourth.acc.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.acc.masc.singular = '<h4 class="endingsButton">-um</h4>';
        nounEndings.fourth.acc.masc.plural = '<h4 class="endingsButton">-ūs</h4>';

      nounEndings.fourth.acc.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.acc.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fourth.acc.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fourth.acc.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.acc.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fourth.acc.neuter.plural = '<h4 class="endingsButton"></h4>';


    nounEndings.fourth.abl = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fourth.abl.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.abl.masc.singular = '<h4 class="endingsButton">-ū</h4>';
        nounEndings.fourth.abl.masc.plural = '<h4 class="endingsButton">-ibus</h4>';

      nounEndings.fourth.abl.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.abl.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fourth.abl.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fourth.abl.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.abl.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fourth.abl.neuter.plural = '<h4 class="endingsButton"></h4>';
    


  nounEndings.fifth = {} /*'<button class="endingsButton" id="1">nominative</button><button class="endingsButton" id="2">Genative</button><button class="endingsButton" id="3">Dative</button><button class="endingsButton" id="4">Accusative</button><button class="endingsButton" id="5">Ablative</button>'*/;
    nounEndings.fifth.nom = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fifth.nom.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.nom.masc.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.nom.masc.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fifth.nom.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.nom.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.nom.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fifth.nom.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.nom.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.nom.neuter.plural = '<h4 class="endingsButton"></h4>';


    nounEndings.fifth.gen = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fifth.gen.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.gen.masc.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.gen.masc.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fifth.gen.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.gen.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.gen.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fifth.gen.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.gen.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.gen.neuter.plural = '<h4 class="endingsButton"></h4>';


    nounEndings.fifth.dat = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fifth.dat.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.dat.masc.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.dat.masc.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fifth.dat.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.dat.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.dat.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fifth.dat.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.dat.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.dat.neuter.plural = '<h4 class="endingsButton"></h4>';


    nounEndings.fifth.acc = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fifth.acc.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.acc.masc.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.acc.masc.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fifth.acc.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.acc.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.acc.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fifth.acc.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.acc.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.acc.neuter.plural = '<h4 class="endingsButton"></h4>';


    nounEndings.fifth.abl = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fifth.abl.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.abl.masc.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.abl.masc.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fifth.abl.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.abl.fem.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.abl.fem.plural = '<h4 class="endingsButton"></h4>';

      nounEndings.fifth.abl.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.abl.neuter.singular = '<h4 class="endingsButton"></h4>';
        nounEndings.fifth.abl.neuter.plural = '<h4 class="endingsButton"></h4>';
}

function nounChart() {
  pagestate = 3;
  chrome.tabs.create({url: 'NounChart.html'});
  // have it list the children of the current object as buttons 
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
  document.addEventListener("keydown", (e) => {/*console.log(e.key);*/ if (e.key == 'm' && pagestate != 2) {macronizer()}});

  document.getElementById("dictionarybutton").addEventListener("click", () => dictionary());
  document.addEventListener("keydown", (e) => {/*console.log(e.key);*/ if (e.key == 'd' && pagestate != 2) {dictionary()}});

  document.getElementById('nounendingsbutton').addEventListener("click", () => {nounChart()});
  document.addEventListener("keydown", (e) => {/*console.log(e.key);*/ if (e.key == 'n' && pagestate != 2) {nounChart()}});

  document.getElementById('verbendingsbutton').addEventListener("click", () => {verbEndings()});
  document.addEventListener("keydown", (e) => {/*console.log(e.key);*/ if (e.key == 'v' && pagestate != 2) {verbEndings()}});

  document.getElementById('feedbackbutton').addEventListener("click", () => {feedback()});
  document.addEventListener("keydown", (e) => {/*console.log(e.key);*/ if (e.key == 'f' && pagestate != 2) {feedback()}});
}

// ------ CALLS FUNCTIONS TO INITIALIZE UI ------

// calls nav to initiate the navbar buttons
nav();
// calls macronizer to initiate the macronization button ui
macronizer();