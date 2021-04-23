console.log("keyboardEvent.js injected");

function sendstroke(unicode, charcode) {


    //try1
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
        charcode, // keyCode: unsigned long - the virtual key code, else 0
        unicode, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
    );
    document.dispatchEvent(keyboardEvent);

    //try2
    // for docs:
    console.log("const input = document.querySelector(\".docs-texteventtarget-iframe\").contentDocument.activeElement;\nconst eventObj = document.createEvent(\"Event\");\neventObj.initEvent(\"keypress\", true, true);\neventObj.keyCode = 105;\ninput.dispatchEvent(eventObj);\ndocument.activeElement.value = document.activeElement.value + \"а\";");
    var charcodeParsed = parseInt(String(charcode).substring(2));
    document.activeElement.value = document.activeElement.value + String.fromCharCode(charcodeParsed);
}

chrome.runtime.onMessage.addListener(
    function(identifier) {
        console.log("keystroke recieved");
        console.log(identifier);

        sendstroke(identifier.unicode, 0);
        sendstroke(0, identifier.unicode);
        sendstroke(identifier.unicode, identifier.unicode);
        sendstroke(identifier.charcode, 0);
        sendstroke(0, identifier.charcode);
        sendstroke(identifier.charcode, identifier.charcode);
        sendstroke(identifier.charcode, identifier.unicode);
        sendstroke(identifier.unicode, identifier.charcode);
    }
);