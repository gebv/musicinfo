/**
 *
 * @type {Object}
 */
var arrayTabsId = {};

/**
 *
 * @type {Object}
 */
var options = {
    lastfm: {title:"Last.fm", prefix: "http://www.last.fm/search?q="},
    whatcd: {title:"What.cd", prefix: "https://what.cd/torrents.php?searchstr="},
    youtube: {title:"Youtube.com (HD)", prefix:"http://www.youtube.com/results?high_definition=1&search_type=videos&uni=3&search_query="}
};

/**
 *
 * @param array
 * @param value
 * @return {*}
 */
function findId(value) {
    for (key in arrayTabsId) {
        if (arrayTabsId[key] == value) return key;
    }

    return false;
}

/**
 *
 * @param key
 * @param value
 */
function setIdTab(key, value) {

    if (typeof value === "number") {
        arrayTabsId[key] = value;
    } else {
        if (existIdTab(key)) {
            delete arrayTabsId[key];
        }
    }

    return this;
}

/**
 *
 * @param key
 * @return {*}
 */
function getIdTab(key) {
    return existIdTab(key) ? arrayTabsId[key] : false;
}

/**
 *
 * @param key
 * @return {Boolean}
 */
function existIdTab(key) {
    return (key in arrayTabsId) ? true : false;
}

/**
 *
 * @param key
 * @return {Function}
 */
function onClick(key) {
    var prefixUrl = options[key].prefix; //"https://www.google.com/?q="

    return function (info, tab) {
        var url = prefixUrl + info.selectionText;
        var idTab = getIdTab(key);

        if (idTab != false) {
            chrome.tabs.update(idTab, {url:url});
        } else {
            chrome.tabs.create({url:url, active:false}, function (tab) {
                setIdTab(key, tab.id);
            });
        }
    }
}

var id = chrome.contextMenus.create({"title":"Found '%s' in", "contexts":["selection", "link"]});

/**
 * Add items
 */
for (name in options) {
    chrome.contextMenus.create(
        {
            title:options[name].title,
            contexts:["selection", "link"],
            onclick:onClick(name),
            parentId:id
        }
    );
}

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    var key = findId(tabId);

    if (false !== key) {
        setIdTab(key); // remove identifier closed tab
    }
});
