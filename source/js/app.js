;(function({Vue,VueRouter,window}){

const router = new VueRouter({
    routes: [
        // index
        {
            name: 'index',
            path: '/',
        },
        {
            name: 'about',
            path: '/about'
        },
        {
            name: 'blog',
            path: '/blog'
        },
        {
            name: 'illust',
            path: '/illust'
        },
        {
            name: 'contact',
            path: '/contact'
        },
        {
            name: 'qrcode',
            path: '/qrcode'
        },
        // default
        {
            path: '*',
            redirect: '/'
        }
    ]
});

if(window.dataLayer){
    router.afterEach((to, from) => {
        // console.log('to.path:', to.path);
        gtag('config', 'UA-2531070-2', {'page_path': to.path});
    })
}
    
const vm = new Vue({
    el: '#app',
    router,
    data: {
        plurk: false,
        pixiv: false,
        page: {
            current: false,
            is_ready: false,
            app_loaded: false,
            on_trigger_leave: false
        },
        default_page: '/about',
        page_list: ['/about', '/blog', '/illust'],
        trigger_path: ['/contact', '/qrcode'],

        api_url: 'https://api.tales.tw/bloglance',

        contact_modal: {
            active: false,
        },
        qrcode_modal: {
            active: false,
        },
    },
    // components: {},
    watch: {
        // watch route change.
        '$route.path': function(newPath, oldPath) {
            // console.log('new path', newPath);
            this.routeTo( newPath );
        },
        'page.current'(pageName) {
            if(pageName) {
                this.active_page( pageName, 'start' );
            }
        }
    },
    methods: {
        htmlDecode(input) {
            let e = document.createElement('div');
            e.innerHTML = input;
            return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        },
        dateToString(timeStamp) { return new Date(timeStamp).toLocaleString(); },
        dateToTimeAgo(timeStamp) {
            timeStamp = parseInt(timeStamp);
            const currentTime = Date.now();
            const timeAgo = Math.round((currentTime - timeStamp)/3600000)

            return (timeAgo<=0)
                ? '不久前' 
                : (timeAgo<24)
                    ? timeAgo+'小時前' 
                    : (timeAgo>=24)
                        ? Math.round((timeAgo/24))+'天前'
                        : this.dateToString(timeStamp).substring(5,5);
        },

        scrollTo_BodyTop() {
            this.$refs['appBody'].scrollIntoView();
            // console.log('scroll in to contant');
        },

        load_cached_data( data_key ) {
            let cached_data = localStorage[data_key]? JSON.parse( localStorage[data_key] ) : false;

            return (cached_data && cached_data.expire > Date.now())? cached_data : false;
        },

        // routing
        routeTo( pathName ) {
            if( !this.page.current || '/' === pathName ) {
                this.page.current = sessionStorage['last_page'] || this.default_page;
            }
            if(this.page.on_trigger_leave) {
                this.page.on_trigger_leave();
                this.page.on_trigger_leave = false;
            }

            if( this.trigger_path.indexOf( pathName ) > -1 ) {
                this.trig_Path( pathName, 'onTrigger' );
                return true;
            }
    
            if( (this.page_list.indexOf( pathName ) > -1) && (this.page.current !== pathName) ) {
                this.page.current = pathName;
                this.scrollTo_BodyTop();
                sessionStorage['last_page'] = pathName;
                return true;
            }
        },
        active_page( pathName, methodName ) {
            if( this.page_list.indexOf( pathName ) > -1 ) {
                this[pathName] && this[pathName]()[methodName]();
            }
        },
        trig_Path( triggerName, methodName ) {
            console.log('trigger', triggerName );

            if( this.trigger_path.indexOf( triggerName ) > -1 ) {
                this[triggerName] && this[triggerName]()[methodName]();
                this.page.on_trigger_leave = this[triggerName] && this[triggerName]()['onLeave'];
            }


        },

        // page setting
        '/about' : function () {
            const page = '/about';

            return {
                start:()=>{
                    console.log('start about');

                    this.page.is_ready = false;
                    this[page]().done();
                },
                done: ()=>{
                    this.page.app_loaded = true;
                    this.page.is_ready = true;
                    console.log('done');
                },
            };
        },
        '/blog' : function () {
            const page = '/blog';
            
            return {
                start: ()=>{
                    console.log('start /blog');
                    this.page.is_ready = false;

                    const data_key = 'page_data:/'+page;
                    const cached_data = this.load_cached_data( data_key );

                    if( cached_data ) {
                        this.plurk = cached_data;
                        this[page]().done();
                        console.log(page, ' load from catche');

                    } else {
                        this[page]()
                            .fetch_data()
                            .then((data)=>{
                                this.plurk = data;
                                localStorage[ data_key ] = JSON.stringify( data );
                            })
                            .then(()=>{
                                this[page]().done();
                                console.log(page, ' load from net');
                            });
                    }
                },
                plurk_post_filter: (plurk)=>{
                    const id = plurk.id;
        
                    plurk.post.forEach((post)=>{
                        if( id !== post.author ) {
                            post.says = post.content.match(new RegExp(`^${id}\\s(.+\\s${post.author})\\s`))[1];
                            post.content = post.content.replace(new RegExp(`^${id}\\s.+\\s${post.author}\\s`), '');
                        } else {
                            post.says = '';
                            post.content = post.content.replace(new RegExp(`^${id}\\s`), '');
                        }
                        post.published = new Date(post.published);
                        post.localTime = this.dateToString(post.published);
                        post.timeAgo = this.dateToTimeAgo(post.published.getTime());
                        post.title = post.title.replace(new RegExp(`^${id}`), '');

                    });

                    plurk.expire = plurk.expire * 1000;
        
                    return plurk;
                },
                fetch_data: ()=>{
                    return fetch(this.api_url + '/v1/user/tales/plurk', {
                            method: 'post'
                        }).then(res=>res.json())
                        .then(data=>this[page]().plurk_post_filter(data));
                },
                done: ()=>{
                    this.page.app_loaded = true;
                    this.page.is_ready = true;
                    console.log(page, ' done');
                },
            };
        },
        '/illust' : function () {
            const page = '/illust';

            return {
                start: ()=>{
                    console.log('start /illust');
                    this.page.is_ready = false;

                    const data_key = 'page_data:/'+page;
                    const cached_data = this.load_cached_data( data_key );

                    if( cached_data ) {
                        this.pixiv = cached_data;
                        this[page]().done();
                        console.log(page, ' load from catche');

                    } else {
                        this[page]()
                            .fetch_data()
                            .then((data)=>{
                                this.pixiv = data;
                                localStorage[ data_key ] = JSON.stringify( data );
                            })
                            .then(()=>{
                                this[page]().done();
                                console.log(page, ' load from net');
                            });
                    }
                },
                pixiv_post_filter: (pixiv)=>{
                    pixiv.illust.forEach((post)=>{
                        post.published = new Date(post.published);
                        post.url = this.htmlDecode(post.url);
                        post.title = this.htmlDecode(post.title);
                        post.localTime = this.dateToString(post.published);
                        post.timeAgo = this.dateToTimeAgo(post.published.getTime());
                    });
                    pixiv.expire = pixiv.expire * 1000;
        
                    return pixiv;
                },
                fetch_data: ()=>{
                    return fetch(this.api_url + '/v1/user/tales/pixiv', {
                            method: 'post'
                        }).then(res=>res.json())
                        .then(data=>this[page]().pixiv_post_filter(data));
                },
                done: ()=>{
                    this.page.app_loaded = true;
                    this.page.is_ready = true;
                    console.log(page, ' done');
                },
            };
        },

        '/contact': function() {
            return {
                onTrigger: ()=> {
                    this.contact_modal.active = true;
                },
                onLeave: ()=> {
                    this.contact_modal.active = false;
                    this.$router.push({path: this.page.current || '/' });
                }
            }
        },
        '/qrcode': function() {
            return {
                onTrigger: ()=> {
                    this.qrcode_modal.active = true;
                },
                onLeave: ()=> {
                    this.qrcode_modal.active = false;
                    this.$router.push({path: this.page.current || '/' });
                }
            }
        }
    },
    created() {
        console.log('vue created');

        // 設定 watch 'app_loaded'
        // 當值為 true 時， 恢復捲軸位置並且設定紀錄捲軸位置的事件監聽器
        // 然後把自己砍掉 （也就是這個 watch 只會運作第一次）
        this.$set(this.$data.page, 'unWatch_AppLoad', (this.$watch(
                function() { return this.$data.page.app_loaded },
                function(is_app_loaded){

                    if(is_app_loaded) {
                        console.log('app_loaded');
        
                        if(sessionStorage['last_scrollY']) {
                            console.log( 'restore scroll to:', sessionStorage['last_scrollY']);
                            window.scrollTo({top: sessionStorage['last_scrollY']});
                        }
                        let scrollTimout;
        
                        window.addEventListener('scroll', ()=>{
                            clearTimeout(scrollTimout)
                            scrollTimout = setTimeout(()=>{
                                sessionStorage['last_scrollY'] = window.scrollY;
                            }, 600);
                        });
        
                        // 砍掉自己這個 watch
                        this.page.unWatch_AppLoad();
                        this.$delete(this.$data.page,'unWatch_AppLoad');
                    }

                }
            ))
        );

    },
    mounted() {
        this.routeTo( this.$route.path );
    }
})


})({Vue,VueRouter,window});