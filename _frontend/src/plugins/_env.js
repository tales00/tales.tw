/* eslint-disable */
import Vue from 'vue'
const browser_pattern = {
  messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
  facebook: /\bFB[\w_]+\//,
  twitter: /\bTwitter/i,
  line: /\bLine\//i,
  wechat: /\bMicroMessenger\//i,
  puffin: /\bPuffin/i,
  miui: /\bMiuiBrowser\//i,
  instagram: /\bInstagram/i,
  kinza: /Kinza/,
  chrome: /\bCrMo\b|CriOS|Android.*Chrome\/[.0-9]* (Mobile)?/,
  safari: /Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari/,
  ie: /IEMobile|MSIEMobile/,
  firefox: /fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS|Gecko\/20100101\sFirefox\/\d{2}(:?\.\d)?/,
  edge: /Edge/,
  edgeMobile: /EdgA/,
};
const _env = {
  install: function(Vue) {
    Vue.prototype.$env = {
      ua: navigator.userAgent,
      isStandalone: window.matchMedia('(display-mode: standalone)').matches,
      
      IAB_rules: ['WebView', '(iPhone|iPod|iPad)(?!.*Safari\/)', 'Android.*(wv|\.0\.0\.0)'].join('|'),
      IAB_apps: ['messenger','facebook','twitter','line','wechat','instagram'],
  
      get browser() { return Object.keys(browser_pattern).filter(brsName=>this.ua.match(browser_pattern[brsName])).join(',') || 'undetected' ; },
      get isMobile() { return /(iPad|iPhone|Android|Mobile)/i.test(this.ua) || false ; },
      get isDesktop() { return !this.isMobile; },
      get isWV() { return new RegExp(`(${this.IAB_rules})`, 'ig').test(this.ua) || false },
      get isIAB() { return new RegExp(`(${this.IAB_apps.join('|')})`).test(this.browser); },
      get isOnline() { return navigator.onLine; },
  
      whenOnline(fn, options={passive:true}) { window.addEventListener('online', fn, options); },
      whenOffline(fn, options={passive:true}) { window.addEventListener('offline', fn, options); },
    }
  }
}

Vue.use(_env)