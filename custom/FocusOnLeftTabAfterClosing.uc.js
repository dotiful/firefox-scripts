"use strict";

// SCHEME:
//
// We handle only visible (== not hidden) tabs.
// The successor of the leftmost tab is set to its right one when there are multiple tabs.
// Otherwise, if there is only one tab, it has no specific successor, that is, a virtual tab with ID -1 is assigned.
// For other visible tabs, the left of each tab is the successor.
// Example:
//    <==== <==== <=============
// [ A ] [ B ] [ C ] [HIDDEN] [ D ]
//    ====>

function setAllSuccessors(windowId, ignoredTabId) { // XXX: This might be slow when too many tabs are open.
  console.log(`setAllSuccessors: w#${windowId}`);
  browser.tabs.query({
    hidden: false,
    windowId: windowId
  })
  .then(tabs => {
    const idsRTL = (ignoredTabId === undefined ? tabs : tabs.filter(a => a.id !== ignoredTabId))
    .sort((a, b) => b.index - a.index)
    .map(a => a.id);
    const $ = idsRTL.length;
    browser.tabs.moveInSuccession(idsRTL, $ >= 2 ? idsRTL[$ - 2] : undefined);
  });
}

function setAllSuccessorsForAllWindows() {
  browser.windows.getAll({
    populate: true
  })
  .then(a => {
    a.forEach(w => setAllSuccessors(w.id));
  });
}
/// Initializers
browser.runtime.onInstalled.addListener(details => {
  if (details.reason !== "install" && details.reason !== "update") {
    return;
  }
  setAllSuccessorsForAllWindows();
});
/// Special initialization for tabs opened "statically" at startup
browser.runtime.onStartup.addListener(setAllSuccessorsForAllWindows); // Note: This seems not to be called when booted by `web-ext run`.
/// Listeners for tab state change
browser.tabs.onAttached.addListener((tabId, attachInfo) => {
  console.log(`onAttached: t#${tabId}, w#${attachInfo.newWindowId}[${attachInfo.newPosition}]`);
  setAllSuccessors(attachInfo.newWindowId);
});
browser.tabs.onCreated.addListener(tab => {
  console.log(`onCreated: t#${tab.id}, w#${tab.windowId}[${tab.index}]`);
  setAllSuccessors(tab.windowId);
});
browser.tabs.onDetached.addListener((tabId, detachInfo) => {
  console.log(`onDetached: t#${tabId}, w#${detachInfo.oldWindowId}[${detachInfo.oldPosition}]`);
  setAllSuccessors(detachInfo.oldWindowId);
});
browser.tabs.onMoved.addListener(async (tabId, moveInfo) => {
  console.log(`onMoved: t#${tabId}, w#${moveInfo.windowId}[${moveInfo.fromIndex}]=>[${moveInfo.toIndex}]`);
  if ((await browser.tabs.get(tabId))
  .hidden) {
    console.log(`onMoved: t#${tabId} is hidden`);
    return;
  }
  setAllSuccessors(moveInfo.windowId);
});
browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (removeInfo.isWindowClosing) {
    return;
  }
  console.log(`onRemoved: t#${tabId}, w#${removeInfo.windowId}`);
  setAllSuccessors(removeInfo.windowId, tabId); // The removed tab info might be retrievable if "toolkit.cosmeticAnimations.enabled" pref is true.
});
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(`onUpdated: t#${tabId}, w#${tab.windowId}[${tab.index}], hidden=>${changeInfo.hidden}`);
  setAllSuccessors(tab.windowId);
}, {
  properties: ["hidden"]
});
/// For debugging

function _setSuccessor(tabId, successorTabId) {
  browser.tabs.update(tabId, {
    successorTabId: successorTabId
  });
}

function _dumpSuccessor(tabId) {
  browser.tabs.get(tabId)
  .then(t => console.log(`${t.id} => ${t.successorTabId}`));
}

function _moveInWindow(tabId, newIndex) {
  browser.tabs.move(tabId, {
    index: newIndex
  });
}

function _enumTabs(windowId) {
  browser.tabs.query({
    windowId: windowId
  })
  .then(a => console.table(a.map(_filterTabInfo)));
}

function _enumWindows() {
  browser.windows.getAll({
    populate: true
  })
  .then(a => console.table(a.map(w => ({
    id: w.id,
    tabs: w.tabs.map(_filterTabInfo)
  }))));
}

function _filterTabInfo(tab) {
  return {
    index: tab.index,
    id: tab.id,
    successorTabId: tab.successorTabId,
    hidden: tab.hidden
  };
}
