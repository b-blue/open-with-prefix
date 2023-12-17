chrome.runtime.onInstalled.addListener(function () {
  // Create a parent item and two children.
  let menuItem = chrome.contextMenus.create({
    title: "Open with prefix",
    contexts: ["link"],
    id: "openLink",
  });
});

// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(genericOnClick);

// A generic onclick callback function def.
async function genericOnClick(info) {
  if (info.linkUrl) {
    await openInNewTab(info.linkUrl);
  }
  console.log("Standard context menu item clicked.");
}

// Function to open a link in a new tab
async function openInNewTab(link) {
  let prefix;

  try {
    prefix = await getFromLocalStorage("prefix");
    saveToLocalStorage("prefix", prefix);
    chrome.tabs.create({ url: prefix + link });
    console.log(prefix + link);
  } catch (err) {
    console.error("No prefix found in storage");
  }
}

// Function to retrieve a value from local storage
async function getFromLocalStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result[key]);
    });
  });
}

// Function to save a value to local storage
async function saveToLocalStorage(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: value }, () => {
      resolve();
    });
  });
}
