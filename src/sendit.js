function macronize(iden) {
    chrome.runtime.sendMessage({iden: iden});
    setTimeout(() => { window.close(); }, 20);
}

for (let i = 0; i < char.length; i++) {
  document.getElementById(id[i]).addEventListener("click", () => macronize(id[i]));
}