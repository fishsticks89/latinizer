function listenAndSend() {
    chrome.runtime.onMessage.addListener(
        function(identifier) {
            
            // a very complicated way to click a button
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
                identifier.identifier, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
            );
            document.dispatchEvent(keyboardEvent);
            sendResponse(1); // lets background.js know you exist!
        }
    );
}

function dispatcher(iden) {

    // logs the unicode charachter passed from sendit.js
    console.log(iden.iden);

    //gets the active tab to
    var tabId = chrome.tabs.tab.id;

    console.log(tabId);

    //injects listenandsend
    chrome.scripting.executeScript({ 
        target: {tabId},
        function: listenAndSend
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        /*chrome.tabs.sendMessage(tabs[0].id, {identifier: iden.iden}, function(response) {
        console.log(response.farewell);
        });*/
        console.log(tabs[0]);
    });
}

chrome.runtime.onMessage.addListener(
    function(iden) {
        setTimeout(() => { dispatcher(iden) }, 80);
    }
);   