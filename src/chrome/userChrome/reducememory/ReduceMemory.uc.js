// ==UserScript==
// @name		ReduceMemory
// @description	�A�h�I���o�[�̃{�^�����N���b�N�Ń������J��
// @include		main
// @version		1.0.20121023
// ==/UserScript==

(function(listener) {
// �A�h�I���o�[�Ƀ{�^���ǉ�
	var btn = document.getElementById('addon-bar')
		.appendChild(document.createElement('toolbarbutton'));
	btn.id = 'ReduceMemory-button';
	btn.className = 'toolbarbutton-1 chromeclass-toolbar-additional';
	btn.label = 'ReduceMemory';
	btn.tooltipText = 'Speicherauslastung reduzieren';
	btn.addEventListener('command', listener, false);
	btn.image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABpklEQVR4Xm2TsUozQRSFZ3eziYuEkEKCRQgWEsQHCGJhIVYiqaxTZ8cUqcQiBBGLEFJZWIiksrCwEAsfwELEwsLCSsQqWISfn5AihLB+E6eYzG5xmJ3DuWfPvdwRURQ5JpzQORChGHD+B0O+Zwrw6nzJNrK+qV8wSMlUAdE/IUWkMeI+Nu6RI526L/2NRAMEfVMMnl3pHpschiPSnMQMEFYQzAzxTHEZmQngvgz+c+loKYgZeNLL494DEx21P+frXhHuDryBd0yrbuiWaCM/N+ByiKANTkGTeGWKb7zQK9gDhlsmvtKOOTtzA5xKEFPdX0TsPV1gF6sk30YrY4ZeFES9sqb8qotiQPtkaa+FcjJJorUY3HpiCulVVEpDPxQQNwbxmFQYyMDPNXKrOsWtkaCjhrgGMVFz4A+SGeyrbQRV+i7r7WwiPkNT00OcgkFapnNCCy4QDJSrtTTnDHlFRbV6/6Gm9rcHeoX584dtQLq2ipnA3ydtorSFtNSC310YHPEx2Ep8CyoW6FHUJWaXZDt6cA8UXoI2mu3Ya7RhgySbfqhfoIVfrZq4Vlz32HwAAAAASUVORK5CYII=';
})
(function() {
// �����o�[�N���A
	var sb = document.getElementById('searchbar');
	sb.value = '';
	sb.currentEngine = sb.engines[0];
	document.getAnonymousElementByAttribute(gFindBar, 'anonid', 'findbar-textbox').value = '';

// ���ׂẴ^�u�����
	gBrowser.removeAllTabsBut(gBrowser.addTab('about:blank'));

// �Z�b�V���������폜�i�ŋߕ����^�u�A�E�B���h�E���j
	var os = Cc['@mozilla.org/observer-service;1']
		.getService(Ci.nsIObserverService);
	os.notifyObservers(null, 'browser:purge-session-history', '');

// �������L���b�V���폜
	Cc['@mozilla.org/network/cache-service;1'].getService(Ci.nsICacheService)
		.evictEntries(Ci.nsICache.STORE_IN_MEMORY);

// �������J���iabout:memory �� Minimize memory usage �Ɠ����j
	var i = 0;
	function runSoon(f) {
		Cc['@mozilla.org/thread-manager;1'].getService(Ci.nsIThreadManager)
			.mainThread.dispatch({ run: f }, Ci.nsIThread.DISPATCH_NORMAL);
	}
	function sendHeapMinNotificationsInner() {
		os.notifyObservers(null, 'memory-pressure', 'heap-minimize');
		if (++i < 3) runSoon(sendHeapMinNotificationsInner);
	}
	sendHeapMinNotificationsInner();
});
