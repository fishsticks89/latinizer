// for testing:
console.log("keyboardEvent.js injected");

function setCaretPosition(elem, caretPos) {
    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}

function insertAtCarat(myField, myValue) {
    // Old
    // myField.value = myField.value + myValue;

    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        console.log(startPos);
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        // Sets cursor position to end of macron ^
        setTimeout(() => {
            setCaretPosition(document.activeElement, startPos + 1);
        }, 30);
    } else {
        myField.value += myValue;
    }
}

function sendstroke(code) {
    console.log('active: ' + document.activeElement);

    // DO: if active element has no text field, reopen the popup and send it a message to copy the char to clipboard

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
        0, // keyCode: unsigned long - the virtual key code, else 0
        code, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
    );
    document.dispatchEvent(keyboardEvent);
    */
    
    //try2
    // for docs:
    // console.log("const input = document.querySelector(\".docs-texteventtarget-iframe\").contentDocument.activeElement;\nconst eventObj = document.createEvent(\"Event\");\neventObj.initEvent(\"keypress\", true, true);\neventObj.keyCode = " + code + ";\ninput.dispatchEvent(eventObj);");
    
    //try3

    // makes charcode string
    var charcodeParsed = parseInt(String(code));
    
    // for non html forms
    if (document.activeElement.value == undefined) {
        console.log("you have no value");
        const input = document.activeElement;
        const eventObj = document.createEvent("Event");
        eventObj.initEvent("keypress", true, true);
        eventObj.keyCode = charcodeParsed;
        input.dispatchEvent(eventObj);
        console.log("code: " + charcodeParsed);
    }

    // for docs
    if (document.activeElement.nodeName == 'IFRAME') {
        console.log("who framed roger rabbit");
        const input = document.activeElement.contentDocument.activeElement;
        const eventObj = document.createEvent("Event");
        eventObj.initEvent("keypress", true, true);
        eventObj.keyCode = charcodeParsed;
        input.dispatchEvent(eventObj);
        console.log("code: " + charcodeParsed);
    }
    
    // general try for form and textarea
    insertAtCarat(document.activeElement, String.fromCharCode(charcodeParsed));
}

chrome.runtime.onMessage.addListener(
    function(identifier) {
        console.log("keystroke recieved");
        console.log(identifier);

        sendstroke(identifier.code);
    }
);