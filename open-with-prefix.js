chrome.runtime.onInstalled.addListener(function () {

    // Create a parent item and two children.
    let menuItem = chrome.contextMenus.create({
        title: 'Open with prefix',
        contexts: ['link'],
        id: 'openLink'
    });

});

// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick);

// A generic onclick callback function def.
function genericOnClick(info) {
    if (info.linkUrl){
        openInNewTab(info.linkUrl);
    }
    console.log('Standard context menu item clicked.');
}

// Function to open a link in a new tab
function openInNewTab(link){
    prefix = 'http://archive.is/'
    chrome.tabs.create({url: prefix + link});
    console.log(prefix + link);
}