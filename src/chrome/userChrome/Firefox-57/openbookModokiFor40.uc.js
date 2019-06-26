// ==UserScript==
// @name           openbookModokiFor40.uc.js
// @namespace      https://addons.mozilla.org/firefox/addon/3885
// @description    Lesezeichen Bearbeiten Panel: Veränderbare Panelgröße hinzugefügt. Schlüsselwort und Ordner-Struktur  
// @description    Felder sind geschlossen. Weitere Einstellungen:  Beschreibung, Ordner, Dieses Lesezeichen in der Sidebar laden,
// @description    und Schlüsselwort können ein-/ausgeblendet werden.
// @include        main
// @author         Alice0775
// @version        2018/03/15 10:30 Fx59 by aborix
// @version        2017/11/17 02:30 Fx57
// @version        2016/03/20 02:30 remove tst hack
// ==/UserScript==
// @version        2015/08/31 02:30 Fx40
// @version        2013/07/07 02:30 fix onFolderMenuListCommand
// @version        2012/12/08 22:30 Bug 788290 Bug 788293 Remove E4X 
// @version        2012/07/24 14:30 Bug 761723 implement toString of function objects by saving source
// @version        2010/12/06 10:30 Bug Bug 597557 - Bookmarks & Identity panels should use an Arrowpanel
// @version        2010/04/01 00:00 Bug 556342  - Invalid Treeview in bookmark menu via star pane
// @version        2009/12/22 00:00 namePickerにフォ－カスあるように
// @version        2009/12/21 14:00 BETTER WORKAROUND FIX  Bug 536024 -  When i expand folder-tree on Edit This Bookmark, the bookmarked folder is changed.
// @version        2009/12/20 16:00 WORKAROUND FIX  Bug 536024 -  When i expand folder-tree on Edit This Bookmark, the bookmarked folder is changed.
// @version        2009/08/11 18:00 Tree Style Tab0.8.2009081101のオブジェクト名変更に対応
// @version        2009/08/07 00:00 Tree Style Tab0.8.2009073102があるとき treestyletab-parent-row'を非表示
// @version        2009/08/06 19:00 Tree Style Tab0.8.2009073102があると一瞬Parent Tabが表示されるのを修正,およびuc.jsに変更した
// @version        2009/08/06 18:00 Tree Style Tab 0.8.2009073102に対応
// @version        2009/06/24 00:00 Firefox3.5 フォルダツリーとタグセレクタのエキスパンダ開閉状態を記憶しなくなっていたのを修正
// @version        2009/01/02 02:00 設定によりdescription, location, loadInSidebar, keywordを表示/非表示
// @version        2009/01/01 22:28
var openbookResizer = {

  drag  :false,
  height: null,
  width : null,
  eventOffset: null,
  timer: null,
  PREHIDEROW   : "userChrome.openbook.hideRow",   //description, location, loadInSidebar, keyword
  PREFTREEHEIGHT: "userChrome.openbook.treeHeight",
  PREFTREEWIDTH : "userChrome.openbook.treeWidth",
  PREFOPENTREE: "userChrome.openbook.openTree",
  PREFOPENTAG : "userChrome.openbook.openTag",

  get tree(){
    return gEditItemOverlay._element('folderTree');
  },

  get getHideRow(){
    try {
      return Services.prefs.getCharPref(this.PREHIDEROW).replace(/\s/g,'').slice(',');
    } catch(e) {
      return [];
    }
  },

  get getPrefTreeHeight(){
    try {
      return Services.prefs.getIntPref(this.PREFTREEHEIGHT);
    } catch(e) {
      return 150;
    }
  },
  get getPrefTreeWidth(){
    try {
      return Services.prefs.getIntPref(this.PREFTREEWIDTH);
    } catch(e) {
      return 250;
    }
  },

  get editBookmarkPanel(){
    return document.getElementById('editBookmarkPanel');
  },

  get treeExpander(){
    return gEditItemOverlay._element('foldersExpander');
  },


  get tagExpander(){
    return gEditItemOverlay._element('tagsSelectorExpander');
  },

  get getPrefOpenTree(){
    try {
      return Services.prefs.getBoolPref(this.PREFOPENTREE);
    } catch(e) {
      return false;
    }
  },

  get getPrefOpenTag(){
    try {
      return Services.prefs.getBoolPref(this.PREFOPENTAG);
    } catch(e) {
      return false;
    }
  },

  get isFx35(){
    return parseInt(Components.classes["@mozilla.org/xre/app-info;1"]
                     .getService(Components.interfaces.nsIXULAppInfo)
                     .version.substr(0,3) * 10, 10) / 10 > 3.0;
  },

  get isFx37(){
    parseInt(Components.classes["@mozilla.org/xre/app-info;1"]
                     .getService(Components.interfaces.nsIXULAppInfo)
                     .version.substr(0,3) * 10, 10) / 10 > 3.6;
  },

  init: function(){
    //window.removeEventListener('load', this, false);
    window.addEventListener('unload', this, false);

    var style = " \
      .openbookResizerGripper { \
        list-style-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAApklEQVQokY3QK4uCURCA4QeDLCoIXoIYNFiUFVZBq2JQEEx+UcTmpi1b121eosX/a5lg8jvTzsy8M+8cGGKNusQY44QMlRTgAzOcsUqBitH0FVCWpzeNpmZsytUb4oY9qil6BfRxDaiZp1eO5OBl01u9JX7QxiRFr4XfmNbFZ+gdojbCBbt4a6CDP/wH1McDR9SwwB1b+I4bejG1ER8xxwaluHOJ8RM+9xjk9q2RpwAAAABJRU5ErkJggg=='); \
        cursor: sw-resize; \
      }";
    var sspi = document.createProcessingInstruction(
      'xml-stylesheet',
      'type="text/css" href="data:text/css,' + encodeURIComponent(style) + '"'
    );
    document.insertBefore(sspi, document.documentElement);
    sspi.getAttribute = function(name) {
    return document.documentElement.getAttribute(name);
    };

    this.folderTreeRow   = this.isFx35 ? "folderTreeRow"   : "folderTree";
    this.tagsSelectorRow = this.isFx35 ? "tagsSelectorRow" : "tagsSelector";

    gEditItemOverlay.initPanel_org = gEditItemOverlay.initPanel;
    gEditItemOverlay.initPanel = function(aInfo) {
      aInfo.hiddenRows = openbookResizer.getHideRow;
      gEditItemOverlay.initPanel_org(aInfo);
    }

    // selected tree visible
    func = gEditItemOverlay.toggleFolderTreeVisibility.toString();
    func = func.replace(
      'var currentFolder = this._getFolderIdFromMenuList();',
      ''
    );
    func = func.replace(
      /expander.className = "expander-up";*/,
      'var currentFolder = this._getFolderIdFromMenuList(); \
      var onselect = this._folderTree.getAttribute("onselect"); \
      this._folderTree.removeAttribute("onselect"); \
      $&;'
    );
    func = func.replace(
      'this._folderTree.focus();',
      '$&; \
      setTimeout(function(tree){ \
        var start = new Object(); \
        var end = new Object(); \
        var numRanges = tree.view.selection.getRangeCount(); \
        if (numRanges > 0) { \
          tree.view.selection.getRangeAt(0,start,end); \
          var v = start.value; \
          tree.treeBoxObject.ensureRowIsVisible(v); \
        } \
        tree.setAttribute("onselect", onselect); \
      }, 0, this._folderTree);'
    );
    try{
      gEditItemOverlay.toggleFolderTreeVisibility = new Function(
         func.match(/\((.*)\)\s*\{/)[1],
         func.replace(/^function\s*.*\s*\(.*\)\s*\{/, '').replace(/}$/, '')
      );
    } catch(ex){}
    
    // selected tree visible
    func = gEditItemOverlay.onFolderMenuListCommand.toString();
    func = func.replace(
      'this._folderTree.selectItems([container]);',
      '{var onselect = this._folderTree.getAttribute("onselect"); \
      this._folderTree.removeAttribute("onselect"); \
      $&; \
      setTimeout(function(tree){ \
        var start = new Object(); \
        var end = new Object(); \
        var numRanges = tree.view.selection.getRangeCount(); \
        if (numRanges > 0) { \
          tree.view.selection.getRangeAt(0,start,end); \
          var v = start.value; \
          tree.treeBoxObject.ensureRowIsVisible(v); \
        } \
        tree.setAttribute("onselect", onselect); \
      }, 0, this._folderTree);}'
    );
    try{
      gEditItemOverlay.onFolderMenuListCommand = new Function(
         func.match(/\((.*)\)\s*\{/)[1],
         func.replace(/^function\s*.*\s*\(.*\)\s*\{/, '').replace(/}$/, '')
      );
    } catch(ex){}


    this.editBookmarkPanel.addEventListener('popupshowing', this, false);
    this.editBookmarkPanel.addEventListener('popupshown', this, false);
    this.editBookmarkPanel.addEventListener('popuphiding', this, false);
  },

  uninit: function(){
    window.removeEventListener('unload', this, false);
    this.editBookmarkPanel.removeEventListener('popupshowing', this, false);
    this.editBookmarkPanel.removeEventListener('popupshown', this, false);
    this.editBookmarkPanel.removeEventListener('popuphiding', this, false);
  },

  handleEvent: function(event){
    switch(event.type){
      case 'unload':
        this.uninit();
        break;
      case 'popupshowing':
        this.popupshowing(event);
        break;
      case 'popupshown':
        this.popupshown(event);
        break;
      case 'popuphiding':
        this.popuphiding(event);
    }
  },

  popuphiding: function(event){
    if (this.editBookmarkPanel != event.originalTarget)
      return;
    var state = !gEditItemOverlay._element(this.folderTreeRow).collapsed;
    Services.prefs.setBoolPref(this.PREFOPENTREE, state);
    var state = !gEditItemOverlay._element(this.tagsSelectorRow).collapsed;
    Services.prefs.setBoolPref(this.PREFOPENTAG, state);

    gEditItemOverlay._element(this.folderTreeRow).collapsed = true;
    gEditItemOverlay._element(this.tagsSelectorRow).collapsed = true;
/*
    // xxx Bug 556342  - Invalid Treeview in bookmark menu via star pane
    var tree = document.getElementById("editBMPanel_folderTree");
    if (!this.isFx37)
      var result = tree.getResult();
      if (result) {
        result.root.containerOpen = false;
      }
      tree.view = null;
      // xxx
    }
*/
  },

  popupshowing: function(event){
    if (this.editBookmarkPanel != event.originalTarget)
      return;

    this.tree.height = this.getPrefTreeHeight;
    //this.tree.width = this.getPrefTreeWidth;
    //this.editBookmarkPanel.width = this.getPrefTreeWidth;

    if (!document.getElementById("openbookResizerbottomBox")) {
      var panel = document.getElementById("editBookmarkPanel");
      
      var innerarrow = document.getAnonymousElementByAttribute(panel, "class", "panel-inner-arrowcontent");
      if (innerarrow)
        innerarrow.setAttribute('flex', 1);

      var box = document.createElement("hbox");
      box.setAttribute('id', 'openbookResizerbottomBox');
      box.setAttribute('align',"start");

      var resizer = document.createElement("image");
      resizer.setAttribute("class", "openbookResizerGripper");
      resizer.setAttribute('onmousedown', 'openbookResizer.mousedown(event)');

      box.appendChild(resizer);
      panel.appendChild(box);

      panel.setAttribute('onmousemove', 'openbookResizer.mousemove(event)');
      panel.setAttribute('onmouseup', 'openbookResizer.mouseup(event)');
    }
  },

  popupshown: function(event){
    if (this.editBookmarkPanel != event.originalTarget)
      return;
    setTimeout(function(self) {
      if (self.getPrefOpenTree &&
          gEditItemOverlay._element(self.folderTreeRow).collapsed ) {
        gEditItemOverlay.toggleFolderTreeVisibility();
      }
      if (self.getPrefOpenTag &&
          gEditItemOverlay._element(self.tagsSelectorRow).collapsed ) {
        gEditItemOverlay.toggleTagsSelector();
      }
      try {
        gEditItemOverlay._element(Services.prefs
          .getCharPref("browser.bookmarks.editDialog.firstEditField")).focus();
      } catch(e) {}
  }, 100, this);
  },

  mousedown: function(event){
    this.drag = true;
    this.height = parseInt(this.tree.boxObject.height);
    this.width = parseInt(this.editBookmarkPanel.boxObject.width);
    this.eventOffset = event;
  },

  mousemove: function(event) {
    if (this.timer)
      clearTimeout(this.timer);
    this.timer = setTimeout(function(event, self){
      if (self.drag) {
        // make sure height [150,screen-300] and width is [300,screen-50]
        var newValue;
        newValue = self.height + event.pageY - self.eventOffset.pageY;
        if (newValue <= screen.height - 300 && newValue >= 150) {
          self.tree.height = newValue;
        }

        newValue = self.width - event.pageX + self.eventOffset.pageX;
        if (newValue <= screen.width - 50 && newValue >= 300) {
          //self.tree.width = newValue;
          self.editBookmarkPanel.width = newValue;
        }

      }
    }, 10, event, this);
  },
  mouseup: function(event) {
    if (this.drag) {
      Services.prefs.setIntPref(this.PREFTREEHEIGHT, this.tree.height);
      Services.prefs.setIntPref(this.PREFTREEWIDTH, this.editBookmarkPanel.boxObject.width);
    }
    this.drag = false;
  }
}
//window.addEventListener("load", openbookResizer, false);
openbookResizer.init();
