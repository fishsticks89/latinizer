// for testing:
console.log("docsOnly.js injected");

function sendstroke(code) {
    console.log("docing");
    // for docs
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
}

chrome.runtime.onMessage.addListener(
    function(identifier) {
        console.log("keystroke recieved");
        console.log(identifier);

        sendstroke(identifier.code);
    }
);