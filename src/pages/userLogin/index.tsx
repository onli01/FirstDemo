// import Footer from '@/components/Footer';
import { login, register } from '@/services/user/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  // AlipayCircleOutlined,
  LockOutlined,
  // MobileOutlined,
  // TaobaoCircleOutlined,
  UserOutlined,
  // WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  // ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';

/**弹窗提示 */
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState({});
  const [type, setType] = useState<string>('login');
  const { initialState, setInitialState } = useModel('@@initialState');

  /** 获取用户信息 */
  const fetchUserInfo = async () => {
    // const userInfo = await initialState?.fetchUserInfo?.();
    const userInfo = JSON.parse(localStorage.getItem('user') || '');
    if (userInfo) {
      // 手动设置 initialState
      await setInitialState((s: any) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  /** 此方法会跳转到 redirect 参数所在的位置 */
  const replaceGoto = async () => {
    if (!history) {
      return;
    }
    const { query } = history.location;
    const { redirect } = query as {
      redirect: string;
    };
    history.push(redirect || '/');
  };

  /** 提交 */
  const handleSubmit = async (values: any) => {
    /**type=account 登录*/
    if (type === 'login') {
      try {
        const resp = await login({
          ...values,
          type,
        });

        if (resp.code === 200) {
          localStorage.setItem('token', JSON.stringify(resp.data.token));
          localStorage.setItem('user', JSON.stringify(resp.data.user));

          const defaultLoginSuccessMessage = resp.msg;
          message.success(defaultLoginSuccessMessage);
          await fetchUserInfo();
          await replaceGoto();
          return;
        } else {
          message.error(resp.msg);
        }
        // console.log(resp);
        // 如果失败去设置用户错误信息
        setUserLoginState(resp);
      } catch (error) {
        const defaultLoginFailureMessage = '登录失败，请重试！';
        message.error(defaultLoginFailureMessage);
      }
    } else {
      try {
        const resp = await register({
          ...values,
        });

        if (resp.code === 200) {
          const defaultLoginSuccessMessage = resp.msg;
          message.success(defaultLoginSuccessMessage);
          await replaceGoto(); //页面跳转
          return;
        } else {
          message.error(resp.msg);
        }
      } catch (error) {
        // console.log(error);
        const defaultLoginFailureMessage = '注册失败，请重试！';
        message.error(defaultLoginFailureMessage);
      }
    }
  };

  const { code, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="AutoTest"
          subTitle={'AutoTest Manager Project'}
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            searchConfig: { submitText: '确认' },
            // submitButtonProps: {
            //   style: {
            //     width: '100%',
            //   },
            // },
            // resetButtonProps: false,
          }}
          actions={
            [
              // '其他登录方式 :',
              // <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
              // <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
              // <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
            ]
          }
          onFinish={async (values) => {
            if (type === 'login') {
              await handleSubmit(values as API.LoginParams);
            } else {
              await handleSubmit(values as API.RegisterParams);
            }
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="login" tab={'账号登录'} />
            {/* <Tabs.TabPane key="mobile" tab={'手机号登录'} /> */}
            <Tabs.TabPane key="register" tab={'注册账号'} />
          </Tabs>

          {code === 101 && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码'} />
          )}

          {type === 'login' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {type === 'register' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                name="username"
                placeholder="请输入用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ]}
              />
              <ProFormText.Password
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                  type: 'password',
                }}
                name="password"
                placeholder="请输入用户密码"
                rules={[
                  {
                    required: true,
                    message: '请输入用户密码',
                  },
                ]}
              />
            </>
          )}

          {/* {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="mobile"
                placeholder={'请输入手机号！'}
                rules={[
                  {
                    required: true,
                    message: '手机号是必填项！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '不合法的手机号！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码！'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  const result = await getFakeCaptcha({
                    phone,
                  });
                  if (result === false) {
                    return;
                  }
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )} */}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码 ?
            </a>
          </div>
        </LoginForm>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default Login;
