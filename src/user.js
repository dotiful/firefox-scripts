//
// ─── GENERAL ─────────────────────────────────────────────────────────────────
//

// enable supports of userChrome.css and userContent.css
// @see https://www.ghacks.net/2019/05/24/firefox-69-userchrome-css-and-usercontent-css-disabled-by-default/
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// display about:config normally without a warning
user_pref("browser.aboutConfig.showWarning", false);

// change the interface language "en-US/ru-RU"
user_pref("intl.locale.requested", "en-US");

// disable cycles through tabs in recently used order
user_pref("browser.ctrlTab.recentlyUsedOrder", false);

// disable spell checking
user_pref("layout.spellcheckDefault", 0);

// enable alt+click on the link for download without prompts
user_pref("browser.altClickSave", true);

// display all plugins in the Download Actions dialog
user_pref("browser.download.hide_plugins_without_extensions", false);

// save files with unknown mime type
// eslint-disable-next-line prettier/prettier
user_pref("browser.helperApps.neverAsk.saveToDisk", "application/msword, application/csv, application/ris, text/csv, image/png, image/svg+xml, application/pdf, text/html, text/plain, application/zip, application/x-zip, application/x-zip-compressed, application/download, application/octet-stream");

// disable auto install updates
user_pref("app.update.auto", false);

// disable background service to install updates
user_pref("app.update.service.enabled", false);

// disable auto update search engines
user_pref("browser.search.update", false);

// customize items in toolbar
user_pref("browser.uiCustomization.state", "{\"placements\":{\"widget-overflow-fixed-list\":[],\"nav-bar\":[\"back-button\",\"forward-button\",\"stop-reload-button\",\"home-button\",\"customizableui-special-spring1\",\"sync-button\",\"urlbar-container\",\"customizableui-special-spring2\",\"downloads-button\",\"library-button\",\"sidebar-button\",\"_89299b16-7b8d-48c2-8bdf-e9e4f58de3f6_-browser-action\",\"onepassword4_agilebits_com-browser-action\",\"uc-restart\",\"restart-button\",\"_d634138d-c276-4fc8-924b-40a0ea21d284_-browser-action\",\"chrome-store-foxified_jetpack-browser-action\",\"_c2c003ee-bd69-42a2-b0e9-6f34222cb046_-browser-action\",\"_a8332c60-5b6d-41ee-bfc8-e9bb331d34ad_-browser-action\",\"simple-translate_sienori-browser-action\",\"adguardadblocker_adguard_com-browser-action\",\"tab-session-manager_sienori-browser-action\",\"addon_darkreader_org-browser-action\",\"_7a7a4a92-a2a0-41d1-9fd7-1e92480d612d_-browser-action\",\"firefoxbeta_tampermonkey_net-browser-action\",\"firefox_tampermonkey_net-browser-action\",\"fxa-toolbar-menu-button\"],\"TabsToolbar\":[\"tabbrowser-tabs\",\"new-tab-button\",\"alltabs-button\"],\"PersonalToolbar\":[\"personal-bookmarks\"]},\"seen\":[\"developer-button\",\"_c2c003ee-bd69-42a2-b0e9-6f34222cb046_-browser-action\",\"_a8332c60-5b6d-41ee-bfc8-e9bb331d34ad_-browser-action\",\"simple-translate_sienori-browser-action\",\"firefoxbeta_tampermonkey_net-browser-action\",\"onepassword4_agilebits_com-browser-action\",\"_d634138d-c276-4fc8-924b-40a0ea21d284_-browser-action\",\"_7a7a4a92-a2a0-41d1-9fd7-1e92480d612d_-browser-action\",\"webide-button\",\"adguardadblocker_adguard_com-browser-action\",\"addon_darkreader_org-browser-action\",\"firefox_tampermonkey_net-browser-action\",\"uc-restart\",\"chrome-store-foxified_jetpack-browser-action\",\"_89299b16-7b8d-48c2-8bdf-e9e4f58de3f6_-browser-action\",\"restart-button\",\"tab-session-manager_sienori-browser-action\"],\"dirtyAreaCache\":[\"nav-bar\",\"TabsToolbar\",\"PersonalToolbar\"],\"currentVersion\":16,\"newElementCount\":17}");

// disable beforeunload events (e.g. “Are you sure you want to leave this page?”
user_pref("dom.disable_beforeunload", true);

// disable screenshots
// eslint-disable-next-line prettier/prettier
user_pref("extensions.screenshots.disabled", true);


//
// ─── BOOKMARKS ───────────────────────────────────────────────────────────────
//

// save bookmarks.html to the profile on browser exit.
user_pref("browser.bookmarks.autoExportHTML", true);

// define the number of bookmarks backups
user_pref("browser.bookmarks.max_backups", 5);

//
// ─── BEHAVIOUR ───────────────────────────────────────────────────────────────
//

// ─── OPEN URLS ───────────────────────────────────────────────────────────────

// force links to open in the same tab
// 3 = divert new window to a new tab (default)
// 2 = allow link to open a new window
// 1 = force new window into same tab
user_pref("browser.link.open_newwindow", 1);

// divert links opened via JS OR HTML target="_blank"
// 0 = apply the setting under (A) to ALL new windows (even script windows)
// 2 = apply the setting under (A) to normal windows, but NOT to script windows with features (default)
// 1 = override the setting under (A) and always use new windows
user_pref("browser.link.open_newwindow.restriction", 2);

// for links in other programs
// -1 = apply the setting under (A) to external links (default)
// 3 = open external links in a new tab in the last active window
// 2 = open external links in a new window
// 1 = open external links in the last active tab replacing the current page
user_pref("browser.link.open_newwindow.override.external", 3);

// open tabs to the right of the current tab
user_pref("browser.tabs.insertAfterCurrent", true);


// open bookmarks in background enstead of switch to it
// user_pref("browser.tabs.loadBookmarksInBackground", true);

// user_pref("browser.tabs.loadInBackground", true);
// user_pref("browser.tabs.loadDivertedInBackground", true);


//
// ─── UI ──────────────────────────────────────────────────────────────────────
//

// tiny bars
user_pref("browser.uidensity", 1);
user_pref("browser.tabs.extraDragSpace", true);

// enable dark-mode
user_pref("browser.in-content.dark-mode", true);
user_pref("ui.systemUsesDarkTheme", 1);

// user_pref("browser.display.background_color", "#D3D3D3");

// move sidebar to right
user_pref("sidebar.position_start", false);

// disable autoplay
// user_pref("media.autoplay.enabled", false);
user_pref("media.autoplay.default", 1);
user_pref("media.autoplay.allow-muted", false);

user_pref("media.videocontrols.picture-in-picture.enabled", false);
user_pref("media.videocontrols.picture-in-picture.video-toggle.enabled", true);

// disable zoom with cmd+scroll
user_pref("mousewheel.with_meta.action", 1);

// fix the dark theme bug
user_pref("widget.content.gtk-theme-override", "Adwaita:light");
user_pref("widget.content.allow-gtk-dark-theme", true);


/* READER MODE─────────────────────────────────────────────────────────────── */
// enable dark theme
user_pref("reader.color_scheme", "dark");
user_pref("reader.content_width", 7);

/* TABS ───────────────────────────────────────────────────────────────────── */

// tab audio icon
user_pref("browser.tabs.showAudioPlayingIcon", true);

// materialfox
// user_pref("materialFox.reduceTabOverflow", true);
// user_pref("svg.context-properties.content.enabled", true);

// always show tab close button
user_pref("browser.tabs.closeButtons", 1);

// replicate chrome behaviour for clipped tabs
user_pref("browser.tabs.tabClipWidth", 80);


//
// ─── HOME ────────────────────────────────────────────────────────────────────
//

// restore previous session
user_pref("browser.startup.page", 3);

// 4 rows of top sites
user_pref("browser.newtabpage.activity-stream.topSitesRows", 4);

// pinned sites top sites
user_pref("browser.newtabpage.pinned", "[{\"url\":\"https://github.com/\",\"label\":\"github\",\"baseDomain\":\"github.com\"},{\"url\":\"https://gist.github.com/dotiful?direction=deschttps://gist.github.com/dotiful?direction=desc&sort=updated\",\"label\":\"gists\",\"baseDomain\":\"gist.github.com\"},{\"url\":\"https://github.com/dotiful?tab=stars\",\"label\":\"stars\",\"baseDomain\":\"github.com\"},{\"url\":\"https://gitlab.com/?nav_source=navbar\",\"label\":\"gitlab\",\"customScreenshotURL\":\"https://i.imgur.com/AGSiONj.png\",\"baseDomain\":\"gitlab.com\"},{\"url\":\"https://eu-central-1.console.aws.amazon.com/ec2/v2/home?region=eu-central-1#Instances:sort=instanceId\",\"label\":\"aws\",\"customScreenshotURL\":\"https://i.imgur.com/irpKuOG.png\",\"baseDomain\":\"eu-central-1.console.aws.amazon.com\"},{\"url\":\"https://console.cloud.google.com/home/dashboard?authuser=2&project=wrtdev\",\"label\":\"GCP\",\"customScreenshotURL\":\"https://i.imgur.com/XUwMPRs.png\",\"baseDomain\":\"console.cloud.google.com\"},{\"url\":\"https://dash.cloudflare.com\",\"label\":\"cloudflare\",\"customScreenshotURL\":\"https://i.imgur.com/2dddPbm.png\",\"baseDomain\":\"dash.cloudflare.com\"},{\"url\":\"https://adwrt.cf/\",\"label\":\"adhome\",\"customScreenshotURL\":\"https://i.imgur.com/dgvkfMl.png\",\"baseDomain\":\"adwrt.cf\"},{\"url\":\"https://www.google.com.ua/\",\"label\":\"google\",\"customScreenshotURL\":\"https://i.imgur.com/rT7EyzQ.png\",\"baseDomain\":\"google.com.ua\"},{\"url\":\"https://mail.google.com/mail/u/0/\",\"label\":\"artdev\",\"customScreenshotURL\":\"https://i.imgur.com/2PwPKoS.png\",\"baseDomain\":\"mail.google.com\"},{\"url\":\"https://mail.google.com/mail/u/1/\",\"label\":\"dots\",\"customScreenshotURL\":\"https://i.imgur.com/2PwPKoS.png\",\"baseDomain\":\"mail.google.com\"},{\"url\":\"https://mail.google.com/mail/u/2/\",\"label\":\"wrt\",\"customScreenshotURL\":\"https://i.imgur.com/2PwPKoS.png\",\"baseDomain\":\"mail.google.com\"},{\"url\":\"https://www.youtube.com/\",\"label\":\"youtube\",\"customScreenshotURL\":\"https://i.imgur.com/W5nyO7W.png\",\"baseDomain\":\"youtube.com\"},{\"url\":\"https://drive.google.com/\",\"label\":\"drive\",\"customScreenshotURL\":\"https://i.imgur.com/41EIr4Q.png\",\"baseDomain\":\"drive.google.com\"},{\"url\":\"https://translate.google.com.ua/#view=home&op=translate&sl=auto&tl=ru\",\"label\":\"translate\",\"customScreenshotURL\":\"https://i.imgur.com/iiTj8hF.png\",\"baseDomain\":\"translate.google.com.ua\"},{\"url\":\"https://www.google.com.ua/maps\",\"label\":\"maps\",\"customScreenshotURL\":\"https://i.imgur.com/FSx9cpO.png\",\"baseDomain\":\"google.com.ua\"},{\"url\":\"https://web.telegram.org/\",\"label\":\"telegram\",\"customScreenshotURL\":\"https://i.imgur.com/VijQNyZ.png\",\"baseDomain\":\"web.telegram.org\"},{\"url\":\"https://www.inoreader.com/\",\"label\":\"inoreader\",\"customScreenshotURL\":\"https://i.imgur.com/9qiR748.png\",\"baseDomain\":\"inoreader.com\"},{\"url\":\"https://www.integromat.com/\",\"label\":\"integromat\",\"customScreenshotURL\":\"https://i.imgur.com/6FEgChu.png\",\"baseDomain\":\"integromat.com\"},{\"url\":\"https://twitter.com/artdevjs/lists/feed\",\"label\":\"twitter\",\"customScreenshotURL\":\"https://i.imgur.com/sfAkrOp.png\",\"baseDomain\":\"twitter.com\"},{\"url\":\"https://www.reddit.com/user/artdevjs/m/favs/new/\",\"label\":\"reddit\",\"customScreenshotURL\":\"https://i.imgur.com/HV6Ur0m.png\",\"baseDomain\":\"reddit.com\"},{\"url\":\"https://www.dropbox.com/home\",\"label\":\"dropbox\",\"customScreenshotURL\":\"https://i.imgur.com/AXrk2CR.png\",\"baseDomain\":\"dropbox.com\"},{\"url\":\"https://bitbucket.org/dashboard/overview\",\"label\":\"bitbucket\",\"customScreenshotURL\":\"https://i.imgur.com/F6sEfIW.png\",\"baseDomain\":\"bitbucket.org\"},{\"url\":\"https://www.npmjs.com\",\"label\":\"npm\",\"customScreenshotURL\":\"https://i.imgur.com/g3ZPxyk.png\",\"baseDomain\":\"npmjs.com\"},{\"url\":\"https://outlook.live.com/mail/inbox\",\"label\":\"outlook\",\"customScreenshotURL\":\"https://i.imgur.com/tK0xCo0.png\",\"baseDomain\":\"outlook.live.com\"},{\"url\":\"https://my.1password.com/home\",\"label\":\"1password\",\"customScreenshotURL\":\"https://i.imgur.com/PHOaimF.png\",\"baseDomain\":\"my.1password.com\"},{\"url\":\"https://www.olx.ua/myaccount/\",\"label\":\"olx\",\"customScreenshotURL\":\"https://i.imgur.com/hxq5fjB.png\"},{\"url\":\"https://artdevjs.imgur.com/all\",\"label\":\"imgur\",\"customScreenshotURL\":\"https://i.imgur.com/hMG9e10.jpg\",\"baseDomain\":\"artdevjs.imgur.com\"},{\"url\":\"https://filmix.co/favorites\",\"label\":\"filmix\",\"customScreenshotURL\":\"https://filmix.co/templates/Filmix/media/img/filmix.png\"},{\"url\":\"http://ex-fs.net/subnews/\",\"label\":\"ex-fs\",\"customScreenshotURL\":\"https://i.imgur.com/cEmz6Sr.png\"},{\"url\":\"https://myshows.me/profile/\",\"label\":\"myshows\",\"customScreenshotURL\":\"https://i.imgur.com/1RKrjKy.png\"}]");

// set home page url
user_pref("browser.startup.homepage", "https://duckduckgo.com/?key=291864b3d524962d791b3cf990c984fd65285de4d0fdb46be98fa5513c44430ace11193e7896ee611e1fb302e7ac74e5fb1391aacff656b711528ded5fb5370e");

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

// number of entries that can appear in the location bar
user_pref("browser.urlbar.maxRichResults", 15);

// decode copied urls instead of encode
user_pref("browser.urlbar.decodeURLsOnCopy", true);

// history-first search suggestions in the url bar
user_pref("browser.urlbar.matchBuckets", "general:5,suggestion:infinity");

// disable one-click search engines
user_pref("browser.urlbar.oneOffSearches", false);

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
user_pref("extensions.webextensions.restrictedDomains", "accounts-static.cdn.mozilla.net,accounts.firefox.com,addons.cdn.mozilla.net,api.accounts.firefox.com,content.cdn.mozilla.net,oauth.accounts.firefox.com,sync.services.mozilla.com,testpilot.firefox.com");

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

// ─────────────────────────────────────────────────────────────────────────────
// Disables geolocation and firefox logging geolocation requests.
user_pref("geo.enabled", false);
user_pref("geo.wifi.uri", "");
user_pref("browser.search.geoip.url", "");

// Prevent website tracking clicks.
user_pref("browser.send_pings", false);

// Only send pings if send and receiving host match (same website).
user_pref("browser.send_pings.require_same_host", true);

//
// ─── EXTENSIONS ──────────────────────────────────────────────────────────────
//

// disable new html add-ons manager
user_pref("extensions.htmlaboutaddons.enabled", false);
// inline options browser for html add-ons manager details
user_pref("extensions.htmlaboutaddons.inline-options.enabled", false);

user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);
user_pref("extensions.htmlaboutaddons.discover.enabled", false);

// disable add-on abuse reporting
user_pref("extensions.abuseReport.enabled", false);

// disable extension compatibility checks
user_pref("extensions.checkCompatibility", false);

// disable update add-ons automatically
user_pref("extensions.update.autoUpdateDefault", false);
user_pref("extensions.pendingOperations", false);

// disable extension install delay
user_pref("security.dialog_enable_delay", 0);

user_pref("permissions.desktop-notification.postPrompt.enabled", false);

//
// ─── PERFORMANCE ─────────────────────────────────────────────────────────────
//

// limit content processes load
// user_pref("dom.ipc.processCount", 4);

// don’t load tabs until selected
user_pref("browser.sessionstore.restore_on_demand", true);
user_pref("browser.sessionstore.restore_pinned_tabs_on_demand", false);

// maximum number of recently visited pages to store in memory
user_pref("browser.sessionhistory.max_total_viewers", 2);

// the maximum memory to use to cache
// user_pref("browser.cache.disk.enable", 51200);

// the maximum memory to use to cache
// user_pref("browser.cache.offline.capacity", false);

// the maximum memory to use to cache
user_pref("browser.cache.memory.max_entry_size", 4096);

// number of milliseconds between session saving operations
user_pref("browser.sessionstore.interval", 100000);

// enable dns prefetching
user_pref("network.dns.disablePrefetch", true);

// when to send the Referer header and set document.referrer
// user_pref("network.http.sendRefererHeader", 0);

user_pref("dom.indexedDB.enabled", true);

/* DISABLE ANIMATIONS ─────────────────────────────────────────────────────── */

//
user_pref("config.trim_on_minimize", false);


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
user_pref("devtools.toolbox.tabsOrder", "inspector,webconsole,netmonitor,styleeditor,dom,jsdebugger,performance,memory,storage,accessibility");

user_pref("devtools.inspector.three-pane-enabled", true);

user_pref("devtools.toolbox.footer.height", 359);
user_pref("devtools.toolsidebar-height.inspector", 350);
user_pref("devtools.toolsidebar-width.inspector", 350);
user_pref("devtools.toolsidebar-width.inspector.splitsidebar", 350);

// copy screenshots to the clipboard
// user_pref("devtools.screenshot.clipboard.enabled", true);
user_pref("devtools.screenshot.audio.enabled", false);

// inspector default color unit
user_pref("devtools.defaultColorUnit", "hex");

// disable addons signing
user_pref("xpinstall.signatures.required", false);

user_pref("app.normandy.first_run", false);
user_pref("toolkit.telemetry.reportingpolicy.firstRun", false);
user_pref("trailhead.firstrun.didSeeAboutWelcome", true);

// hide what-new
user_pref("browser.newtabpage.activity-stream.asrouter.providers.whats-new-panel", "{\"id\":\"whats-new-panel\",\"enabled\":false,\"type\":\"remote-settings\",\"bucket\":\"whats-new-panel\",\"updateCycleInMs\":3600000}");

// user_pref("devtools.chrome.enabled", true);
// user_pref("devtools.debugger.remote-enabled", true);
// user_pref("devtools.debugger.prompt-connection", false);

// ─────────────────────────────────────────────────────────────────────────────

// user_pref("browser.fixup.alternate.enabled", false);
// user_pref("browser.urlbar.suggest.bookmark", false);
// user_pref("browser.urlbar.suggest.history", false);
// user_pref("browser.urlbar.suggest.searches", false);
// user_pref("browser.urlbar.autocomplete.enabled", false);
// user_pref("browser.urlbar.unifiedcomplete", false);

// user_pref("browser.search.defaultenginename", "GitHub");
// user_pref("browser.search.defaulturl", "https://www.google.com.ua/search?lr=&ie=UTF-8&oe=UTF-8&q=");
// user_pref("browser.search.order.1", "GitHub");
