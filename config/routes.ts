export default [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './home/Welcome' },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { component: './error/404' },
    ],
  },
  { path: '/request', name: '接口调试', icon: 'rocket', component: './request/index' },
  { path: '/project', name: '项目管理', icon: 'book', component: './project/index' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './home/Welcome' },
      { component: './error/404' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { component: './error/404' },
];
