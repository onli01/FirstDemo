import { addProject, getProject, getProjectAll } from '@/services/project/api';
import { getUserAll } from '@/services/user/api';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Col, message, Row, Input, Empty, Spin, Popover, Card, Avatar } from 'antd';
import { useEffect, useState } from 'react';

const { Search } = Input;

export default () => {
  const [dataList, setDataList] = useState([]);
  const [userList, setUserList] = useState([]);

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const proList = async () => {
    try {
      const resp = await getProjectAll();
      if (resp.code === 200) {
        setDataList(resp.data.list);
      } else {
        message.error(resp.msg);
      }
    } catch (e) {
      message.error(e);
    }
  };

  const getUserList = async () => {
    try {
      const resp = await getUserAll();
      if (resp.code === 200) {
        const ulist = resp.data.list;
        setUserList(
          ulist.map((user: any) => {
            return { value: user.username, label: user.username };
          }),
        );
      } else {
        message.error(resp.msg);
      }
    } catch (e) {
      message.error(e);
    }
  };

  useEffect(() => {
    proList();
  }, []);

  const handleFinish = async (values: any) => {
    await waitTime(2000);
    try {
      const resp = await addProject(values);
      console.log(values);
      if (resp.code === 200) {
        message.success(resp.msg);
        await proList();
      } else {
        message.error(resp.msg);
      }
    } catch (e) {
      message.error(e);
    }
    return true;
    // 进行其他操作...
  };

  const onSearchPro = async (proName: any) => {
    try {
      const params = { name: proName };
      const resp = await getProject(params);
      console.log(params);
      if (resp.code === 200) {
        setDataList(resp.data.list);
        // return resp.data;
      } else {
        message.error(resp.msg);
      }
    } catch (e) {
      message.error(e);
    }
  };

  // const userOpt = [{ value: '1', label: 'admin' }];

  return (
    <>
      <Row gutter={8} style={{ marginBottom: 16 }}>
        <Col span={4}>
          <Search placeholder="请输入项目名称" onSearch={onSearchPro} enterButton />
        </Col>
        <Col span={20}>
          <ModalForm
            title="新建项目"
            trigger={
              <Button
                type="primary"
                onClick={() => {
                  getUserList();
                }}
              >
                <PlusOutlined />
                创建项目
              </Button>
            }
            submitter={{
              searchConfig: {
                submitText: '确认',
                resetText: '取消',
              },
            }}
            onFinish={handleFinish}
          >
            <ProFormText name="name" label="项目名称" required placeholder="请输入名称" />

            <ProFormSelect
              options={userList}
              name="owner"
              label="项目负责人"
              required
              placeholder="请选择负责人"
            />

            <ProFormTextArea name="description" label="项目描述" placeholder="请输入项目描述" />
            <ProFormSwitch name="private" label="是否私有" />
          </ModalForm>
        </Col>
      </Row>
      <Spin spinning={false}>
        <Row gutter={16}>
          {console.log(dataList)}
          {dataList.length === 0 ? (
            <Col span={24} style={{ textAlign: 'center' }}>
              <Empty description="暂无项目" />
            </Col>
          ) : (
            dataList.map((item: any) => (
              <Col key={item.id} span={6} style={{ marginBottom: 12 }}>
                {/* Avatar（头像）组件，Popover是悬浮窗口*/}
                {/* <Popover content={content(item)} placement="rightTop"> */}
                <Card
                  hoverable
                  bordered={false}
                  style={{ borderRadius: 16, textAlign: 'center' }}
                  bodyStyle={{ padding: 16 }}
                  onClick={undefined}
                >
                  <Row gutter={16}>
                    <Col span={6}>
                      <Avatar style={{ backgroundColor: '#87d068' }} size={64}>
                        {item.name.slice(0, 2)}
                      </Avatar>
                    </Col>
                    <Col span={18} style={{ textAlign: 'left' }}>
                      <p
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}
                      >
                        项目名称：{item.name}
                      </p>
                      <p>负责人：{item.owner}</p>
                      <p>描述：{item.description || '无'}</p>
                      <p>创建时间：{item.create_time}</p>
                    </Col>
                  </Row>
                </Card>
                {/* </Popover> */}
              </Col>
            ))
          )}
        </Row>
      </Spin>
    </>
  );
};
