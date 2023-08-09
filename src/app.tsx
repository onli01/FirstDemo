// import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
// import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { Link } from 'umi';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
// import { currentUser as queryCurrentUser } from './services/user/api';

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/userLogin';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      // const msg = await queryCurrentUser();
      // return msg.data;
      return JSON.parse(localStorage.getItem('user') || '');
    } catch (error) {
      //如果拿不到返回登录页
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    // const currentUser = await fetchUserInfo();
    const currentUser = JSON.parse(localStorage.getItem('user') || '');
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    //此处渲染顶部右侧区域
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      //去掉页面中serati Ma水印
      // content: initialState?.currentUser?.username,
    },
    // 此配置用于渲染底部区域
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // 此配置用于渲染左侧菜单底部链接
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //       <Link to="/~docs" key="docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    //二级菜单不显示图标，支持二级菜单显示icon
    menuItemRender: (menuItemProps: any, defaultDom: any) => {
      if (menuItemProps.isUrl || !menuItemProps.path) {
        return defaultDom;
      }

      return (
        <Link to={menuItemProps.path}>
          {menuItemProps.pro_layout_parentKeys &&
            menuItemProps.pro_layout_parentKeys.length > 0 &&
            menuItemProps.icon}
          {defaultDom}
        </Link>
      );
    },
    // 自定义 403 页面
    unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any, props: { location: { pathname: string | string[] } }) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState: any) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
