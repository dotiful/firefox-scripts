// ==UserScript==
// @name           newtabfromhistory.uc.js
// @namespace      https://www.camp-firefox.de/forum/viewtopic.php?p=1090093#p1090093
// @description    Links aus Chronik in neuem Tab öffnen
// @author         aborix
// @compatibility  62+
// @version        0.0.2
// ==/UserScript==

(function() {

  if (location != 'chrome://browser/content/browser.xul')
    return;

  eval('PlacesUIUtils.openNodeWithEvent = '  + PlacesUIUtils.openNodeWithEvent.toString()
    .replace(' && PlacesUtils.nodeIsBookmark(aNode)', '')
    .replace('getBrowserWindow(window)', 
      '(window && window.document.documentElement.getAttribute("windowtype") == "navigator:browser") ? window : BrowserWindowTracker.getTopWindow()')
  );

  let onPopupshowing = function() {
    let historyMenu = document.getElementById('history-menu');
    if (!historyMenu._placesView) {
      new HistoryMenu(event);
      historyMenu._placesView._onCommand = function HM__onCommand(aEvent) {
        let placesNode = aEvent.target._placesNode;
        if (placesNode) {
          PlacesUIUtils.openNodeWithEvent(placesNode, aEvent);
        };
      };
    };
  };

  let historyPopup = document.getElementById('goPopup');
  historyPopup.setAttribute('onpopupshowing', '(' + onPopupshowing.toString() + ')()');

})();
