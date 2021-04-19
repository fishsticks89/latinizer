function macronize(charcode, unicode) {
    chrome.runtime.sendMessage({charcode: charcode, unicode: unicode});
    setTimeout(() => { window.close(); }, 20);
}

for (let i = 0; i < char.length; i++) {
  document.getElementById(id[i]).addEventListener("click", () => macronize(char[i], id[i]));
}