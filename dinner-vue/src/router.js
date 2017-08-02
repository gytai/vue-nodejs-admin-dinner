const routers = [
    {
        path: '/',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/index',
        meta: {
            title: '订餐系统'
        },
        component: (resolve) => require(['./views/index.vue'], resolve),
        children:[
            { path: 'order', component: (resolve) => require(['./views/nav1/order.vue'], resolve)},
            { path: 'reset', component: (resolve) => require(['./views/nav2/reset.vue'], resolve)}
        ]
    }
];
export default routers;