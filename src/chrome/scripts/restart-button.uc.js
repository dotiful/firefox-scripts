
(function() {
  if (location != 'chrome://browser/content/browser.xul' && location != 'chrome://browser/content/browser.xhtml')
  return;

  try {
    CustomizableUI.createWidget({
      id: 'restart-button',
      type: 'custom',
      defaultArea: CustomizableUI.AREA_NAVBAR,
      onBuild: function(aDocument) {
        var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
        toolbaritem.onclick = event => onClick(event);
        var props = {
          id: 'restart-button',
          class: 'toolbarbutton-1 chromeclass-toolbar-additional',
          label: 'Restart',
          tooltiptext: 'Restart and delete startupCache)',
          style: 'list-style-image: url(chrome://browser/skin/sync.svg)'
        };
        for(var p in props)
          toolbaritem.setAttribute(p, props[p]);
        return toolbaritem;
      }
    });
  } catch(e) {};

  function onClick(event) {
    if(event.button == 1)
      Services.appinfo.invalidateCachesOnRestart();
    else if(event.button == 2)
      return;

    let cancelQuit = Cc["@mozilla.org/supports-PRBool;1"].createInstance(Ci.nsISupportsPRBool);

    Services.appinfo.invalidateCachesOnRestart();
    Services.obs.notifyObservers(cancelQuit, "quit-application-requested", "restart");
    if(!cancelQuit.data)
      Services.startup.quit(Services.startup.eAttemptQuit | Services.startup.eRestart);
  }
})();
