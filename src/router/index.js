import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// const App = resolve => void (require(['../App'], resolve));

Vue.use(Router)

const App = resolve => void (require(['../components/Main'], resolve));

const router = new Router({
    routes: [
        {
            name: "login",
            menu: false,
            path: "/login",
            meta:{title:'登录'},
            component: resolve => void(require(['../components/HelloWorld'], resolve)),
        },
        {
            name: "register",
            menu: false,
            path: "/register",
            meta:{title:'注册'},
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
                    component: resolve => void (require(['../components/table/List'], resolve)),
                }
            ]
        },
        {
            name: "dish",
            icon: "el-icon-goods",
            path: '/dish/',
            redirect: '/dish/pages',
            component: App,
            // canReuse: false,
            meta: {title: '菜肴管理'},
            menu: true,
            children: [
                {
                    name: "list",
                    menu: true,
                    path: "pages",
                    meta: {title: '菜肴信息'},
                    component: resolve => void (require(['../components/dish/List'], resolve)),
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
    if(to.name === 'login' || to.name === 'register' || to.path === '/login') {
        next();
    } else {
        if (! sessionStorage.getItem('Authorization') || sessionStorage.getItem('Authorization') == null) {
            next({path:'/login'});
            // next();
        } else  {
            Vue.component('App', require('../components/Main.vue'));
            next();
        }
    }
});
// 后置拦截器
router.afterEach((to, from, next) => {

});
export default router;
