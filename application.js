
var idOpenTabWhatCd = null;
var idOpenTabLastFm = null;

function onClick(info, tab) {
    var urlWhatCd = "https://what.cd/torrents.php?searchstr=" + info.selectionText;
    var urlLastFm = "http://www.last.fm/search?q=" + info.selectionText;

    if(idOpenTabWhatCd != null) {
        chrome.tabs.update(idOpenTabWhatCd, {url: urlWhatCd});
    } else {
        chrome.tabs.create({url: urlWhatCd}, function(tab){
            idOpenTabWhatCd = tab.id;
        });
    }

    if(idOpenTabLastFm != null) {
        chrome.tabs.update(idOpenTabLastFm, {url: urlLastFm});
    } else {
        chrome.tabs.create({url: urlLastFm}, function(tab){
            urlLastFm = tab.id;
        });
    }
}

var id = chrome.contextMenus.create({"title": "Found %s", "contexts":["selection", "link"],
    "onclick": onClick});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    if(tabId == idOpenTabWhatCd) {
        idOpenTabWhatCd = null;
    } else if(tabId == idOpenTabLastFm) {
        idOpenTabLastFm = null;
    }
});
