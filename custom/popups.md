# Firefox settings

Many settings, especially the most advanced ones, are not present in the User
Interface (UI) options dialog.

> Preference settings that are modified from default values are saved in the
> [`prefs.js`][1] file. Instead of directly editing this file, recent Mozilla
> applications include a configuration editor that can be accessed from the
> application interface.
>
> Source: [Editing configuration][2]
>
> In Firefox, type `about:config` in the Location Bar (address bar) and press
> Enter to display the list of preferences [...]. If you see a page with the
> warning message, "This might void your warranty!", click the button labeled
> "I'll be careful, I promise!", to continue (in fact, there is no warranty
> whatsoever, it's more a joke to ensure that users are aware of what they are
> about to do). Use the checkbox there to avoid the warning in the future.
>
> To add a new preference, context-click (right-click) anywhere in the list of
> preferences. In the context menu, select **New** then select the type of
> preference you are adding.
>
> To modify an existing preference, context-click (right-click) on the
> preference, select **Modify** and type in the new value.
>
> To reset a preference to its default value or to remove an added preference,
> context-click (right-click) on the preference and select **Reset**.
>
> You can use the **Search** bar at the top of the `about:config` page to filter
> the preferences that you want to inspect. The search bar is case-insensitive,
> unlike the actual configuration variables.
>
> Source: [about:config][3]

## Pop-up related preferences

Here's a comprehensive list I've come up with:

---

```js
browser.link.open_newwindow
```

**Type** `Integer`

**Default value** `3`

**Description** Controls where to open links that would normally open in a new
window. Possible values:

- `1` (or anything else) - open in the current tab or window.
- `2` \- open in a new window.
- `3` \- open in a new tab.

Enabling or disabling the **Open new windows in a new tab instead** UI option
will toggle this preference between `3` and `2`.

---

```js
browser.link.open_newwindow.restriction
```

**Type** `Integer`

**Default value** `2`

**Description** Restricts all new windows opened by JavaScript. Possible values:

- `0` \- always force new windows into tabs.
- `1` \- don't restrict new windows.
- `2` \- force windows that don't specify their features (e.g. width, height)
  into tabs.

---

```js
browser.popups.showPopupBlocker
```

**Type** `Boolean`

**Default value** `true`

**Description** Determines whether to show an icon in the status bar when a
pop-up has been blocked. Obsolete, just leave it as-is.

---

```js
dom.disable_open_click_delay
```

**Type** `Integer`

**Default value** `1000`

**Description** Handles pop-ups according to the current pop-up blocker settings
when created through a [JavaScript timing event][4] using a delay smaller than
this value (in milliseconds).

---

```js
dom.disable_open_during_load
```

**Type** `Boolean`

**Default value** `true`

**Description** When enabled, blocks pop-ups created while the page is loading.
This setting is equivalent to the **Block pop-up windows** UI option.

---

```js
dom.disable_window_flip
```

**Type** `Boolean`

**Default value** `true`

**Description** Determines whether windows can be focused through JavaScript.

---

```js
dom.disable_window_move_resize
```

**Type** `Boolean`

**Default value** `false`

**Description** Determines whether windows can be moved or resized using
JavaScript.

---

```js
dom.disable_window_open_feature.*
```

**Description** Rather than a single preference, this is a set of different
boolean settings which can prevent a specific pop-up feature (e.g. address bar,
scroll bars, etc.) from being disabled when set to `true`. Available
preferences:

```js
dom.disable_window_open_feature.close
dom.disable_window_open_feature.location
dom.disable_window_open_feature.menubar
dom.disable_window_open_feature.minimizable
dom.disable_window_open_feature.personalbar
dom.disable_window_open_feature.resizable
dom.disable_window_open_feature.scrollbars
dom.disable_window_open_feature.status
dom.disable_window_open_feature.titlebar
dom.disable_window_open_feature.toolbar
```

---

```js
dom.disable_window_status_change
```

**Type** `Boolean`

**Default value** `true`

**Description** When enabled, prevents the status bar text from being changed
via JavaScript.

---

```js
dom.popup_allowed_events
```

**Type** `String`

**Default value** `change click dblclick mouseup reset submit touchend`

**Description** A space-separated list of the events allowed to create pop-ups.
Although undocumented, setting the value to a single space character will create
an empty list, thus disabling all pop-ups (exceptions still apply). The same
effect can be achieved by specifying a non-existent event (e.g. `none`).

---

```js
dom.popup_maximum
```

**Type** `Integer`

**Default value** `20`

**Description** Limits the number of simultaneously open pop-up windows.

---

```js
privacy.popups.disable_from_plugins
```

**Type** `Integer`

**Default value** `2`

**Description** Controls pop-ups created by plug-ins (e.g. Adobe Flash Player).
Possible values:

- `0` \- no restrictions.
- `1` \- limits the pop-ups number to `dom.popup_maximum`.
- `2` \- block all pop-ups except for whitelisted websites.
- `3` \- block all pop-ups.

---

```js
privacy.popups.policy
```

**Type** `Integer`

**Default value** `1`

**Description** Deprecated. Use `dom.disable_open_during_load` instead.

---

```js
privacy.popups.showBrowserMessage
```

**Type** `Boolean`

**Default value** `true`

**Description** Determines whether to display an information bar whenever one
ore more pop-us are blocked. Can be changed by using the **Don't show info bar
when pop-ups are blocked** UI option.

---

```js
privacy.popups.usecustom
```

**Type** `Boolean`

**Default value** `true`

**Description** Apparently unused.

---

## Recommended settings

These are the values I currently use for the settings listed above; feel free to
experiment with other settings on your own. Tested with Firefox 27.0.1.


user_pref("browser.link.open_newwindow", 3);
user_pref("browser.link.open_newwindow.restriction", 0);
user_pref("browser.popups.showPopupBlocker", true);
user_pref("dom.disable_open_click_delay", 1000);
user_pref("dom.disable_open_during_load", true);
user_pref("dom.disable_window_flip", true);
user_pref("dom.disable_window_move_resize", true);
user_pref("dom.disable_window_open_feature.close", true);
user_pref("dom.disable_window_open_feature.location", true);
user_pref("dom.disable_window_open_feature.menubar", true);
user_pref("dom.disable_window_open_feature.minimizable", true);
user_pref("dom.disable_window_open_feature.personalbar", true);
user_pref("dom.disable_window_open_feature.resizable", true);
user_pref("dom.disable_window_open_feature.scrollbars", true);
user_pref("dom.disable_window_open_feature.status", true);
user_pref("dom.disable_window_open_feature.titlebar", true);
user_pref("dom.disable_window_open_feature.toolbar", true);
user_pref("dom.disable_window_status_change", true);
user_pref("dom.popup_allowed_events", true);
user_pref("dom.popup_maximum", 20);
user_pref("privacy.popups.disable_from_plugins", 2);
user_pref("privacy.popups.policy", 1);
user_pref("privacy.popups.showBrowserMessage", false);
user_pref("privacy.popups.usecustom", true);


# Further reading

- [Pop-up blocker settings, exceptions and troubleshooting][5]
- [A brief guide to Mozilla preferences][6]
- [about:config][3]
- [about:config entries][7]

[1]: http://kb.mozillazine.org/Prefs.js_file
[2]: http://kb.mozillazine.org/Editing_configuration
[3]: http://kb.mozillazine.org/About:config
[4]: http://www.w3schools.com/js/js_timing.asp
[5]:
  https://support.mozilla.org/en-US/kb/pop-blocker-settings-exceptions-troubleshooting
[6]:
  https://developer.mozilla.org/en-US/docs/Mozilla/Preferences/A_brief_guide_to_Mozilla_preferences
[7]: http://kb.mozillazine.org/About:config_entries
