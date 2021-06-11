let sc = document.createElement('script');
sc.src = chrome.runtime.getURL('inject.js');
(document.body || document.documentElement).appendChild(sc);