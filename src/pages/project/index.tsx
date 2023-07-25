import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <>
      <ModalForm
        title="新建项目"
        width={'50vh'}
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
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('提交成功');
          return true;
        }}
      >
        <ProFormText name="name" label="项目名称" tooltip="最长为 24 位" placeholder="请输入名称" />

        <ProFormSelect
          options={[
            {
              value: 'time',
              label: 'admin',
            },
          ]}
          name="owner"
          label="负责人"
        />
        <ProFormSelect
          options={[
            {
              value: 'time',
              label: '公有项目',
            },
            {
              value: 'time',
              label: '私有项目',
            },
          ]}
          name="private"
          label="是否私有"
        />
      </ModalForm>
    </>
  );
};
