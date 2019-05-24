import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// const App = resolve => void (require(['../App'], resolve));

Vue.use(Router)

const App = resolve => void (require(['../components/Main'], resolve));

const router = new Router({
    routes: [
        {
            name: "login",
            menu: false,
            path: "/",
            meta:{title:'登录'},
            component: resolve => void(require(['../components/HelloWorld'], resolve)),
        },
        {
            name: "register",
            menu: false,
            path: "/register",
            meta:{title:'登录'},
            component: resolve => void(require(['../components/HelloWorld'], resolve)),
        },
        {
            name: "table",
            icon: "el-icon-goods",
            path: '/table/',
            redirect: '/table/list',
            component: App,
            // canReuse: false,
            meta: {title: '餐桌管理'},
            menu: true,
            children: [
                {
                    name: "list",
                    menu: true,
                    path: "list",
                    meta: {title: '餐桌信息'},
                    component: resolve => void (require(['../components/table/list'], resolve)),
                }
            ]
        }
    ]
})

// 访问权限
function canVisit(to) {
    return true;
}

//vue-router 前置拦截器
router.beforeEach((to, from, next) => {
    if(to.name == 'login' || to.name == 'register' ) {
        Vue.component('App', HelloWorld);
    } else {
        Vue.component('App', require('../components/Main.vue'));
    }

    if (to.meta.title) {
        document.title = '淘宝发单平台 - ' + to.meta.title;
    }

    if (to.path == '/login') {
        if (sessionStorage.getItem('login') == '') {
            window.location.href = sessionStorage.getItem('login');
        }
    }

    next();
});
// 后置拦截器
router.afterEach((to, from, next) => {

});
export default router;
