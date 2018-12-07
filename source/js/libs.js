(function(window) {
    window.web = {
        title: document.title,
        env: {
            ua: navigator.userAgent,
            isStandalone: window.matchMedia('(display-mode: standalone)').matches,
            browser_pattern: {
                messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
                facebook: /\bFB[\w_]+\//,
                twitter: /\bTwitter/i,
                line: /\bLine\//i,
                wechat: /\bMicroMessenger\//i,
                puffin: /\bPuffin/i,
                miui: /\bMiuiBrowser\//i,
                instagram: /\bInstagram/i,
                chrome: /\bCrMo\b|CriOS|Android.*Chrome\/[.0-9]* (Mobile)?/,
                safari: /Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari/,
                ie: /IEMobile|MSIEMobile/,
                firefox: /fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS/,
                edge: /Edge/,
                edgeMobile: /EdgA/,
            },
            IAB_rules: ['WebView', '(iPhone|iPod|iPad)(?!.*Safari\/)', 'Android.*(wv|\.0\.0\.0)'].join('|'),
            IAB_apps: ['messenger','facebook','twitter','line','wechat','instagram'],

            get browser() { return Object.keys(this.browser_pattern).filter(brsName=>this.ua.match(this.browser_pattern[brsName])).join(',') || 'undetected' ; },
            get isMobile() { return /(iPad|iPhone|Android|Mobile)/i.test(this.ua) || false ; },
            get isDesktop() { return !this.isMobile; },
            get isWV() { return new RegExp(`(${this.IAB_rules})`, 'ig').test(this.ua) || false },
            get isIAB() { return new RegExp(`(${this.IAB_apps.join('|')})`).test(this.browser); },
            get isOnline() { return navigator.onLine; },

            set whenOnline(updateOnlineStatus) { window.addEventListener('online', updateOnlineStatus); },
            set whenOffline(updateOnlineStatus) { window.addEventListener('offline', updateOnlineStatus); },
        },
        setTitle(newTitle) {
            if ('string' !== typeof newTitle) return;
            document.title = newTitle;
            console.log('set Title', newTitle);
        },
        idbOp(dbName, ver, upgradeDB) {
            return {
                dbName,
                dbPromise: idb.open(dbName, ver, upgradeDB),
                get(objSt, key) {
                    return this.dbPromise.then((db) => {
                        return db.transaction(objSt)
                            .objectStore(objSt)
                            .get(key);
                    });
                },
                getAll(objSt) {
                    return this.dbPromise.then((db) => {
                        return db.transaction(objSt, 'readonly')
                            .objectStore(objSt)
                            .getAll();
                    });
                },
                set(objSt, val) {
                    return this.dbPromise.then((db) => {
                        const tx = db.transaction(objSt, 'readwrite');
                        tx.objectStore(objSt).put(val);
                        return tx.complete;
                    });
                },
                set_valKey(objSt, val, key) {
                    return this.dbPromise.then((db) => {
                        const tx = db.transaction(objSt, 'readwrite');
                        tx.objectStore(objSt).put(val, key);
                        return tx.complete;
                    });
                },
                delete(objSt, key) {
                    return this.dbPromise.then((db) => {
                        const tx = db.transaction(objSt, 'readwrite');
                        tx.objectStore(objSt).delete(key);
                        return tx.complete;
                    });
                },
                clear(objSt) {
                    return this.dbPromise.then((db) => {
                        const tx = db.transaction(objSt, 'readwrite');
                        tx.objectStore(objSt).clear();
                        return tx.complete;
                    });
                },
                keys(objSt) {
                    return this.dbPromise.then((db) => {
                        const keys = [];
                        const tx = db.transaction(objSt);
                        const store = tx.objectStore(objSt);

                        (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
                            if (!cursor) return;
                            keys.push(cursor.key);
                            cursor.continue();
                        });

                        return tx.complete.then(() => keys);
                    });
                },
                rename(objSt, keyPath, oldKey, newKey) {
                    return this.get(objSt, oldKey)
                        .then((obj) => {
                            obj[keyPath] = newKey;
                            return this.set(objSt, obj);
                        })
                        .then(() => {
                            return this.delete(objSt, oldKey);
                        });

                },
                objStNames() {
                    return this.dbPromise.then((db) => {
                        return db.objectStoreNames;
                    });
                }
            };
        },
    };
})(window);