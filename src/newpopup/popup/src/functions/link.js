function link(e) {
    chrome.tabs.create({url: e});
}

export default link;