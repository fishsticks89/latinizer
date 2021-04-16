var char = ["&#x0101", "&#x0113", "&#x012B", "&#x014D", "&#x016B"];
var id = ["0101", "00113", "0012B", "0014D", "0016B"];

function macronize(iden) {
    windows.close();
    
    var keyboardEvent = document.createEvent('KeyboardEvent');
    var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';
  
    keyboardEvent[initMethod](
      'keydown', // event type: keydown, keyup, keypress
      true, // bubbles
      true, // cancelable
      window, // view: should be window
      false, // ctrlKey
      false, // altKey
      false, // shiftKey
      false, // metaKey
      0, // keyCode: unsigned long - the virtual key code, else 0
      iden, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
    );
    document.dispatchEvent(keyboardEvent);
}

for (i = 0; i < char.length; i++) {
    id[i].onclick = macronize(id[i]);
}