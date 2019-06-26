// ==UserScript==
// @name           wheelscroll to change search engine
// @description    検索バー上のホイールスクロールで検索エンジンを変える
// @version        1.0
// @author         oflow
// @compatibility  Firefox 4.0, 11.0, ESR31.3
// @namespace      http://oflow.me/
// @note           Firefox ESR 31.3で確認, unload時のremoveEventListener修正
// @note           Firefox 11.0で動作確認
// ==/UserScript==

(function() {
    var searchbar = document.getElementById('searchbar') || BrowserSearch.searchBar;
    if (!searchbar) return;
    var changeSearchEngine = function(e) {
        if (!searchbar) {
            searchbar.removeEventListener('DOMMouseScroll', changeSearchEngine, false);
            return;
        }
        searchbar.selectEngine(e, e.detail > 0);
    }
    searchbar.addEventListener('DOMMouseScroll', changeSearchEngine, false);
    window.addEventListener('unload', function() {
        searchbar.removeEventListener('DOMMouseScroll', changeSearchEngine, false);
        window.removeEventListener('unload', arguments.callee, false);
    }, false);

})();
