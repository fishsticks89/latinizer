const char = ["&#x0101", "&#x0113", "&#x012B", "&#x014D", "&#x016B"];
const unmacronized = [65, 69, 73, 79, 85];
const code = ["257", "275", "299", "333", "363"];
var text = "";
const tips = ["<b>Tip:</b> use Alt+m to open the macronizer!", "<b>Tip:</b> Don't like the Alt+m hotkey?<button class=\"notabutton\" id=\"settingsShortcuts\">Click here</button>to disable it", "<b>Tip:</b> Click a to type ā once you've opened the macronizer"];
var tipsinit = 0;

// these tell whether or not the button listeners for that part of the extention are initialized
var macronlistenerinit = 0;
var dictionarylistenerinit = 0;
var whitlistenersinit = 0;
var nounchartlistenerinit = 0;
var verbendingslistenerinit = 0;
var feedbacklistenerinit = 0;

// pagestate tells what page you are on
var pagestate = 1;
var i;

//*FUNCTIONS TO COMMUNICATE WITH BACKGROUND.JS*

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

//*USEFUL FUNCTIONS*

// Random # from range 
function random(mn, mx) { 
  return Math.random() * (mx - mn) + mn;
} 

//*FUNCTIONS TO INITIALIZE UI*

function tip(tip) {
  i = parseInt(random(0, tips.length));
  if (tip == null) {
    text = tips[i];
  } else {
    text = tip;
    i = 0;
  } 
  document.getElementById("tip").innerHTML = text;

  // initialises listeners for tips
  if (tipsinit == 0){
    if (i == 1) {
      // sends the user to settings if they want to go
      document.getElementById('settingsShortcuts').addEventListener("click", () => {chrome.tabs.create({url: 'chrome://extensions/shortcuts'});});
      tipsinit = 1;
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
      document.getElementById("buttons").innerHTML = '<iframe id="whit" src="https://archives.nd.edu/cgi-bin/wordz.pl?english=' + document.getElementById("dictionaryFormField").value + '"></iframe><button class="backButton" id="dictionaryButton>back</button>';
      dictionarylistenerinit = 0; 
      whitinit();
    });
    
    document.getElementById("to English").addEventListener("click", () => {
      document.getElementById("buttons").innerHTML = '<iframe id="whit" src="https://archives.nd.edu/cgi-bin/wordz.pl?keyword=' + document.getElementById("dictionaryFormField").value + '"></iframe><button class="backButton" id="dictionaryButton>back</button>';
      dictionarylistenerinit = 0;
      whitinit();
    });

  }
  dictionarylistenerinit = 1;
}

function whitinit() {
  // document.getElementById('whit').contentDocument.body.innerHTML + document.getElementById('whit').contentDocument.body.innerHTML + '<link rel="stylesheet" href="popup.css" />';
  if (whitlistenersinit == 0) {
    document.getElementById('whit').onload = () => {console.log('loaded')};
    console.log(document.getElementById('whit').contentWindow.document.body.innerHTML /* do .substring or another way to only get whats in the body of the html, then overwrite the iframe with it */);
    whitlistenersinit = 1;
  }
}

// massive javascript object with all the endings
if (true) {
var nounEndings = {} /*'<button class="endingsButton" id="1">1st Declension</button><button class="endingsButton" id="2">2nd Declension</button><button class="endingsButton" id="3">3rd Declension</button><button class="endingsButton" id="4">4th Declension</button><button class="endingsButton" id="5">5th Declension</button>'*/;
  nounEndings.first = {} /*'<button class="endingsButton" id="1">nominative</button><button class="endingsButton" id="2">Genative</button><button class="endingsButton" id="3">Dative</button><button class="endingsButton" id="4">Accusative</button><button class="endingsButton" id="5">Ablative</button>'*/;
    nounEndings.first.nom = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.first.nom.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.nom.masc.singular = '';
        nounEndings.first.nom.masc.plural = '';

      nounEndings.first.nom.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.nom.fem.singular = '-a';
        nounEndings.first.nom.fem.plural = '-ae';

      nounEndings.first.nom.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.nom.neuter.singular = 'N/A';
        nounEndings.first.nom.neuter.plural = 'N/A';


    nounEndings.first.gen = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.first.gen.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.gen.masc.singular = '';
        nounEndings.first.gen.masc.plural = '';

      nounEndings.first.gen.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.gen.fem.singular = '-ae';
        nounEndings.first.gen.fem.plural = '-ārum';

      nounEndings.first.gen.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.gen.neuter.singular = 'N/A';
        nounEndings.first.gen.neuter.plural = 'N/A';


    nounEndings.first.dat = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.first.dat.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.dat.masc.singular = '';
        nounEndings.first.dat.masc.plural = '';

      nounEndings.first.dat.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.dat.fem.singular = '-ae';
        nounEndings.first.dat.fem.plural = '-īs';

      nounEndings.first.dat.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.dat.neuter.singular = 'N/A';
        nounEndings.first.dat.neuter.plural = 'N/A';


    nounEndings.first.acc = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.first.acc.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.acc.masc.singular = '';
        nounEndings.first.acc.masc.plural = '';

      nounEndings.first.acc.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.acc.fem.singular = '-am';
        nounEndings.first.acc.fem.plural = '-ās';

      nounEndings.first.acc.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.acc.neuter.singular = 'N/A';
        nounEndings.first.acc.neuter.plural = 'N/A';


    nounEndings.first.abl = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.first.abl.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.abl.masc.singular = '';
        nounEndings.first.abl.masc.plural = '';

      nounEndings.first.abl.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.abl.fem.singular = '-ā';
        nounEndings.first.abl.fem.plural = '-īs';

      nounEndings.first.abl.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.first.abl.neuter.singular = 'N/A';
        nounEndings.first.abl.neuter.plural = 'N/A';



  nounEndings.second = {} /*'<button class="endingsButton" id="1">nominative</button><button class="endingsButton" id="2">Genative</button><button class="endingsButton" id="3">Dative</button><button class="endingsButton" id="4">Accusative</button><button class="endingsButton" id="5">Ablative</button>'*/;
    nounEndings.second.nom = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.second.nom.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.nom.masc.singular = '-us';
        nounEndings.second.nom.masc.plural = '-ī';

      nounEndings.second.nom.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.nom.fem.singular = '-us';
        nounEndings.second.nom.fem.plural = '-ī';

      nounEndings.second.nom.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.nom.neuter.singular = '-um';
        nounEndings.second.nom.neuter.plural = '-a';


    nounEndings.second.gen = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.second.gen.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.gen.masc.singular = '-ī';
        nounEndings.second.gen.masc.plural = '-ōrum';

      nounEndings.second.gen.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.gen.fem.singular = '-ī';
        nounEndings.second.gen.fem.plural = '-ōrum';

      nounEndings.second.gen.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.gen.neuter.singular = '-ī';
        nounEndings.second.gen.neuter.plural = '-ōrum';


    nounEndings.second.dat = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.second.dat.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.dat.masc.singular = '-ō';
        nounEndings.second.dat.masc.plural = '-īs';

      nounEndings.second.dat.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.dat.fem.singular = '-ō';
        nounEndings.second.dat.fem.plural = '-īs';

      nounEndings.second.dat.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.dat.neuter.singular = '-ō';
        nounEndings.second.dat.neuter.plural = '-īs';


    nounEndings.second.acc = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.second.acc.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.acc.masc.singular = '-um';
        nounEndings.second.acc.masc.plural = '-ōs';

      nounEndings.second.acc.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.acc.fem.singular = '-um';
        nounEndings.second.acc.fem.plural = '-ōs';

      nounEndings.second.acc.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.acc.neuter.singular = '-um';
        nounEndings.second.acc.neuter.plural = '-a';


    nounEndings.second.abl = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.second.abl.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.abl.masc.singular = '-ō';
        nounEndings.second.abl.masc.plural = '-īs';

      nounEndings.second.abl.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.abl.fem.singular = '-ō';
        nounEndings.second.abl.fem.plural = '-īs';

      nounEndings.second.abl.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.second.abl.neuter.singular = '-ō';
        nounEndings.second.abl.neuter.plural = '-īs';



  nounEndings.third = {} /*'<button class="endingsButton" id="1">nominative</button><button class="endingsButton" id="2">Genative</button><button class="endingsButton" id="3">Dative</button><button class="endingsButton" id="4">Accusative</button><button class="endingsButton" id="5">Ablative</button>'*/;
    nounEndings.third.nom = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.third.nom.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.nom.masc.singular = '(varies)';
        nounEndings.third.nom.masc.plural = '-ēs';

      nounEndings.third.nom.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.nom.fem.singular = '(varies)';
        nounEndings.third.nom.fem.plural = '-ēs';

      nounEndings.third.nom.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.nom.neuter.singular = '(varies)';
        nounEndings.third.nom.neuter.plural = '-a';


    nounEndings.third.gen = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.third.gen.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.gen.masc.singular = '-is';
        nounEndings.third.gen.masc.plural = '-um';

      nounEndings.third.gen.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.gen.fem.singular = '-is';
        nounEndings.third.gen.fem.plural = '-um';

      nounEndings.third.gen.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.gen.neuter.singular = '-is';
        nounEndings.third.gen.neuter.plural = '-um';


    nounEndings.third.dat = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.third.dat.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.dat.masc.singular = '-ī';
        nounEndings.third.dat.masc.plural = '-ibus';

      nounEndings.third.dat.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.dat.fem.singular = '-ī';
        nounEndings.third.dat.fem.plural = '-ibus';

      nounEndings.third.dat.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.dat.neuter.singular = '-ī';
        nounEndings.third.dat.neuter.plural = '-ibus';


    nounEndings.third.acc = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.third.acc.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.acc.masc.singular = '-em';
        nounEndings.third.acc.masc.plural = '-ēs';

      nounEndings.third.acc.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.acc.fem.singular = '-em';
        nounEndings.third.acc.fem.plural = '-ēs';

      nounEndings.third.acc.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.acc.neuter.singular = '(varies)';
        nounEndings.third.acc.neuter.plural = '-a';


    nounEndings.third.abl = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.third.abl.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.abl.masc.singular = '-e';
        nounEndings.third.abl.masc.plural = '-ibus';

      nounEndings.third.abl.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.abl.fem.singular = '-e';
        nounEndings.third.abl.fem.plural = '-ibus';

      nounEndings.third.abl.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.third.abl.neuter.singular = '-e';
        nounEndings.third.abl.neuter.plural = '-ibus';



  nounEndings.fourth = {} /*'<button class="endingsButton" id="1">nominative</button><button class="endingsButton" id="2">Genative</button><button class="endingsButton" id="3">Dative</button><button class="endingsButton" id="4">Accusative</button><button class="endingsButton" id="5">Ablative</button>'*/;
    nounEndings.fourth.nom = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fourth.nom.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.nom.masc.singular = '-us';
        nounEndings.fourth.nom.masc.plural = '-ūs';

      nounEndings.fourth.nom.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.nom.fem.singular = '-us';
        nounEndings.fourth.nom.fem.plural = '-ūs';

      nounEndings.fourth.nom.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.nom.neuter.singular = '-ū';
        nounEndings.fourth.nom.neuter.plural = '-ua';


    nounEndings.fourth.gen = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fourth.gen.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.gen.masc.singular = '-ūs';
        nounEndings.fourth.gen.masc.plural = '-uum';

      nounEndings.fourth.gen.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.gen.fem.singular = '-ūs';
        nounEndings.fourth.gen.fem.plural = '-uum';

      nounEndings.fourth.gen.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.gen.neuter.singular = '-ūs';
        nounEndings.fourth.gen.neuter.plural = '-uum';


    nounEndings.fourth.dat = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fourth.dat.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.dat.masc.singular = '-uī';
        nounEndings.fourth.dat.masc.plural = 'ibus';

      nounEndings.fourth.dat.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.dat.fem.singular = '-uī';
        nounEndings.fourth.dat.fem.plural = 'ibus';

      nounEndings.fourth.dat.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.dat.neuter.singular = '-ū';
        nounEndings.fourth.dat.neuter.plural = '-ibus';


    nounEndings.fourth.acc = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fourth.acc.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.acc.masc.singular = '-um';
        nounEndings.fourth.acc.masc.plural = '-ūs';

      nounEndings.fourth.acc.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.acc.fem.singular = '-um';
        nounEndings.fourth.acc.fem.plural = '-ūs';

      nounEndings.fourth.acc.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.acc.neuter.singular = '-ū';
        nounEndings.fourth.acc.neuter.plural = '-ua';


    nounEndings.fourth.abl = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fourth.abl.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.abl.masc.singular = '-ū';
        nounEndings.fourth.abl.masc.plural = '-ibus';

      nounEndings.fourth.abl.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.abl.fem.singular = '-um';
        nounEndings.fourth.abl.fem.plural = '-ūs';

      nounEndings.fourth.abl.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fourth.abl.neuter.singular = '-ū';
        nounEndings.fourth.abl.neuter.plural = '-ibus';
    


  nounEndings.fifth = {} /*'<button class="endingsButton" id="1">nominative</button><button class="endingsButton" id="2">Genative</button><button class="endingsButton" id="3">Dative</button><button class="endingsButton" id="4">Accusative</button><button class="endingsButton" id="5">Ablative</button>'*/;
    nounEndings.fifth.nom = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fifth.nom.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.nom.masc.singular = '-ēs';
        nounEndings.fifth.nom.masc.plural = '-ēs';

      nounEndings.fifth.nom.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.nom.fem.singular = '-ēs';
        nounEndings.fifth.nom.fem.plural = '-ēs';

      nounEndings.fifth.nom.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.nom.neuter.singular = 'N/A';
        nounEndings.fifth.nom.neuter.plural = 'N/A';


    nounEndings.fifth.gen = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fifth.gen.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.gen.masc.singular = '-eī';
        nounEndings.fifth.gen.masc.plural = '-ērum';

      nounEndings.fifth.gen.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.gen.fem.singular = '-eī';
        nounEndings.fifth.gen.fem.plural = '-ērum';

      nounEndings.fifth.gen.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.gen.neuter.singular = 'N/A';
        nounEndings.fifth.gen.neuter.plural = 'N/A';


    nounEndings.fifth.dat = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fifth.dat.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.dat.masc.singular = '-eī';
        nounEndings.fifth.dat.masc.plural = '-ēbus';

      nounEndings.fifth.dat.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.dat.fem.singular = '-eī';
        nounEndings.fifth.dat.fem.plural = '-ēbus';

      nounEndings.fifth.dat.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.dat.neuter.singular = 'N/A';
        nounEndings.fifth.dat.neuter.plural = 'N/A';


    nounEndings.fifth.acc = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fifth.acc.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.acc.masc.singular = '-em';
        nounEndings.fifth.acc.masc.plural = '-ēs';

      nounEndings.fifth.acc.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.acc.fem.singular = '-em';
        nounEndings.fifth.acc.fem.plural = '-ēs';

      nounEndings.fifth.acc.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.acc.neuter.singular = 'N/A';
        nounEndings.fifth.acc.neuter.plural = 'N/A';


    nounEndings.fifth.abl = {} /*'<button class="endingsButton" id="1">Masculine</button><button class="endingsButton" id="2">Feminine</button><button class="endingsButton" id="3">neuter</button>'*/;
      nounEndings.fifth.abl.masc = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.abl.masc.singular = '-ē';
        nounEndings.fifth.abl.masc.plural = '-ēbus';

      nounEndings.fifth.abl.fem = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.abl.fem.singular = '-ē';
        nounEndings.fifth.abl.fem.plural = '-ēbus';

      nounEndings.fifth.abl.neuter = {} /*'<button class="endingsButton" id="1">Singular</button><button class="endingsButton" id="2">Plural</button>'*/;
        nounEndings.fifth.abl.neuter.singular = 'N/A';
        nounEndings.fifth.abl.neuter.plural = 'N/A';
}

function nounChartInit() {
  document.getElementById("nounEndingsButton1").addEventListener("click", () => {endingsButtonPress(1);});
  document.getElementById("nounEndingsButton2").addEventListener("click", () => {endingsButtonPress(2);});
  document.getElementById("nounEndingsButton3").addEventListener("click", () => {endingsButtonPress(3);});
  document.getElementById("nounEndingsButton4").addEventListener("click", () => {endingsButtonPress(4);});
  document.getElementById("nounEndingsButton5").addEventListener("click", () => {endingsButtonPress(5);});
}

var nounEndingsActive = nounEndings;

function endingsButtonPress(num) {
  nounEndingsActive = Object.values(nounEndingsActive)[num - 1];
  console.log(nounEndingsActive);

  // sets i to 1 so it can be used to get iterations in .map
  let i = 1;

  if (Object.values(nounEndingsActive)[0] != '-') {
    // destroys current ui
    document.getElementById("buttons").innerHTML = '';

    Object.keys(nounEndingsActive).map(buttontitle => {
      document.getElementById("buttons").innerHTML += '<button id="nounEndingsButton' + i + '" class="endingsButton">' + buttontitle +'</button>';
      i += 1;
    });
  } else if (nounEndingsActive != '') {
    document.getElementById("buttons").innerHTML = '<div class="nounEndingContainer"><h4 class="nounEnding">' + nounEndingsActive +'</h4></div>';
  } else {
    document.getElementById("buttons").innerHTML = '<div class="nounEndingContainer"><h4 class="nounEnding">' + 'var' +'</h4></div>';
  }

  nounChartInit();
}

function nounChart() {
  pagestate = 3;
  // chrome.tabs.create({url: 'NounChart.html'});\
  
  nounEndingsActive = nounEndings;

  // sets i to 1 so it can be used to get iterations in .map
  let i = 1;

  Object.keys(nounEndings).map(buttontitle => {
    document.getElementById("buttons").innerHTML += '<button id="nounEndingsButton' + i + '" class="endingsButton">' + buttontitle +'</button>';
    i += 1;
  });

  // init buttonlisteners
  nounChartInit();
}
if (true) {
  var verbendings = {
    active: {},
    passive: "passive endings are not yet supported"
  }
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

function clear() {
  // clears UI
  document.getElementById("buttons").innerHTML = '';

  // sets a new tip if the previous page set a unique tip 
  if (pagestate == 2) {
    tip();
  }
}

// Initialises the navbar buttons
function nav() {
  document.getElementById("macronizerbutton").addEventListener("click", () => {clear(); macronizer();});
  document.addEventListener("keydown", (e) => {/*console.log(e.key);*/ if (e.key == 'm' && pagestate != 2) {clear(); macronizer();}});

  document.getElementById("dictionarybutton").addEventListener("click", () => {clear(); dictionary();});
  document.addEventListener("keydown", (e) => {/*console.log(e.key);*/ if (e.key == 'd' && pagestate != 2) {clear(); dictionary();}});

  document.getElementById('nounendingsbutton').addEventListener("click", () => {clear(); nounChart();});
  document.addEventListener("keydown", (e) => {/*console.log(e.key);*/ if (e.key == 'n' && pagestate != 2) {clear(); nounChart();}});

  document.getElementById('verbendingsbutton').addEventListener("click", () => {clear(); verbEndings();});
  document.addEventListener("keydown", (e) => {/*console.log(e.key);*/ if (e.key == 'v' && pagestate != 2) {clear(); verbEndings();}});

  document.getElementById('feedbackbutton').addEventListener("click", () => {clear(); feedback();});
  document.addEventListener("keydown", (e) => {/*console.log(e.key);*/ if (e.key == 'f' && pagestate != 2) {clear(); feedback();}});
}

//*CALLS FUNCTIONS TO INITIALIZE UI*

// calls nav to initiate the navbar buttons
nav();
// calls macronizer to initiate the macronization button ui
macronizer();