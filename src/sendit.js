function macronize(char, code) {
    chrome.runtime.sendMessage({char: char, code: code});
    setTimeout(() => { window.close(); }, 20);
}

for (let i = 0; i < char.length; i++) {
  document.getElementById(id[i]).addEventListener("click", () => macronize(char[i], code[i]));
}