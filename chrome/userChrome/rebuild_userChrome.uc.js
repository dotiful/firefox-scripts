// ==UserScript==
// @name            userChromeJS Manager
// @include         main
// @author          xiaoxiaoflood
// @onlyonce
// ==/UserScript==

// original: https://github.com/alice0775/userChrome.js/blob/master/rebuild_userChrome.uc.xul

(function () {

  UC.rebuild = {
    PREF_TOOLSBUTTON: 'userChromeJS.showtoolbutton',

    menues: [],

    onpopup: function (event) {
      let document = event.target.ownerDocument;

      if (event.target != document.getElementById('userChromejs_options'))
        return;

      while (document.getElementById('uc-menuseparator').nextSibling) {
        document.getElementById('uc-menuseparator').nextSibling.remove();
      }

      let enabled = xPref.get(_uc.PREF_ENABLED);

      let mi = event.target.appendChild(this.elBuilder(document, 'menuitem', {
        label: enabled ? 'Enabled' : 'Disabled (click to Enable)',
        oncommand: 'xPref.set(_uc.PREF_ENABLED, ' + !enabled + ');',
        type: 'checkbox',
        checked: enabled
      }));

      if (Object.keys(_uc.scripts).length > 1)
        event.target.appendChild(this.elBuilder(document, 'menuseparator'));

      Object.values(_uc.scripts).forEach(script => {
        if (script.filename === _uc.ALWAYSEXECUTE) {
          return;
        }

        mi = event.target.appendChild(this.elBuilder(document, 'menuitem', {
          label: script.name ? script.name : script.filename,
          oncommand: 'UC.rebuild.toggleScript(_uc.scripts[this.filename]);',
          onclick: 'UC.rebuild.clickScriptMenu(event);',
          type: 'checkbox',
          checked: script.isEnabled,
          class: 'userChromejs_script',
          restartless: !!script.shutdown
        }));
        mi.filename = script.filename;
        let homepage = script.homepageURL || script.downloadURL || script.updateURL || script.reviewURL;
        if (homepage)
          mi.setAttribute('homeURL', homepage);
        mi.setAttribute('tooltiptext', `
          Left-Click: Enable/Disable
          Middle-Click: Enable/Disable and keep this menu open
          Right-Click: Edit
          Ctrl + Left-Click: Reload Script
          Ctrl + Middle-Click: Open Homepage
          Ctrl + Right-Click: Uninstall
        `.replace(/^\n| {2,}/g, '') + (script.description ? '\nDescription: ' + script.description : '')
                                    + (homepage ? '\nHomepage: ' + homepage : ''));

        event.target.appendChild(mi);
      });

      document.getElementById('showToolsMenu').setAttribute('label', 'Switch to ' + (this.showToolButton ? 'button in Navigation Bar' : 'item in Tools Menu'));
    },

    clickScriptMenu: function (event) {
      let script = _uc.scripts[event.target.filename];
      if (event.button == 1) {
        if (event.ctrlKey) {
          let url = event.target.getAttribute('homeURL');
          if (url) {
            gBrowser.addTab(url, {triggeringPrincipal: Services.scriptSecurityManager.createNullPrincipal({})});
          }
        }
        this.toggleScript(script);
        event.target.setAttribute('checked', script.isEnabled);
      } else if (event.button == 2) {
        if (event.ctrlKey) {
          this.uninstall(script);
        } else {
          this.launchEditor(script);
        }
        closeMenus(event.target);
      } else if (event.button == 0 && event.ctrlKey) {
        this.toggleScript(script);
      }
    },

    launchEditor: function (script) {
      let editor = xPref.get('view_source.editor.path');
      if (editor) {
        let appfile = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsIFile);
        appfile.initWithPath(editor);
        let process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
        process.init(appfile);
        process.run(false, [script.file.path], 1, {});
      } else {
        const {ScratchpadManager} = ChromeUtils.import('resource://devtools/client/scratchpad/scratchpad-manager.jsm');
        ScratchpadManager.openScratchpad({
          'filename': script.file.path,
          'text': _uc.readFile(script.file),
          'saved': true,
        });
      }
    },

    toggleScript: function (script) {
      if (script.isEnabled) {
        xPref.set(_uc.PREF_SCRIPTSDISABLED, script.filename + ',' + xPref.get(_uc.PREF_SCRIPTSDISABLED));
      } else {
        xPref.set(_uc.PREF_SCRIPTSDISABLED, xPref.get(_uc.PREF_SCRIPTSDISABLED).replace(new RegExp('^' + script.filename + ',|,' + script.filename), ''));
      }

      if (script.isEnabled && !_uc.everLoaded.includes(script.id)) {
        this.install(script);
      } else if (script.isRunning && !!script.shutdown) {
        this.shutdown(script);
      }
    },

    toggleUI: function (byaboutconfig = false, startup = false) {
      this.showToolButton = xPref.get(this.PREF_TOOLSBUTTON);
      if (!byaboutconfig && !startup) {
        this.showToolButton = xPref.set(this.PREF_TOOLSBUTTON, !this.showToolButton);
      }

      _uc.windows((doc) => {
        doc.getElementById('userChromebtnMenu').hidden = this.showToolButton;
        doc.getElementById('userChromejs_Tools_Menu').hidden = !this.showToolButton;
        if (this.showToolButton) {
          doc.getElementById('userChromejs_Tools_Menu').appendChild(doc.getElementById('userChromejs_options'));
        } else if (!startup) {
          doc.getElementById('userChromebtnMenu').appendChild(doc.getElementById('userChromejs_options'));
        }
      });
    },

    install: function (script) {
      script = _uc.getScriptData(script.file);
      Services.obs.notifyObservers(null, 'startupcache-invalidate');
      _uc.windows((doc, win, loc) => {
        if (win._uc && script.regex.test(loc.href)) {
          _uc.loadScript(script, win);
        }
      }, false);
    },

    uninstall: function(script) {
      if (!confirm('Do you want to uninstall this script? The file will be deleted.'))
        return;

      this.shutdown(script);
      script.file.remove(false);
      xPref.set(_uc.PREF_SCRIPTSDISABLED, xPref.get(_uc.PREF_SCRIPTSDISABLED).replace(new RegExp('^' + script.filename + ',|,' + script.filename), ''));
    },

    shutdown: function (script) {
      if (script.shutdown) {
        _uc.windows((doc, win, loc) => {
          if (script.regex.test(loc.href)) {
            try {
              eval(script.shutdown);
            } catch (ex) {
              console.error(ex);
            }
            if (script.onlyonce)
              return true;
          }
        }, false);
        script.isRunning = false;
      }
    },
    
    elBuilder: function (doc, tag, props) {
      let el = doc.createElement(tag);
      for (let p in props) {
        el.setAttribute(p, props[p]);
      }
      return el;
    },

    init: function () {
      this.showToolButton = xPref.get(this.PREF_TOOLSBUTTON);
      if (this.showToolButton === undefined) {
        this.showToolButton = xPref.set(this.PREF_TOOLSBUTTON, false, true);
      }

      xPref.addListener(this.PREF_TOOLSBUTTON, function (value, prefPath) {
        UC.rebuild.toggleUI(true);
      });

      xPref.addListener(_uc.PREF_ENABLED, function (value, prefPath) {
        Object.values(_uc.scripts).forEach(script => {
          if (script.filename == _uc.ALWAYSEXECUTE)
            return;
          if (value && script.isEnabled && !_uc.everLoaded.includes(script.id)) {
            UC.rebuild.install(script);
          } else if (!value && script.isRunning && !!script.shutdown) {
            UC.rebuild.shutdown(script);
          }
        });
      });

      CustomizableUI.createWidget({
        id: 'userChromebtnMenu',
        type: 'custom',
        defaultArea: CustomizableUI.AREA_NAVBAR,
        onBuild: function (aDocument) {
          let toolbaritem = UC.rebuild.elBuilder(aDocument, 'toolbarbutton', {
            id: 'userChromebtnMenu',
            label: 'userChromeJS',
            tooltiptext: 'userChromeJS Manager',
            type: 'menu',
            class: 'toolbarbutton-1 chromeclass-toolbar-additional',
            style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABeSURBVDhPY6AKSCms+x+SkPMfREOFwACXOAYYNQBVITrGJQ7CUO0IA0jFUO0QA3BhkEJs4iAM1Y4bgBTBDIAKkQYGlwHYMFQZbgBSBDIAF4Yqww3QbUTHUGWUAAYGAEyi7ERKirMnAAAAAElFTkSuQmCC)',
            popup: 'userChromejs_options'
          });

          let mp = UC.rebuild.elBuilder(aDocument, 'menupopup', {
            id: 'userChromejs_options',
            onpopupshowing: 'UC.rebuild.onpopup(event);',
            oncontextmenu: 'event.preventDefault();'
          });
          toolbaritem.appendChild(mp);

          let mg = mp.appendChild(aDocument.createElement('menugroup'));
          mg.setAttribute('id', 'uc-menugroup');

          let mi1 = UC.rebuild.elBuilder(aDocument, 'menuitem', {
            id: 'userChromejs_openChromeFolder',
            label: 'Open chrome directory',
            class: 'menuitem-iconic',
            flex: '1',
            style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABe0lEQVQ4jc3N2ytDARwH8J83/wRKefU3zFBCSnlQSnkQpSiFFLk8OMQmxLBZLos2I7ckM3PmMmEredF23Ma2GrPjkuFsvh7mstTqnDff+jx+v1+ifxEZ43zPYFyIld3FHWYxzlRRA5mdXFi3c4vpvbuo3TvU6z2CnHEKf4djRd9bLYnyDldkYtuPqZ1b0TIYF2StlkTK6eaQ080ht+eLgkPeH/nflGc/8hRRVNB7BuVaAGPWILRsDCsfl4bl0bMaQGHfOaho4AL9pns0GPyo04vTYPCjz3SP4sELUInqEkObPNoXA5IMmoMoHbkClWncUG8/QLnOS6K2PqJc6wZVjl9jyvYMtfVJEp3tGVWTN6Bq3Q2M9hBmDl4kMTpCqJ32gOr1XmHp+BUrJ2+SLB2/onHWK1DLvG95lOU/Nk4FbLnCcbHcL/OpgFGWj7Qt+AxUo7an12qOHM1Gb6R5zgcxmozecLVq31YxvJ9GRJRARElElExEKSIlf3USPgHT/mSv7iPTOwAAAABJRU5ErkJggg==)',
            oncommand: 'Services.dirsvc.get(\'UChrm\', Ci.nsIFile).launch();'
          });
          mg.appendChild(mi1);

          let tb = UC.rebuild.elBuilder(aDocument, 'toolbarbutton', {
            id: 'userChromejs_restartApp',
            tooltiptext: 'Restart Firefox',
            style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB20lEQVQ4jY2Tv2sUURDHZ/bX7eW0ChJBRFKIRRCRIEHuzVvfrYmkSiFXSSoLERERy5B/wcIuqG9mN5VecUWwCqkOEQsLKysLsQgSxEJEgsVYeJfsHXuY4tvN9zMzzHxBVXFS8Gy1kRaZi8U+iCV7HIq73Xqez9XWThoDsRvg6QDY6Ji8+RMK9dLSztcCoMhnkc27YxPth0I7oVAPhT5WYD9ScfkYALYWYxQa/OvU/h5ztg5bi3G1U2vbXUFPb4fT/EzELRwBYraPRvSE7eW6XVUV4en1JjLtARtFoYGqInRfd0Nk8wXYaCzZ/WnmkZrengc2v4GNNr1bglPiFoaj/5orV1r/A6gqhkI9YKMB0yY0OF9GsV/jIts9iVlVMeJscwhgOKmpqoDpGNDg5YuB0HYg9lUotINCuxFn/bN+9czUFZj6wEYDsRsQle7W+NPQ/uhEdUpLOw/cPgQ2OlPcvAoJZ90qICnc2tQzlist9GYAbDRk2lNVhFDs3YmXPUjkxp3JR2qWbgk9fRj9S+Olu6SqCJHYJ+DN5xnOryHT+wrsG7J9g0x9ZPup2iAS1z6aKi076+mLzoVRmKJpYeL2YSC2aBadc1PTOB7n3AXe3guYHiberZ0u8tm62r99Gyd0lo7sIAAAAABJRU5ErkJggg==)',
            oncommand: 'Services.appinfo.invalidateCachesOnRestart();BrowserUtils.restartApplication();'
          });
          mg.appendChild(tb);

          let mn = UC.rebuild.elBuilder(aDocument, 'menu', {
            id: 'uc-manageMenu',
            label: 'Settings',
            class: 'menuitem-iconic',
            style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADJUlEQVQ4ja1TS0wTQRgean0/ovFgTDxpjDc9Gg8mvSrnKhFSC8VpCuyyu22Xbdm2s7Rdt48t7kIhEJEIYiKKphZK0CoRLVYlHiAEFYMng4+bF6nUjgfbuiocTPwuM5P83/d/8z8AWAMIIX3xWvHHCYxG44a1OOuCIIhd2rfZbN7yTwIURe0+D8lAbSO3aLI21xgMBn2dzXbQZLM/MNkcEwRNnyw6rFhTAEK4ESGkc/L8IacgY1Hpw1xbbLWBFT5QrRe/+GM92Bfpxg4Xkotf3LSuGAAA1DcypC/cnWuL9a5yQQXzUifmApewR4pjUenLESzKQAi3rUmmaXqrpYF0WBqYDrtXynnDceyR1JW7E5Opqcwz9Ul2pr+zb+gdF2jHnlAnvkC6piw2WmikHCeKEj+dmWDTuSZXEPsiXdgb6Sr4o/HlV4uLZ5LJZDnz0tLSkeE7YyMt/nbcFuvBrqCCqyGdhhBuLAtF2jvE1osd+UCsZ8Xhi3yfnMqYNYZ1pcB0Or1X6bm64BLVvCcczwflrrcsy+4sBVaMjo7u6R248ZDiJaz0Ds4PDAxs1woAAIDBYNADAMBIIsU6BRm7RWUlm31x+rduAQCAEFICDkEu+MTYuMZJGUajcQNCQBeU2ivZNrng8ssfNYNb7FQ9caCusSUrRLsLFtL9ppogdhUnuCxWSniursHnFtWCwyvlqmttNUA7U1bSeYnxSNgXin91CtFCdT1hLwkghPSltYAQ7rcy/LI3HM+7RaUAKfdnjuP2lB0NjyQq3X45R7eK2ImiuIkV8mdNVsZspnaXYqpq4XGzjXneIsjY7g1hkvPjvsHhm9o6AlVVN2ezL6oyz2fsATn+yemLYModxDWQfm2luAmTjXlsaXbnWvwxTPNS4XZy/Nrj6em6ZDJ57Lc50mJyKlNDugLfPJKaY4UovsB4MeEKYE+oI0/z4mr3laFUKpXa/BfxV3uRHgCg43n/YZITvtfTPEYh9f1Y+tGDy4M3X1oZTx4yXsyjYFhT/PV3DSG0Y3Z+oen6rcT92fn5Uwgh3dzc3L7xe5P9T57OXE4kEkfXJf8P/ABlOH7kn81/zwAAAABJRU5ErkJggg==)'
          });
          mp.appendChild(mn);

          let mp2 = mn.appendChild(aDocument.createElement('menupopup'));

          let mi2 = UC.rebuild.elBuilder(aDocument, 'menuitem', {
            id: 'showToolsMenu',
            label: 'Switch display mode',
            class: 'menuitem-iconic',
            style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADdklEQVQ4jXWTbUwUdADG/7zccZ6lQ/pgcDJEEEGBO8/hmLQY9mKOmFvyEi93IIISSSMGxx0Hw0QKJJCOI3CxGM0IhEASjDsQ1lgdRuqcE4N0RznTjPFSDGJwvz64nOX6bc+35+XTI8R/KRXOG6LFwcAEj+7d2b4PI3L8ltQZiuuKaGmp5yER8JT/Sco/0e+JylP1xNfuXTrWEU/+BQ26Pi3vnk8ioyWG10pU9lj9S4VjY2Pyp4cbcxP36PyW83tTKBnMwDhwiCJrGkXWVIzWNIoH0ikezCTxTBRROcG9k5O2dY/Dp5qKwyN0W5aMgxkYLKkYrakYB7XorAnorPEUWOLJ749D159E6dBRIj7cRIhW8fmj5dJI16jc4L78vhQK+zUYrCkUDrxJtS0P6+12hu3dDNu7sNw+R8vVahK+2E1onQyvHOE4YIyIFOv3i7gEU+RyoUVD2dBbXL9v46tbLRiHkum8cYbv7SNcsdsA6L/RTVCVMzvNMkJq5GyMF50iMNnDktV2gNPfGrj3xxT/MDL1NcXDSRgGEzh+6TArLNM+2sy2SkFYgxxVnZwtWdK7Iizbe67hu3Lml2bAAQ6H43HJ+IOrvDeiRdunYmFllnOXWwioEuxqlKGskxGgk/4lIt7xX6keLsJ06QSnLAbG719jaXmJin4d+t5UDraGENOhYGFlnq4fWlHXyon6dCORTV5s1UkdQpn+/ERa66tkdu0jpTOcb36+yIO5GcJN7rzS5kHPZAe/LPzK7Moq9/6cY2LWzs2Htzjc+gbe2U4zwnO/c2XQcRlq81p2mASt45/x4+/TKKsk7GoW7DuroGein99WYRqYnJsn5eM4fIwueGucrojgrPW+vkekUyEmN7bXCppvtnFnEYoHijhxWU/yhRcIa1xLzWg9vT9d48X31XiXCALL3AjUuhcIIYSI0ccU+BgEwSZX3u49Qr2tjXrblzSMnueD4QZebtqGss4FZYUH/icFoSY5Co3T3cT6LHchhBCx5thnFAnSi0FlMnbUSgg46UxguQtBFS4EV7qhrn0WtXkNyjo3Qj+Ss/moZHF7uvvr//qC37EN6xSxLmf98iSOkBoZKvMadtY/ksosR2mSE1Qmw0cjsXunuUT/7yO9tK57vZMl7ZuzpHf8C6SLW/XSVf9cybRPquvopmRng2emeO5J/98W5fyDGAVpggAAAABJRU5ErkJggg==)',
            oncommand: 'UC.rebuild.toggleUI();'
          });
          mp2.appendChild(mi2);

          let sep = mp.appendChild(aDocument.createElement('menuseparator'));
          sep.setAttribute('id', 'uc-menuseparator');

          let menuitem = aDocument.getElementById('menu_ToolsPopup').insertBefore(UC.rebuild.elBuilder(aDocument, 'menu', {
            id: 'userChromejs_Tools_Menu',
            label: 'userChromeJS Manager',
            tooltiptext: 'UC Script Manager',
            class: 'menu-iconic',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABeSURBVDhPY6AKSCms+x+SkPMfREOFwACXOAYYNQBVITrGJQ7CUO0IA0jFUO0QA3BhkEJs4iAM1Y4bgBTBDIAKkQYGlwHYMFQZbgBSBDIAF4Yqww3QbUTHUGWUAAYGAEyi7ERKirMnAAAAAElFTkSuQmCC',
          }), aDocument.getElementById('menu_preferences'));

          let menupopup = aDocument.getElementById('userChromejs_options');
          UC.rebuild.menues.forEach(menu => {
            menupopup.insertBefore(menu, aDocument.getElementById('uc-menuseparator'));            
          })

          let pi = aDocument.createProcessingInstruction(
            'xml-stylesheet',
            'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(`
            #userChromejs_options menuitem[restartless="true"] {
              color: blue;
            }
            #uc-menugroup .menu-iconic-icon {margin-left:2px;}
            `.replace(/[\r\n\t]/g, '')) + '"'
          );
          aDocument.insertBefore(pi, aDocument.documentElement);

          aDocument.defaultView.setTimeout((() => UC.rebuild.toggleUI(false, true)), 1000);

          return toolbaritem;
        }
      });
    }
  }

  UC.rebuild.init();
})()
