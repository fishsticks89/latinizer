// forwards the key id to keyboardEvent.js
function sendkey(iden) {
    console.log(iden);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {identifier: iden}, function(response) {
            console.log(response);
        });
    });
}

chrome.runtime.onMessage.addListener(
    function(iden) {
        setTimeout(() => { sendkey(iden.iden) }, 80);
    }
);