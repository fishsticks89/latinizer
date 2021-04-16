var char = ["&#x0101", "&#x0113", "&#x012B", "&#x014D", "&#x016B"];
var id = ["0101", "00113", "0012B", "0014D", "0016B"];

function macronize(iden) {
    chrome.runtime.sendMessage({macronize: iden});
    // window.close();
}

for (let i = 0; i < char.length; i++) {
  document.getElementById(id[i]).addEventListener("click", () => macronize(id[i]));
}