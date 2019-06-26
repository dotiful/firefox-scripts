// ==UserScript==
// @name           UndoListInTabmenuToo
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    UndoListInTabmenuToo.uc.js
// @include        main
// @compatibility  Firefox 4.0 - 60+
// @author         Alice0775
// @version        2018/04/11 Update for Firefox 60+ by aborix
// @version        2017/11/18 nsIPrefBranch to nsIPrefBranch
// @version        2010/09/18 00:00 4.0b7pre
// @version        2009/02/03 13:00 ツールチップにタブ内履歴を表示するようにした
// @Note           タブやコンテキストメニューにもUndoClose Tab Listを追加するもの
// @OriginalCode   browser.jsからpopulateUndoSubmenuを拝借し, ごにょごにょした
// @version        2010/03/26 13:00  Minefield/3.7a4pre Bug 554991 -  allow tab context menu to be modified by normal XUL overlays
// @version        2010/03/15 00:00  Minefield/3.7a4pre Bug 347930 -  Tab strip should be a toolbar instead
// @version        2009/09/09 15:00 中クリック処理
// ==/UserScript==
// @version        2009/09/03 22:00 Firegox3.7a1preで動かなくなっていたのを修正(Bug 489925. getElementById should not return anonymous nodes)
// @version        2009/08/22 00:00 Firegox3.6 stringbandleの変更による
// @version        2009/04/24 00:00 #394759 [Firefox:Session Restore]-Add undo close window feature
// @version        2008/10/12 18:00 Fx3.0.4pre中クリックしたときメニューポップアップが閉じないおよびその他fix
// @version        2007/10/05 10:00

var UndoListInTabmenu = {
// -- config --
  TABCONTEXTMENU : true , //Im Tabkontextmenü: anzeigen: true, nicht anzeigen: false
  CONTEXTMENU    : true,  //Im Hauptkontextmenü: anzeigen: true , nicht anzeigen: false
// -- config end--
  ss: null,

  get tabContext() {
/*  return document.getAnonymousElementByAttribute(
                        gBrowser, "anonid", "tabContextMenu")||
           gBrowser.tabContainer.contextMenu;
*/  return gBrowser.tabContainer.contextMenu;
  },

  init: function(){

    if (this.TABCONTEXTMENU){
      //Eintrag für Tabkontextmenü
      var tabContext = this.tabContext;
      this.makePopup(tabContext, null, "tabContextUndoList");
    }
    if (this.CONTEXTMENU){
      //Eintrag für Hauptkontextmenü
      var contextMenu = document.getElementById("contentAreaContextMenu");
      var refItem = document.getElementById("context-sep-stop");
      this.makePopup(contextMenu, refItem, "ContextUndoList");
    }
    // get closed-tabs from nsSessionStore
/*  this._ss = Cc["@mozilla.org/browser/sessionstore;1"].
               getService(Ci.nsISessionStore);
*/  this._ss = SessionStore;

  },

  makePopup: function(popup, refItem, id){
    var menu;
    //label
/*  const locale = Components.classes["@mozilla.org/preferences-service;1"]
                   .getService(Components.interfaces.nsIPrefBranch).getCharPref("general.useragent.locale");
*/  const locale = '';
    if (this.getVer() > 3.0) {
      // "Recently Closed Windows"
      let idPrefix = id.substring(0, id.length - 15);
      menu = document.createElement("menu");
      //menu.setAttribute("id", "historyUndoWindowMenu3");
      menu.setAttribute("id", idPrefix + "HistoryUndoWindowMenu3");
      menu.setAttribute("label", "K\u00FCrzlich geschlossene Fenster");
      menu.setAttribute("accesskey", "F");
      menu.setAttribute("disabled", "true");
      popup.insertBefore(menu, refItem);
/*
      this.historyUndoWindowPopup3 = menu = menu.appendChild(document.createElement("menupopup"));
      menu.setAttribute("id", "historyUndoWindowPopup3");
      menu.setAttribute("onpopupshowing", "UndoListInTabmenu.populateUndoWindowSubmenu();");
*/
      var undoPopup = (document.createElement("menupopup"));
      undoPopup.setAttribute("id", idPrefix + "HistoryUndoWindowPopup3");
      undoPopup.setAttribute("onpopupshowing", "UndoListInTabmenu.populateUndoWindowSubmenu(this);");
      menu.appendChild(undoPopup);
    }

    //UndoClose Tab List - Liste kürzlich geschosener Tabs
    const LABELTEXT = locale.indexOf("ja") == -1?"K\u00FCrzlich geschlossene Tabs":"\u6700\u8fd1\u9589\u3058\u305f\u30bf\u30d6";    //create menu
    menu = document.createElement("menu");
    menu.setAttribute("label", LABELTEXT);
    menu.setAttribute("accesskey", "T");
    if (id)
      menu.setAttribute("id", id);
    //menu.setAttribute("disabled", true);
    var menupopup = document.createElement("menupopup");
    if (this.getVer()<3) {
      menupopup.setAttribute("onpopupshowing", "UndoListInTabmenu.populateUndoSubmenu(this);");
    } else if (this.getVer()<3.6) {
      menupopup.setAttribute("onpopupshowing", "UndoListInTabmenu.populateUndoSubmenu3(this);");
    } else {
      menupopup.setAttribute("onpopupshowing", "UndoListInTabmenu.populateUndoSubmenu36(this);");
    }
    menu.appendChild(menupopup);
    popup.insertBefore(menu, refItem);

    //add event listener
    popup.addEventListener('popupshowing',function(event) {
      if (UndoListInTabmenu.getVer() > 3.0)
        UndoListInTabmenu.toggleRecentlyClosedWindows(undoPopup);
      // no restorable tabs, so make sure menu is disabled, and return
      if (UndoListInTabmenu._ss.getClosedTabCount(window) == 0) {
        menu.setAttribute("disabled", true);
        //menu.setAttribute("hidden", true);
        return;
      }
        menu.removeAttribute("disabled");
      //menu.setAttribute("hidden", false);
    },false);
  },

  /**
   * Populate when the history menu is opened  (Fx2)
   */
  populateUndoSubmenu: function(undoPopup) {

    // remove existing menu items
    while (undoPopup.hasChildNodes())
      undoPopup.removeChild(undoPopup.firstChild);

    // populate menu
    var undoItems = eval("(" + UndoListInTabmenu._ss.getClosedTabData(window) + ")");
    for (var i = 0; i < undoItems.length; i++) {
        var m = undoPopup.appendChild(document.createElement("menuitem"));
      m.setAttribute("label", undoItems[i].title);
      m.setAttribute("value", i);
      m.setAttribute("oncommand", "undoCloseTab(" + i + ");");
      m.setAttribute("onclick", "UndoListInTabmenu._undoCloseMiddleClick(event);");
    }

    // "open in tabs"
    var bundleService = Cc["@mozilla.org/intl/stringbundle;1"].
                        getService(Ci.nsIStringBundleService);
    var stringBundle = bundleService.createBundle("chrome://browser/locale/bookmarks/bookmarks.properties");
    undoPopup.appendChild(document.createElement("menuseparator"));
    m = undoPopup.appendChild(document.createElement("menuitem"));
    m.setAttribute("label", stringBundle.GetStringFromName("cmd_bm_openfolder"));
    m.setAttribute("accesskey", stringBundle.GetStringFromName("cmd_bm_openfolder_accesskey"));
    m.addEventListener("command", function() {
      for (var i = 0; i < undoItems.length; i++)
        undoCloseTab();
    }, false);
  },

  /**
    * Re-open a closed tab and put it to the end of the tab strip.
    * Used for a middle click.
    * @param aEvent
    *        The event when the user clicks the menu item
    */
  _undoCloseMiddleClick: function PHM__undoCloseMiddleClick(aEvent) {
    if (aEvent.button != 1)
      return;

    undoCloseTab(aEvent.originalTarget.value);
    gBrowser.moveTabToEnd();
    if (!aEvent.ctrlKey)
      aEvent.originalTarget.parentNode.parentNode.parentNode.hidePopup();
  },

  /**
   * Populate when the history menu is opened (Fx3)
   */
  populateUndoSubmenu3: function(undoPopup) {

    // remove existing menu items
    while (undoPopup.hasChildNodes())
      undoPopup.removeChild(undoPopup.firstChild);

    // "Open All in Tabs"
    var strings = gNavigatorBundle;
    m = undoPopup.appendChild(document.createElement("menuitem"));
    m.setAttribute("label", strings.getString("menuOpenAllInTabs.label"));
    m.setAttribute("accesskey", strings.getString("menuOpenAllInTabs.accesskey"));
    m.addEventListener("command", function() {
      for (var i = 0; i < undoItems.length; i++)
        undoCloseTab();
    }, false);

    undoPopup.appendChild(document.createElement("menuseparator"));

    // populate menu
    var undoItems = eval("(" + UndoListInTabmenu._ss.getClosedTabData(window) + ")");
    for (var i = 0; i < undoItems.length; i++) {
      var entries = undoItems[i].state.entries;
      var tooltiptext = "";
      for (var j = entries.length - 1; j > -1; j--){
        if (j != entries.length - 1)
          tooltiptext += "\n";
        tooltiptext += parseInt(j + 1, 10) + ". " + entries[j].title;
      }
      var m = document.createElement("menuitem");
      m.setAttribute("tooltiptext", tooltiptext);
      m.setAttribute("label", undoItems[i].title);
      if (undoItems[i].image)
        m.setAttribute("image", undoItems[i].image);
      m.setAttribute("class", "menuitem-iconic bookmark-item");
      m.setAttribute("value", i);
      m.setAttribute("oncommand", "undoCloseTab(" + i + ");");
      m.setAttribute("onclick", "UndoListInTabmenu._undoCloseMiddleClick(event);");
      if (i == 0)
        m.setAttribute("key", "key_undoCloseTab");
      undoPopup.appendChild(m);
    }

    // "Clear undo close tb list"
    undoPopup.appendChild(document.createElement("menuseparator"));

    m = undoPopup.appendChild(document.createElement("menuitem"));
    m.setAttribute("label", "Liste der letzten Tabs l\u00F6schen");
    m.setAttribute("accesskey", "l");
    m.addEventListener("command", function() {
      var max_undo = UndoListInTabmenu.getPref("browser.sessionstore.max_tabs_undo", "int", 10);
      UndoListInTabmenu.setPref("browser.sessionstore.max_tabs_undo", "int", 0);
      UndoListInTabmenu.setPref("browser.sessionstore.max_tabs_undo", "int", max_undo);
      if (max_undo != UndoListInTabmenu.getPref("browser.sessionstore.max_tabs_undo", "int", 10))
        UndoListInTabmenu.setPref("browser.sessionstore.max_tabs_undo", "int", max_undo);
    }, false);
  },

  /**
   * Populate when the history menu is opened (Fx3.6)
   */
  populateUndoSubmenu36: function(undoPopup) {

    // remove existing menu items
    while (undoPopup.hasChildNodes())
      undoPopup.removeChild(undoPopup.firstChild);

    // "Open All in Tabs"
    var strings = gNavigatorBundle;
    m = undoPopup.appendChild(document.createElement("menuitem"));
    m.setAttribute("label", strings.getString("menuRestoreAllTabs.label"));
    //m.setAttribute("class", "menuitem-iconic bookmark-item");
    m.setAttribute("accesskey", "R" /*strings.getString("menuRestoreAllTabs.accesskey")*/);
    m.addEventListener("command", function() {
      for (var i = 0; i < undoItems.length; i++)
        undoCloseTab();
    }, false);

    undoPopup.appendChild(document.createElement("menuseparator"));

    // populate menu
    var undoItems = eval("(" + UndoListInTabmenu._ss.getClosedTabData(window) + ")");
    for (var i = 0; i < undoItems.length; i++) {
      var entries = undoItems[i].state.entries;
      var tooltiptext = "";
      for (var j = entries.length - 1; j > -1; j--){
        if (j != entries.length - 1)
          tooltiptext += "\n";
        tooltiptext += parseInt(j + 1, 10) + ". " + entries[j].title;
      }
      var m = document.createElement("menuitem");
      m.setAttribute("tooltiptext", tooltiptext);
      m.setAttribute("label", undoItems[i].title);
      if (undoItems[i].image)
        m.setAttribute("image", undoItems[i].image);
      m.setAttribute("class", "menuitem-iconic bookmark-item");
      m.setAttribute("value", i);
      m.setAttribute("oncommand", "undoCloseTab(" + i + ");");
      m.setAttribute("onclick", "UndoListInTabmenu._undoCloseMiddleClick(event);");
      if (i == 0)
        m.setAttribute("key", "key_undoCloseTab");
      undoPopup.appendChild(m);
    }

    // "Clear undo close tb list"
    undoPopup.appendChild(document.createElement("menuseparator"));

    m = undoPopup.appendChild(document.createElement("menuitem"));
    m.setAttribute("label", "Liste der letzten Tabs l\u00F6schen");
    m.setAttribute("class", "menuitem-iconic bookmark-item");
    m.setAttribute("accesskey", "l");
    m.addEventListener("command", function() {
      var max_undo = UndoListInTabmenu.getPref("browser.sessionstore.max_tabs_undo", "int", 10);
      UndoListInTabmenu.setPref("browser.sessionstore.max_tabs_undo", "int", 0);
      UndoListInTabmenu.setPref("browser.sessionstore.max_tabs_undo", "int", max_undo);
      if (max_undo != UndoListInTabmenu.getPref("browser.sessionstore.max_tabs_undo", "int", 10))
        UndoListInTabmenu.setPref("browser.sessionstore.max_tabs_undo", "int", max_undo);
    }, false);
  },

  toggleRecentlyClosedWindows: function PHM_toggleRecentlyClosedWindows(undoPopup) {
    // enable/disable the Recently Closed Windows sub menu
/*
    let undoPopup = this.historyUndoWindowPopup3;
    // no restorable windows, so disable menu
    if (this._ss.getClosedWindowCount() == 0)
      this.historyUndoWindowPopup3.parentNode.setAttribute("disabled", true);
    else
      this.historyUndoWindowPopup3.parentNode.removeAttribute("disabled");
*/
    // no restorable windows, so disable menu
    if (this._ss.getClosedWindowCount() == 0)
      undoPopup.parentNode.setAttribute("disabled", true)
    else
      undoPopup.parentNode.removeAttribute("disabled");
  },

  /**
   * Populate when the history menu is opened
   */
  populateUndoWindowSubmenu: function PHM_populateUndoWindowSubmenu(undoPopup) {
    //let undoPopup = this.historyUndoWindowPopup3;
    let menuLabelString = gNavigatorBundle.getString("menuUndoCloseWindowLabel");
    let menuLabelStringSingleTab =
      gNavigatorBundle.getString("menuUndoCloseWindowSingleTabLabel");

    // remove existing menu items
    while (undoPopup.hasChildNodes())
      undoPopup.removeChild(undoPopup.firstChild);

    // no restorable windows, so make sure menu is disabled, and return
    if (this._ss.getClosedWindowCount() == 0) {
      undoPopup.parentNode.setAttribute("disabled", true);
      return;
    }
    // enable menu
    undoPopup.parentNode.removeAttribute("disabled");
    let undoItems = JSON.parse(this._ss.getClosedWindowData());
    // "Open All in Windows"
    let m = undoPopup.appendChild(document.createElement("menuitem"));
    m.setAttribute("label", gNavigatorBundle.getString("menuRestoreAllWindows.label"));
    //m.setAttribute("class", "menuitem-iconic bookmark-item");
    m.setAttribute("accesskey", "W"/*gNavigatorBundle.getString("menuRestoreAllWindows.accesskey")*/);
    m.setAttribute("oncommand",
      "for (var i = 0; i < " + undoItems.length + "; i++) UndoListInTabmenu.undoCloseWindow();");
    undoPopup.appendChild(document.createElement("menuseparator"));
    // populate menu
    for (let i = 0; i < undoItems.length; i++) {
      let undoItem = undoItems[i];
      let otherTabsCount = undoItem.tabs.length - 1;
      let label = (otherTabsCount == 0) ? menuLabelStringSingleTab
                                        : PluralForm.get(otherTabsCount, menuLabelString);
      let menuLabel = label.replace("#1", undoItem.title)
                           .replace("#2", otherTabsCount);
      let m = document.createElement("menuitem");
      m.setAttribute("label", menuLabel);
      let selectedTab = undoItem.tabs[undoItem.selected - 1];
      if (selectedTab.attributes.image) {
        let iconURL = selectedTab.attributes.image;
        // don't initiate a connection just to fetch a favicon (see bug 467828)
        if (/^https?:/.test(iconURL))
          iconURL = "moz-anno:favicon:" + iconURL;
        m.setAttribute("image", iconURL);
      }
      m.setAttribute("class", "menuitem-iconic bookmark-item");
      m.setAttribute("oncommand", "UndoListInTabmenu.undoCloseWindow(" + i + ");");
      if (i == 0)
        m.setAttribute("key", "key_undoCloseWindow");
      undoPopup.appendChild(m);
    }
  },


  /**
   * Re-open a closed window.
   * @param aIndex
   *        The index of the window (via nsSessionStore.getClosedWindowData)
   * @returns a reference to the reopened window.
   */
  undoCloseWindow: function (aIndex) {
/*  let ss = Cc["@mozilla.org/browser/sessionstore;1"].
             getService(Ci.nsISessionStore);
*/  let ss = SessionStore;
    let window = null;
    if (ss.getClosedWindowCount() > (aIndex || 0))
      window = ss.undoCloseWindow(aIndex || 0);

    return window;
  },

  getPref: function(aPrefString, aPrefType, aDefault){
    var xpPref = Components.classes['@mozilla.org/preferences-service;1']
                  .getService(Components.interfaces.nsIPrefBranch);
    try{
      switch (aPrefType){
        case 'complex':
          return xpPref.getComplexValue(aPrefString, Components.interfaces.nsILocalFile); break;
        case 'str':
          return xpPref.getCharPref(aPrefString).toString(); break;
        case 'int':
          return xpPref.getIntPref(aPrefString); break;
        case 'bool':
        default:
          return xpPref.getBoolPref(aPrefString); break;
      }
    }catch(e){
    }
    return aDefault;
  },

  setPref: function(aPrefString, aPrefType, aValue){
    var xpPref = Components.classes['@mozilla.org/preferences-service;1']
                  .getService(Components.interfaces.nsIPrefBranch);
    try{
      switch (aPrefType){
        case 'complex':
          return xpPref.setComplexValue(aPrefString, Components.interfaces.nsILocalFile, aValue); break;
        case 'str':
          return xpPref.setCharPref(aPrefString, aValue); break;
        case 'int':
          aValue = parseInt(aValue);
          return xpPref.setIntPref(aPrefString, aValue);  break;
        case 'bool':
        default:
          return xpPref.setBoolPref(aPrefString, aValue); break;
      }
    }catch(e){
    }
    return null;
  },

  //Fx Version ermitteln
    //FxVersion
  getVer: function(){
    const Cc = Components.classes;
    const Ci = Components.interfaces;
    var info = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULAppInfo);
    var ver = parseInt(info.version.substr(0,3) * 10,10) / 10;
    return ver;
  }
};

if(!('TM_init' in window)) UndoListInTabmenu.init();

