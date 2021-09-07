// for testing:
console.log("keyboardEvent.js injected");

function getCaretPosition(editableDiv) {
    var caretPos = 0,
        sel, range;
    if (window.getSelection) {
        console.log('one')
        sel = window.getSelection();
        if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
            caretPos = range.endOffset;
        }
        }
    } else if (document.selection && document.selection.createRange) {
        console.log(2)
        range = document.selection.createRange();
        if (range.parentElement() == editableDiv) {
        var tempEl = document.createElement("span");
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        var tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
        }
    }
    return caretPos;
}

function conEditSetCaret(el, caretPos) {
    var range = document.createRange()
    var sel = window.getSelection()
    
    range.setStart(el, caretPos)
    range.collapse(true)
    
    sel.removeAllRanges()
    sel.addRange(range)
}

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

function insertAtCarat(myField, myValue, valorin) {
    if (valorin) {
        var startPos = myField.selectionStart;
        console.log(startPos);
        var endPos = myField.selectionEnd;

        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
        setCaretPosition(document.activeElement, startPos + 1);
        // Sets cursor position to end of macron ^
    } else {
        var startPos = getCaretPosition(myField);
        console.log(startPos);

        console.log('active element fun:')
        console.log(myField.innerHTML)
        console.log(myField.innerText)
        console.log(myField.textContent)
        myField.innerText = myField.innerText.substring(0, startPos)
            + myValue
            + myField.innerHTML.substring(startPos, myField.innerText.length);
        conEditSetCaret(myField, startPos)
        // Sets cursor position to end of macron ^
    }
}

function sendstroke(code, char) {
    console.log('active: ' + document.activeElement);


    // TODO: if active element has no text field, reopen the popup and send it a message to copy the char to clipboard

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
    var charcodeParsed = String.fromCharCode(code);
    
    // for non html forms
    if (document.activeElement.value == undefined) {
        console.log("you have no value");
        const input = document.activeElement;
        input.dispatchEvent(new KeyboardEvent('keydown',{'key': charcodeParsed}));
        input.dispatchEvent(new KeyboardEvent('keyup',{'key': charcodeParsed}));
        input.dispatchEvent(new KeyboardEvent('keypress',{'key': charcodeParsed}));
        console.log("code: " + charcodeParsed);
    }

    // for div
    if (document.activeElement.getAttribute("contentEditable") == 'true' && document.activeElement.tagName != 'IFRAME') {
        console.log("divide and conquor");
        const input = document.activeElement;
        // input.innerHTML = input.innerHTML + charcodeParsed
        insertAtCarat(document.activeElement, charcodeParsed, false);
        console.log("code: " + charcodeParsed);
    }

    // for docs
    if (document.activeElement.tagName == 'IFRAME') {
        console.log("who framed roger rabbit");
        const input = document.activeElement.contentDocument.activeElement;
        const eventObj = document.createEvent("Event");
        eventObj.initEvent("keypress", true, true);
        eventObj.keyCode = charcodeParsed;
        input.dispatchEvent(eventObj);
        console.log("code: " + charcodeParsed);
    }
    
    // general try for form and textarea
    if (document.activeElement.value != undefined) {
        console.log('you may have value')
        insertAtCarat(document.activeElement, charcodeParsed, true);
    }
}

chrome.runtime.onMessage.addListener(
    function(identifier) {
        console.log("keystroke recieved");
        console.log(identifier);

        sendstroke(identifier.code, identifier.char);
    }
);