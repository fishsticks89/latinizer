console.log("keyboardEvent.js injected");

function sendstroke(code) {


    //try1
    /*
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
        char, // keyCode: unsigned long - the virtual key code, else 0
        code, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
    );
    document.dispatchEvent(keyboardEvent);
    */
    
    //try2
    // for docs:
    console.log("const input = document.querySelector(\".docs-texteventtarget-iframe\").contentDocument.activeElement;\nconst eventObj = document.createEvent(\"Event\");\neventObj.initEvent(\"keypress\", true, true);\neventObj.keyCode = " + code + ";\ninput.dispatchEvent(eventObj);");
    
    //try3
    // for docs:
    function runa(code) {
        code();
    }
    runa(() => {
        const input = document.querySelector(".docs-texteventtarget-iframe").contentDocument.activeElement;
        const eventObj = document.createEvent("Event");
        eventObj.initEvent("keypress", true, true);
        eventObj.keyCode = code;
        input.dispatchEvent(eventObj);
    });
    // for plain field:
    var charcodeParsed = parseInt(String(code));
    document.activeElement.value = document.activeElement.value + String.fromCharCode(charcodeParsed);
}

chrome.runtime.onMessage.addListener(
    function(identifier) {
        console.log("keystroke recieved");
        console.log(identifier);

        sendstroke(identifier.code);
    }
);