// for testing:
// console.log("keyboardEvent.js injected");

function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}

function sendstroke(code) {


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
        0, // keyCode: unsigned long - the virtual key code, else 0
        code, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
    );
    document.dispatchEvent(keyboardEvent);
    
    //try2
    // for docs:
    // console.log("const input = document.querySelector(\".docs-texteventtarget-iframe\").contentDocument.activeElement;\nconst eventObj = document.createEvent(\"Event\");\neventObj.initEvent(\"keypress\", true, true);\neventObj.keyCode = " + code + ";\ninput.dispatchEvent(eventObj);");
    
    //try3

    // for plain field:
    var charcodeParsed = parseInt(String(code));
    // document.activeElement.value = document.activeElement.value + String.fromCharCode(charcodeParsed);
    
    // for docs:
    if (document.URL.includes("https://docs.google.com")) {
        console.log("docing");
        const input = document.querySelector(".docs-texteventtarget-iframe").contentDocument.activeElement;
        const eventObj = document.createEvent("Event");
        eventObj.initEvent("keypress", true, true);
        eventObj.keyCode = charcodeParsed;
        input.dispatchEvent(eventObj);
        console.log("code: " + charcodeParsed);
    }
    
    // general try for form and textarea
    insertAtCursor(document.activeElement, String.fromCharCode(charcodeParsed));
}

chrome.runtime.onMessage.addListener(
    function(identifier) {
        console.log("keystroke recieved");
        console.log(identifier);

        sendstroke(identifier.code);
    }
);