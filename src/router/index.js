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
            name: "order",
            icon: "el-icon-goods",
            path: '/v2/merchant/',
            redirect: '/v2/merchant/game-leveling',
            component: App,
            // canReuse: false,
            meta: {title: '商家管理'},
            menu: true,
            children: [
                {
                    name: "gameLevelingOrderChannel",
                    menu: true,
                    path: "game-leveling/channel",
                    meta: {title: '商家信息'},
                    component: resolve => void (require(['../components/order/game-leveling/Channel'], resolve)),
                },
                {
                    name: "gameLevelingOrderTaobao",
                    menu: true,
                    path: "game-leveling/taobao",
                    meta: {title: '代练待发'},
                    component: resolve => void (require(['../components/order/game-leveling/Taobao'], resolve)),
                },
                {
                    name: "gameLevelingOrderBusinessmanComplain",
                    menu: true,
                    path: "game-leveling/businessman-complain",
                    meta: {title: '订单投诉'},
                    component: resolve => void (require(['../components/order/game-leveling/BusinessmanComplain'], resolve)),
                }
            ]
        },
        {
            name: "order",
            icon: "el-icon-goods",
            path: '/v2/food/',
            redirect: '/v2/food/game-leveling',
            component: App,
            // canReuse: false,
            meta: {title: '美食管理'},
            menu: true,
            children: [
                {
                    name: "gameLevelingOrderChannel",
                    menu: true,
                    path: "game-leveling/channel",
                    meta: {title: '商家信息'},
                    component: resolve => void (require(['../components/order/game-leveling/Channel'], resolve)),
                },
                {
                    name: "gameLevelingOrderTaobao",
                    menu: true,
                    path: "game-leveling/taobao",
                    meta: {title: '代练待发'},
                    component: resolve => void (require(['../components/order/game-leveling/Taobao'], resolve)),
                },
                {
                    name: "gameLevelingOrderBusinessmanComplain",
                    menu: true,
                    path: "game-leveling/businessman-complain",
                    meta: {title: '订单投诉'},
                    component: resolve => void (require(['../components/order/game-leveling/BusinessmanComplain'], resolve)),
                }
            ]
        },
        {
            name: "order",
            icon: "el-icon-goods",
            path: '/v2/tables/',
            redirect: '/v2/tables/game-leveling',
            component: App,
            // canReuse: false,
            meta: {title: '座位管理'},
            menu: true,
            children: [
                {
                    name: "gameLevelingOrderChannel",
                    menu: true,
                    path: "game-leveling/channel",
                    meta: {title: '商家信息'},
                    component: resolve => void (require(['../components/order/game-leveling/Channel'], resolve)),
                },
                {
                    name: "gameLevelingOrderTaobao",
                    menu: true,
                    path: "game-leveling/taobao",
                    meta: {title: '代练待发'},
                    component: resolve => void (require(['../components/order/game-leveling/Taobao'], resolve)),
                },
                {
                    name: "gameLevelingOrderBusinessmanComplain",
                    menu: true,
                    path: "game-leveling/businessman-complain",
                    meta: {title: '订单投诉'},
                    component: resolve => void (require(['../components/order/game-leveling/BusinessmanComplain'], resolve)),
                }
            ]
        },
        {
            name: "order",
            icon: "el-icon-goods",
            path: '/v2/order/',
            redirect: '/v2/order/game-leveling',
            component: App,
            // canReuse: false,
            meta: {title: '订单管理'},
            menu: true,
            children: [
                {
                    name: "gameLevelingOrderChannel",
                    menu: true,
                    path: "game-leveling/channel",
                    meta: {title: '商家信息'},
                    component: resolve => void (require(['../components/order/game-leveling/Channel'], resolve)),
                },
                {
                    name: "gameLevelingOrderTaobao",
                    menu: true,
                    path: "game-leveling/taobao",
                    meta: {title: '代练待发'},
                    component: resolve => void (require(['../components/order/game-leveling/Taobao'], resolve)),
                },
                {
                    name: "gameLevelingOrderBusinessmanComplain",
                    menu: true,
                    path: "game-leveling/businessman-complain",
                    meta: {title: '订单投诉'},
                    component: resolve => void (require(['../components/order/game-leveling/BusinessmanComplain'], resolve)),
                }
            ]
        },
        {
            name: "order",
            icon: "el-icon-goods",
            path: '/v2/pay/',
            redirect: '/v2/pay/game-leveling',
            component: App,
            // canReuse: false,
            meta: {title: '支付管理'},
            menu: true,
            children: [
                {
                    name: "gameLevelingOrderChannel",
                    menu: true,
                    path: "game-leveling/channel",
                    meta: {title: '商家信息'},
                    component: resolve => void (require(['../components/order/game-leveling/Channel'], resolve)),
                },
                {
                    name: "gameLevelingOrderTaobao",
                    menu: true,
                    path: "game-leveling/taobao",
                    meta: {title: '代练待发'},
                    component: resolve => void (require(['../components/order/game-leveling/Taobao'], resolve)),
                },
                {
                    name: "gameLevelingOrderBusinessmanComplain",
                    menu: true,
                    path: "game-leveling/businessman-complain",
                    meta: {title: '订单投诉'},
                    component: resolve => void (require(['../components/order/game-leveling/BusinessmanComplain'], resolve)),
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
