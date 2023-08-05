export default [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './home/Welcome' },
  {
    path: '/userLogin',
    layout: false,
    routes: [{ path: '/userLogin', name: '登录', component: './userLogin/index' }],
  },
  {
    path: '/eventManage',
    name: '项目管理',
    icon: 'book',
    routes: [
      {
        path: '/eventManage/eventList',
        name: '项目管理',
        icon: 'rocket',
        component: './eventManage/eventList/index',
      },
      {
        path: '/eventManage/envSet',
        name: '环境管理',
        icon: 'smile',
        component: './eventManage/envSet/index',
      },
      {
        path: '/eventManage/variableSet',
        name: '变量设置',
        icon: 'rocket',
        component: './eventManage/variableSet/index',
      },
    ],
  },
  {
    path: '/apiManage',
    name: '接口管理',
    icon: 'book',
    routes: [
      {
        path: '/apiManage/apiInfo',
        name: '接口管理',
        icon: 'rocket',
        component: './apiManage/apiInfo/index',
      },
      {
        path: '/apiManage/apiCase',
        name: '接口用例',
        icon: 'rocket',
        component: './apiManage/apiCase/index',
      },
    ],
  },
  {
    path: '/utilityTools',
    name: '实用工具',
    icon: 'rocket',
    routes: [
      {
        path: '/utilityTools/postman',
        name: '接口调试',
        icon: 'rocket',
        component: './utilityTools/postman/index',
      },
      {
        path: '/utilityTools/sqlClient',
        name: 'SQL客户端',
        icon: 'rocket',
        component: './utilityTools/sqlClient/index',
      },
      {
        path: '/utilityTools/redisClient',
        name: 'Redis客户端',
        icon: 'rocket',
        component: './utilityTools/redisClient/index',
      },
      {
        path: '/utilityTools/jsonFormat',
        name: 'JSON格式化',
        icon: 'rocket',
        component: './utilityTools/jsonFormat/index',
      },
      {
        path: '/utilityTools/timesChange',
        name: '时间转化',
        icon: 'rocket',
        component: './utilityTools/timesChange/index',
      },
    ],
  },
  {
    path: '/systemManage',
    name: '系统管理',
    icon: 'crown',
    routes: [
      {
        path: '/systemManage/userManage',
        name: '用户管理',
        icon: 'smile',
        component: './systemManage/userManage/index',
      },
      {
        path: '/systemManage/systemSet',
        name: '系统设置',
        icon: 'smile',
        component: './systemManage/systemSet/index',
      },
    ],
  },
  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: 'crown',
  //   routes: [
  //     { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './home/Welcome' },
  //   ],
  // },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { component: './errorPage/404' },
];
