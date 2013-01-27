
var idOpenTab = null;
function onClick(info, tab) {
    var url = "https://what.cd/torrents.php?searchstr=" + info.selectionText;

    if(idOpenTab != null) {
        chrome.tabs.update(idOpenTab, {url: url});
    } else {
        chrome.tabs.create({url: url}, function(tab){
            idOpenTab = tab.id;
        });
    }

};

chrome.contextMenus.create({"title": "Found in what.cd", "contexts":["selection", "link"],
    "onclick": onClick});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    if(tabId == idOpenTab) {
        idOpenTab = null;
    }
});
