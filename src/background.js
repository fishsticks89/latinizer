import { listenAndSend } from 'keyboardEvent.js';
function dispatcher(iden) {

    console.log(iden.iden);

    chrome.scripting.executeScript({
        function: listenAndSend
        //id: '1387' 
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