import { addProject, getProject, projectList } from '@/services/project/api';
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
  const [dataList, setDataList] = useState();

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const proList = async () => {
    try {
      const resp = await projectList();
      if (resp.code === 200) {
        setDataList(resp.data);
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
        setDataList(resp.data);
        // return resp.data;
      } else {
        message.error(resp.msg);
      }
    } catch (e) {
      message.error(e);
    }
  };

  const userOpt = [{ value: '1', label: 'admin' }];

  return (
    <>
      <Row gutter={8} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Search placeholder="请输入项目名称" onSearch={onSearchPro} enterButton />
        </Col>
        <Col span={18}>
          <ModalForm
            title="新建项目"
            trigger={
              <Button type="primary">
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
              options={userOpt}
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
        <Row gutter={16} style={{ height: '80vh' }}>
          {console.log(dataList)}
          {dataList === undefined ? (
            <Col span={24} style={{ textAlign: 'center' }}>
              <Empty description="暂无项目" />
            </Col>
          ) : (
            dataList.map((item) => (
              <Col key={item.id} span={4} style={{ marginBottom: 12 }}>
                <Popover content={undefined} placement="rightTop">
                  <Card
                    hoverable
                    bordered={false}
                    style={{ borderRadius: 16, textAlign: 'center' }}
                    bodyStyle={{ padding: 16 }}
                    onClick={undefined}
                  >
                    <Avatar style={{ backgroundColor: '#87d068' }} size={64}>
                      {item.name.slice(0, 2)}
                    </Avatar>
                    <p
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 18,
                        marginTop: 8,
                      }}
                    >
                      {item.name}
                    </p>
                  </Card>
                </Popover>
              </Col>
            ))
          )}
        </Row>
      </Spin>
    </>
  );
};
