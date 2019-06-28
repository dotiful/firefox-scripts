# Firefox Scripts

[![Dependency Status](https://david-dm.org/dotiful/firefox-scripts.svg)](https://david-dm.org/dotiful/firefox-scripts)
[![devDependency Status](https://david-dm.org/dotiful/firefox-scripts/dev-status.svg)](https://david-dm.org/dotiful/firefox-scripts#info=devDependencies)


## userChrome.css

- [Aris-t2/CustomCSSforFx](https://github.com/Aris-t2/CustomCSSforFx) - custom CSS tweaks for Firefox Quantum

- ['Classic' CSS tweaks](https://github.com/Aris-t2/CustomCSSforFx/issues/2#show_issue) - A lot of excellent information regarding userChrome.css

- [Timvde/UserChrome-Tweaks](https://github.com/Timvde/UserChrome-Tweaks) - a community maintained repository of userChrome.css tweaks for Firefox

- [stonecrusher/simpleMenuWizard](https://github.com/stonecrusher/simpleMenuWizard) - Hide contextmenu items in Firefox

## userChrome.js
- [dupontjoy/userChrome.js-Collections](https://github.com/dupontjoy/userChrome.js-Collections-) - UC scripts collections

- [Endor8/userChrome.js](https://github.com/Endor8/userChrome.js) - Scripts for the Firefox extension userChrome.js

- [Aris-t2/CustomJSforFx](https://github.com/Aris-t2/CustomJSforFx) - custom scripts

- [xiaoxiaoflood/firefox-scripts](https://github.com/xiaoxiaoflood/firefox-scripts) - userChromeJS / autoconfig.js and extensions

- <details>
    <summary>used scripts</summary>

    - [aboutbutton](https://github.com/Endor8/userChrome.js/tree/master/aboutbutton)

    - [move reload into urlbar](https://github.com/Endor8/userChrome.js/blob/master/Updates%202019/move_reload_into_url.uc.js)

    - [About Config Button](https://github.com/Endor8/userChrome.js/tree/master/aboutconfigbutton)

    - [About Config Multiple Selection](https://github.com/Endor8/userChrome.js/tree/master/aboutconfigmultipleselection)
  </details>

## user.js

- [gocom/pinceau](https://github.com/gocom/pinceau) - Personal Firefox userChrome and preference customizations

- [pyllyukko/user.js](https://github.com/pyllyukko/user.js) - firefox configuration hardening

- [user.js](http://kb.mozillazine.org/User.js_file) - configuration file for Firefox designed to harden browser settings and make it more secure

- [ghacksuserjs/ghacks-user.js](https://github.com/ghacksuserjs/ghacks-user.js) - an ongoing comprehensive user.js template for configuring and hardening Firefox privacy, security and anti-fingerprinting

## Themes

- [muckSponge/MaterialFox](https://github.com/muckSponge/MaterialFox) - A Material Design-inspired userChrome.css theme for Firefox

- [Quantum-Nox-Firefox-Dark-Full-Theme](https://github.com/Izheil/Quantum-Nox-Firefox-Dark-Full-Theme) - these usercontent and userchrome files will give a full themed dark color to Firefox Quantum, menus and dialogs included, as well as the scrollbars

- [overdodactyl/ShadowFox](https://github.com/overdodactyl/ShadowFox) - a universal dark theme for Firefox

- [FOXSCAPEuC by Michael Walden](mw.rat.bz/foxscapeuc/) - a full featured retro theme for Firefox that makes Firefox look like Netscape 4.x, Netscape 6+ "Classic" theme

## Other documentation
- [Add-ons — server](https://addons-server.readthedocs.io/en/latest/topics/api/addons.html) - Add-ons API documentation

- [Source Tree Docs](https://firefox-source-docs.mozilla.org/index.html#) - Mozilla Source Tree Docs 69.0a1 documentation

- [Are We XBL Still?](https://bgrins.github.io/xbl-analysis/) - site contains tools for understanding and working with XBL code in Firefox to make it easier to replace

- [Searchfox](https://searchfox.org) -  Searchfox is a source code indexing tool for Mozilla Firefox.

- [firefox-source-docs](https://firefox-source-docs.mozilla.org) - Mozilla Source Tree Docs 69.0a1 documentation

- [userchrome.org](https://www.userchrome.org) - userChrome.css for Customizing Firefox

- [MozillaZine Knowledge Base](http://kb.mozillazine.org/index.php?title=UserChrome.css) - userChrome.css

- [File I/O | MDN](https://developer.mozilla.org/en-US/docs/Archive/Add-ons/Code_snippets/File_I_O#Getting_special_files) - a full listing of directory tokens

- [about:config entries](http://kb.mozillazine.org/About:config_entries) - reference to the entries in about:config

- [overview of about:config](https://www.ghacks.net/overview-firefox-aboutconfig-security-privacy-preferences/) - security and privacy preferences

## Extensions

### general

- [Surfingkeys](https://addons.mozilla.org/en-US/firefox/addon/surfingkeys_ff/?src=search) - Map your keys for web surfing, expand your browser with javascript and keyboard

- [Tampermonkey](https://addons.mozilla.org/ru/firefox/addon/tampermonkey/) - Tampermonkey is the world's most popular userscript manager

- [Simple Translate](https://addons.mozilla.org/en-US/firefox/addon/simple-translate/) - Quickly translate selected text on web page
  <details>
    <summary>settings</summary>

    ### Web page

    | **key**                                     | **value** |
    |-------------------------------------------- | --------- |
    | Automatically switch to the second language | true      |

    ### General

    | **key**                     | **value** |
    |---------------------------- |---------  |
    | Target language             | russian   |
    | Secong language             | english   |
    | Show translation candidates | false     |

    ### Translation button

    | **key**                      | **value** |
    |------------------------------|-----------|
    | Display position - Direction | Bottom    |
    | Display position - Offset    | 20        |

    ### Translation panel

    | **key**                              | **value**                                                                                |
    |--------------------------------------|------------------------------------------------------------------------------------------|
    | Width                                | 480px                                                                                    |
    | Height                               | 320px                                                                                    |
    | Font size                            | 14px                                                                                     |
    | Display position - Reference point   | Clicked Point                                                                            |
    | Display position - Direction         | Bottom                                                                                   |
    | Display position - Offset            | 20                                                                                       |
    | Font color of translation result     | ![color](https://via.placeholder.com/10/ffffff?text=+) `#ffffff`<br>`rgb(255, 255, 255)` |
    | Font color of translation candidates | ![color](https://via.placeholder.com/10/e3ded5?text=+) `#e3ded5`<br>`rgb(227, 222, 213)` |
    | Background-color                     | ![color](https://via.placeholder.com/10/007997?text=+) `#007997`<br>`rgb(0, 121, 151)`   |

    ### Preview

    ![screenshoot](https://i.imgur.com/3czIumx.png)

    ----
  </details>

- [Auto Tab Discard](https://addons.mozilla.org/en-US/firefox/addon/auto-tab-discard/) - Use native tab discard method to automatically reduce memory usage of inactive tabs
  <details>
    <summary>settings</summary>

    ### Discarding options

    | **key**                     | **value**          |
    |-----------------------------|--------------------|
    | discard after               | 600ms              |
    | when number of tabs exceeds | 3                  |
    | display in context menu     | false              |
    | do not discard when offline | true               |
    | toolbar click action        | discard other tabs |
    ----
  </details>

- [1Password X](https://addons.mozilla.org/en-US/firefox/addon/1password-x-password-manager/?src=collection) - The best way to experience 1Password in your browser

- [Adguard AdBlocker](https://addons.mozilla.org/en-US/firefox/addon/adguard-adblocker/?src=search) - Unmatched adblock extension against advertising and pop-ups

### ui

- [Dark Reader](https://addons.mozilla.org/en-US/firefox/addon/darkreader/?src=collection) - Dark mode for every website

- [Stylus](https://addons.mozilla.org/en-US/firefox/addon/styl-us/) - Easily install custom themes from popular online repositories, or create, edit, and manage your own personalized CSS stylesheets

### bookmarks

- [Bookmarks Organizer](https://addons.mozilla.org/en-US/firefox/addon/bookmarks-organizer/) - Put order in your bookmarks, find no longer working bookmarks, redirects, duplicates and more

- [Bookmark Dupes](https://addons.mozilla.org/en-US/firefox/addon/bookmark-dupes/) - Display/Remove duplicate bookmarks, empty folders or descriptions

- [Checkmarks](https://addons.mozilla.org/en-US/firefox/addon/checkmarks-web-ext/) - Check bookmarks and reload favicons

- [Raindrop.io](https://addons.mozilla.org/en-US/firefox/addon/raindropio/) - Keep your favorites handy

### extension development

- [EmailThis/extension-boilerplate](https://github.com/EmailThis/extension-boilerplate) - A template for building cross browser extensions for Chrome, Opera & Firefox

- [Extension source viewer](https://addons.mozilla.org/en-US/firefox/addon/crxviewer/) - View source code of Firefox add-ons and Chrome extensions (crx/nex/xpi) from addons.mozilla.org, the Chrome Webstore and elsewhere

- [Chrome Store Foxified](https://addons.mozilla.org/en-US/firefox/addon/chrome-store-foxified/?src=github) - Enables the Google Chrome Store and Opera Addons Website for Firefox. Point and click to install Opera/Chrome extensions straight into firefox

### rss

- [Feed Indicator](https://addons.mozilla.org/en-US/firefox/addon/feed-indicator/?src=search) - Adds an icon to indicate RSS/Atom feeds to address bar and previews a feed

- [Feed Preview](https://addons.mozilla.org/en-US/firefox/addon/feed-preview/) - Indicates available RSS and Atom feeds and renders previews

### other

- [Tab Session Manager](https://addons.mozilla.org/en-US/firefox/addon/tab-session-manager/) - Save and restore the state of windows and tabs

- [Tab Suspender](https://addons.mozilla.org/en-US/firefox/addon/ff-tab-suspender/) - Native, lightweight and performant open source extension that reduce Firefox's memory usage

- [Multi-Account Containers](https://addons.mozilla.org/en-GB/firefox/addon/multi-account-containers/) - Multi-Account Containers lets you keep parts of your online life separated into color-coded tabs that preserve your privacy

- [I'm not robot captcha clicker](https://addons.mozilla.org/en-US/firefox/addon/i-m-not-robot-captcha-clicker/) - I'm not robot captcha automatic clicker
