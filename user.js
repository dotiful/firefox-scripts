//
// ─── GENERAL ─────────────────────────────────────────────────────────────────
//

// enable supports of userChrome.css and userContent.css
// @see https://www.ghacks.net/2019/05/24/firefox-69-userchrome-css-and-usercontent-css-disabled-by-default/
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// display about:config normally without a warning
user_pref("general.warnOnAboutConfig", false);

// change the interface language "en-US/ru-RU"
user_pref("intl.locale.requested", "en-US");

// disable cycles through tabs in recently used order
user_pref("browser.ctrlTab.recentlyUsedOrder", false);

// disable spell checking
user_pref("layout.spellcheckDefault", 0);

// enable alt+click on the link for download without prompts
user_pref("browser.altClickSave", true);

// save files with unknown mime type
user_pref("browser.helperApps.neverAsk.saveToDisk", "application/msword, application/csv, application/ris, text/csv, image/png, image/svg+xml, application/pdf, text/html, text/plain, application/zip, application/x-zip, application/x-zip-compressed, application/download, application/octet-stream");

// disable auto install updates
user_pref("app.update.auto", false);

// disable background service to install updates
user_pref("app.update.service.enabled", false);

// disable auto update search engines
user_pref("browser.search.update", false);

// customize items in toolbar
user_pref("browser.uiCustomization.state", "{\"placements\":{\"widget-overflow-fixed-list\":[],\"nav-bar\":[\"back-button\",\"forward-button\",\"stop-reload-button\",\"home-button\",\"customizableui-special-spring1\",\"sync-button\",\"urlbar-container\",\"customizableui-special-spring2\",\"downloads-button\",\"library-button\",\"sidebar-button\",\"onepassword4_agilebits_com-browser-action\",\"_d634138d-c276-4fc8-924b-40a0ea21d284_-browser-action\",\"_c2c003ee-bd69-42a2-b0e9-6f34222cb046_-browser-action\",\"_a8332c60-5b6d-41ee-bfc8-e9bb331d34ad_-browser-action\",\"simple-translate_sienori-browser-action\",\"adguardadblocker_adguard_com-browser-action\",\"_7a7a4a92-a2a0-41d1-9fd7-1e92480d612d_-browser-action\",\"addon_darkreader_org-browser-action\",\"firefoxbeta_tampermonkey_net-browser-action\",\"firefox_tampermonkey_net-browser-action\",\"fxa-toolbar-menu-button\"],\"TabsToolbar\":[\"tabbrowser-tabs\",\"new-tab-button\",\"alltabs-button\"],\"PersonalToolbar\":[\"personal-bookmarks\"]},\"seen\":[\"developer-button\",\"_c2c003ee-bd69-42a2-b0e9-6f34222cb046_-browser-action\",\"_a8332c60-5b6d-41ee-bfc8-e9bb331d34ad_-browser-action\",\"simple-translate_sienori-browser-action\",\"firefoxbeta_tampermonkey_net-browser-action\",\"onepassword4_agilebits_com-browser-action\",\"_d634138d-c276-4fc8-924b-40a0ea21d284_-browser-action\",\"_7a7a4a92-a2a0-41d1-9fd7-1e92480d612d_-browser-action\",\"webide-button\",\"adguardadblocker_adguard_com-browser-action\",\"addon_darkreader_org-browser-action\",\"firefox_tampermonkey_net-browser-action\"],\"dirtyAreaCache\":[\"nav-bar\",\"TabsToolbar\",\"PersonalToolbar\"],\"currentVersion\":16,\"newElementCount\":12}");

// disable beforeunload events (e.g. “Are you sure you want to leave this page?”
user_pref("dom.disable_beforeunload", true);

// disable screenshots
user_pref("extensions.screenshots.disabled", true);

// place the scrollbar on the left side of the content
// user_pref("layout.scrollbar.side", 3);


//
// ─── UI ──────────────────────────────────────────────────────────────────────
//

// enable dark-mode
user_pref("browser.in-content.dark-mode", true);
user_pref("ui.systemUsesDarkTheme", 1);

// move sidebar to right
user_pref("sidebar.position_start", false);

// disable autoplay
user_pref("media.autoplay.default", 1);

// disable zoom with cmd+scroll
user_pref("mousewheel.with_meta.action", 1);

// tab audio icon
user_pref("browser.tabs.showAudioPlayingIcon", true);


//
// ─── HOME ────────────────────────────────────────────────────────────────────
//

// restore previous session
user_pref("browser.startup.page", 3);

// 4 rows of top sites
user_pref("browser.newtabpage.activity-stream.topSitesRows", 4);

// pinned sites top sites
user_pref("browser.newtabpage.pinned", "[{\"url\":\"https://github.com/\",\"label\":\"github\"},{\"url\":\"https://gist.github.com/dotiful?direction=deschttps://gist.github.com/dotiful?direction=desc&sort=updated\",\"label\":\"gists\"},{\"url\":\"https://github.com/dotiful?tab=stars\",\"label\":\"stars\"},{\"url\":\"https://gitlab.com/?nav_source=navbar\",\"label\":\"gitlab\",\"customScreenshotURL\":\"https://i.imgur.com/AGSiONj.png\"},{\"url\":\"https://eu-central-1.console.aws.amazon.com/ec2/v2/home?region=eu-central-1#Instances:sort=instanceId\",\"label\":\"aws\",\"customScreenshotURL\":\"https://i.imgur.com/irpKuOG.png\"},{\"url\":\"https://console.cloud.google.com/home/dashboard?authuser=2&project=alfred-yt\",\"label\":\"GCP\",\"customScreenshotURL\":\"https://i.imgur.com/XUwMPRs.png\"},{\"url\":\"https://dash.cloudflare.com\",\"label\":\"cloudflare\",\"customScreenshotURL\":\"https://i.imgur.com/2dddPbm.png\"},{\"url\":\"https://adhome.ml/\",\"label\":\"adhome\",\"customScreenshotURL\":\"https://i.imgur.com/dgvkfMl.png\"},{\"url\":\"https://www.google.com.ua/\",\"label\":\"google\",\"customScreenshotURL\":\"https://i.imgur.com/rT7EyzQ.png\"},{\"url\":\"https://mail.google.com/mail/u/0/\",\"label\":\"artdev\",\"customScreenshotURL\":\"https://i.imgur.com/2PwPKoS.png\"},{\"url\":\"https://mail.google.com/mail/u/1/\",\"label\":\"dots\",\"customScreenshotURL\":\"https://i.imgur.com/2PwPKoS.png\"},{\"url\":\"https://mail.google.com/mail/u/2/\",\"label\":\"wrt\",\"customScreenshotURL\":\"https://i.imgur.com/2PwPKoS.png\"},{\"url\":\"https://www.youtube.com/\",\"label\":\"youtube\",\"customScreenshotURL\":\"https://i.imgur.com/W5nyO7W.png\"},{\"url\":\"https://drive.google.com/\",\"label\":\"drive\",\"customScreenshotURL\":\"https://i.imgur.com/41EIr4Q.png\"},{\"url\":\"https://translate.google.com.ua/#view=home&op=translate&sl=auto&tl=ru\",\"label\":\"translate\",\"customScreenshotURL\":\"https://i.imgur.com/iiTj8hF.png\"},{\"url\":\"https://www.google.com.ua/maps\",\"label\":\"maps\",\"customScreenshotURL\":\"https://i.imgur.com/FSx9cpO.png\"},{\"url\":\"https://web.telegram.org/\",\"label\":\"telegram\",\"customScreenshotURL\":\"https://i.imgur.com/VijQNyZ.png\"},{\"url\":\"https://www.inoreader.com/\",\"label\":\"inoreader\",\"customScreenshotURL\":\"https://i.imgur.com/9qiR748.png\"},{\"url\":\"https://www.integromat.com/org/247512\",\"label\":\"integromat\",\"customScreenshotURL\":\"https://i.imgur.com/6FEgChu.png\"},{\"url\":\"https://twitter.com/artdevjs/lists/feed\",\"label\":\"twitter\",\"customScreenshotURL\":\"https://i.imgur.com/sfAkrOp.png\"},{\"url\":\"https://outlook.live.com/mail/inbox\",\"label\":\"outlook\",\"customScreenshotURL\":\"https://i.imgur.com/tK0xCo0.png\"},{\"url\":\"https://www.dropbox.com/home\",\"label\":\"dropbox\",\"customScreenshotURL\":\"https://i.imgur.com/gl866wD.png\"},{\"url\":\"https://my.1password.com/home\",\"label\":\"1password\",\"customScreenshotURL\":\"https://i.imgur.com/PHOaimF.png\"},{\"url\":\"https://artdevjs.imgur.com/all\",\"label\":\"imgur\",\"customScreenshotURL\":\"https://i.imgur.com/hMG9e10.jpg\"},{\"url\":\"https://www.olx.ua/\",\"label\":\"olx\",\"customScreenshotURL\":\"https://i.imgur.com/hxq5fjB.png\"},{\"url\":\"http://ex-fs.net/subnews/\",\"label\":\"ex-fs\",\"customScreenshotURL\":\"https://i.imgur.com/cEmz6Sr.png\"},{\"url\":\"https://myshows.me/\",\"label\":\"myshows\",\"customScreenshotURL\":\"https://i.imgur.com/1RKrjKy.png\"}]");

// set home page url
user_pref("browser.startup.homepage", "https://www.google.com.ua/");

// disable web search input on new page
user_pref("browser.newtabpage.activity-stream.showSearch", false);

// disable recommend extension from Firefox
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);

// disable recommend features from Firefox
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);

// disable highlights
user_pref("browser.newtabpage.activity-stream.feeds.section.highlights", false);

// disable pocket
user_pref("extensions.pocket.enabled", false);

// hide pages saved to pocket on new page
user_pref("browser.newtabpage.activity-stream.section.highlights.includePocket", false);

// disable snippets from home content
user_pref("browser.newtabpage.activity-stream.feeds.snippets", false);


//
// ─── SEARCH ──────────────────────────────────────────────────────────────────
//

// disable URL autocomplete
// user_pref("browser.urlbar.autoFill", false);

// decode copied urls instead of encode
user_pref("browser.urlbar.decodeURLsOnCopy", true);

// history-first search suggestions in the url bar
user_pref("browser.urlbar.matchBuckets", "general:4,suggestion:infinity");

// disable one-click search engines
user_pref("browser.urlbar.oneOffSearches", false);

// disable open tabs suggestion in address bar
user_pref("browser.urlbar.suggest.openpage", false);

// speeds up the search response
user_pref("browser.urlbar.delay", 0);

// search google for "highlighted text" open in a background tab
user_pref("browser.search.context.loadInBackground", true);

// nicer view for searching strings on a page
user_pref("findbar.highlightAll", true);
user_pref("findbar.modalHighlight", true);


//
// ─── PRIVACY ─────────────────────────────────────────────────────────────────
//

// allow extensions on Mozilla websites
user_pref("privacy.resistFingerprinting.block_mozAddonManager", true);
user_pref("extensions.webextensions.restrictedDomains", "accounts-static.cdn.mozilla.net,accounts.firefox.com,addons.cdn.mozilla.net,api.accounts.firefox.com,content.cdn.mozilla.net,discovery.addons.mozilla.org,input.mozilla.org,install.mozilla.org,oauth.accounts.firefox.com,profile.accounts.firefox.com,support.mozilla.org,sync.services.mozilla.com,testpilot.firefox.com");

// customize content blocking
user_pref("browser.contentblocking.category", "custom");

// disable tracking protection in Private Browsing
// user_pref("privacy.trackingprotection.pbmode.enabled", false);

// disable ask to save logins and passwords
user_pref("signon.rememberSignons", false);

// block new requests asking to allow notifications
user_pref("permissions.default.desktop-notification", 2);

// disable block pop-up windows
user_pref("dom.disable_open_during_load", false);

// disable data collection & crash reports
user_pref("datareporting.healthreport.uploadEnabled", false);

// disable block dangerous and deceptive content
user_pref("browser.safebrowsing.malware.enabled", false);

// disable WebRTC leaks
user_pref("media.peerconnection.enabled", false);

// block browser tracking
user_pref("privacy.donottrackheader.enabled", true);


//
// ─── EXTENSIONS ──────────────────────────────────────────────────────────────
//

// disable extension compatibility checks
user_pref("extensions.checkCompatibility", false);

// disable update add-ons automatically
user_pref("extensions.update.autoUpdateDefault", false);
user_pref("extensions.pendingOperations", false);

// disable extension install delay
user_pref("security.dialog_enable_delay", 0);


//
// ─── PERFORMANCE ─────────────────────────────────────────────────────────────
//

// maximum number of recently visited pages to store in memory
user_pref("browser.sessionhistory.max_total_viewers", 2);

// the maximum memory to use to cache
user_pref("browser.cache.memory.max_entry_size", 4096);

// number of milliseconds between session saving operations
user_pref("browser.sessionstore.interval", 100000);

// when to send the Referer header and set document.referrer
// user_pref("network.http.sendRefererHeader", 0);

// disable the "website is now full screen" warning
user_pref("full-screen-api.warning.delay", 0);
user_pref("full-screen-api.warning.timeout", 0);

// disable fullscreen animation
user_pref("full-screen-api.transition-duration.enter", "0 0");
user_pref("full-screen-api.transition-duration.leave", "0 0");

// disable cosmetic animations (tab open/close; fullscreen enter)
user_pref("toolkit.cosmeticAnimations.enabled", false);


//
// ─── DEVTOOLS ────────────────────────────────────────────────────────────────
//

// devtools theme
user_pref("devtools.theme", "dark");

// disable paste protection
user_pref("devtools.selfxss.count", 100);

// enable dom property viewer
user_pref("devtools.dom.enabled", true);

// devtools tabs order
user_pref("devtools.toolbox.tabsOrder", "inspector,webconsole,styleeditor,jsdebugger,dom,performance,memory,netmonitor,storage,accessibility");

// copy screenshots to the clipboard
user_pref("devtools.screenshot.clipboard.enabled", true);

// inspector default color unit
user_pref("devtools.defaultColorUnit", "hex");

// disable addons signing
user_pref("xpinstall.signatures.required", false);

// user_pref("devtools.chrome.enabled", true);
// user_pref("devtools.debugger.remote-enabled", true);
// user_pref("devtools.debugger.prompt-connection", false);

// ─────────────────────────────────────────────────────────────────────────────

// user_pref("browser.link.open_newwindow", 3);
// user_pref("browser.link.open_newwindow.restriction", 0);

// user_pref("browser.tabs.loadBookmarksInBackground", true);
// user_pref("browser.tabs.loadDivertedInBackground", true);
// user_pref("browser.tabs.loadInBackground", true);

// user_pref("browser.fixup.alternate.enabled", false);
// user_pref("browser.urlbar.suggest.bookmark", false);
// user_pref("browser.urlbar.suggest.history", false);
// user_pref("browser.urlbar.suggest.searches", false);
// user_pref("browser.urlbar.autocomplete.enabled", false);
// user_pref("browser.urlbar.unifiedcomplete", false);

// user_pref("browser.search.defaultenginename", "GitHub");
// user_pref("browser.search.defaulturl", "https://www.google.com.ua/search?lr=&ie=UTF-8&oe=UTF-8&q=");
// user_pref("browser.search.order.1", "GitHub");
