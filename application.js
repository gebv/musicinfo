
var idOpenTabWhatCd = null;
var idOpenTabLastFm = null;
var idOpenTabYoutube = null;

function gotoWhatcd(info, tab) {
    var urlWhatCd = "https://what.cd/torrents.php?searchstr=" + info.selectionText;

    if(idOpenTabWhatCd != null) {
        chrome.tabs.update(idOpenTabWhatCd, {url: urlWhatCd});
    } else {
        chrome.tabs.create({url: urlWhatCd}, function(tab){
            idOpenTabWhatCd = tab.id;
        });
    }
}

function gotoLastfm(info, tab) {
    var urlLastFm = "http://www.last.fm/search?q=" + info.selectionText;

    if(idOpenTabLastFm != null) {
        chrome.tabs.update(idOpenTabLastFm, {url: urlLastFm});
    } else {
        chrome.tabs.create({url: urlLastFm}, function(tab){
            idOpenTabLastFm = tab.id;
        });
    }
}

function gotoYoutube(info, tab) {
    var urlYoutube = "http://www.youtube.com/results?high_definition=1&search_type=videos&uni=3&search_query=" + info.selectionText;

    if(idOpenTabYoutube != null) {
        chrome.tabs.update(idOpenTabYoutube, {url: urlYoutube});
    } else {
        chrome.tabs.create({url: urlYoutube}, function(tab){
            idOpenTabYoutube = tab.id;
        });
    }
}

var id = chrome.contextMenus.create({"title": "Found %s in", "contexts":["selection", "link"]});

chrome.contextMenus.create({"title": "Last.fm", "contexts":["selection", "link"],
    "onclick": gotoLastfm, "parentId": id});
chrome.contextMenus.create({"title": "What.cd", "contexts":["selection", "link"],
    "onclick": gotoWhatcd, "parentId": id});
chrome.contextMenus.create({"title": "Youtube.com", "contexts":["selection", "link"],
    "onclick": gotoYoutube, "parentId": id});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    if(tabId == idOpenTabWhatCd) {
        idOpenTabWhatCd = null;
    } else if(tabId == idOpenTabLastFm) {
        idOpenTabLastFm = null;
    } else if(tabId == idOpenTabYoutube) {
        idOpenTabYoutube = null;
    }
});
