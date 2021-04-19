console.log("keyboardEvent.js injected");

function sendstroke(unicode, charcode) {
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

        sendstroke2();
        
        jQuery.event.trigger({ type : 'keypress', which : identifier.unicode });
        jQuery.event.trigger({ type : 'keypress', which : identifier.charcode });
    }
);