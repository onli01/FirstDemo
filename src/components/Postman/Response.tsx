import { Table, Tabs } from 'antd';
import { useModel } from 'umi';
import CodeEditor from './CodeEditor';

const { TabPane } = Tabs;

export default () => {
  const { respResult } = useModel('postman', (resp) => ({
    respResult: resp.respResult,
  }));

  const resColumns = [
    {
      title: '键',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const toTable = (field: string) => {
    if (!respResult[field]) {
      return [];
    }
    return Object.keys(respResult[field]).map((key) => ({
      key,
      value: respResult[field][key],
    }));
  };

  const STATUS = {
    0: { color: '#F56C6C', text: 'error' },
    200: { color: '#67C23A', text: 'OK' },
    400: { color: '#F56C6C', text: 'error' },
    401: { color: '#F56C6C', text: 'unAuthorized' },
    405: { color: '#F56C6C', text: 'error' },
    201: { color: '#F56C6C', text: 'error' },
    202: { color: '#F56C6C', text: 'error' },
    204: { color: '#F56C6C', text: 'error' },
    403: { color: '#F56C6C', text: 'error' },
    404: { color: '#F56C6C', text: 'error' },
    406: { color: '#F56C6C', text: 'error' },
    410: { color: '#F56C6C', text: 'error' },
    422: { color: '#F56C6C', text: 'error' },
    500: { color: '#F56C6C', text: 'error' },
    502: { color: '#F56C6C', text: 'error' },
    503: { color: '#F56C6C', text: 'error' },
    504: { color: '#F56C6C', text: 'error' },
  };

  const tabExtra = (respResult) => {
    return JSON.stringify(respResult) !== '{}' ? (
      <div style={{ marginRight: 16 }}>
        <span>
          Status:
          <span
            style={{ color: STATUS[respResult.status_code].color, marginLeft: 8, marginRight: 8 }}
          >
            {respResult.status_code}
            <span style={{ marginLeft: 8 }}>{STATUS[respResult.status_code].text}</span>
          </span>
          <span style={{ marginLeft: 8, marginRight: 8 }}>
            Time:
            <span style={{ color: '#67C23A', marginLeft: 8, marginRight: 8 }}>
              {respResult.elapsed || '0 ms'}
            </span>
          </span>
        </span>
      </div>
    ) : null;
  };

  return (
    <>
      <Tabs style={{ width: '100%' }} tabBarExtraContent={tabExtra(respResult)}>
        <TabPane tab="Body" key={1}>
          <CodeEditor
            value={respResult.response ? JSON.stringify(respResult.response, null, 2) : ''}
            height="30vh"
            language={undefined}
            setValue={undefined}
            theme={undefined}
          />
        </TabPane>
        <TabPane tab="Cookie" key={2}>
          <Table
            columns={resColumns}
            dataSource={toTable('cookies')}
            size="small"
            pagination={false}
          />
        </TabPane>

        <TabPane tab="Headers" key={3}>
          <Table
            columns={resColumns}
            dataSource={toTable('response_header')}
            size="small"
            pagination={false}
          />
        </TabPane>
      </Tabs>
    </>
  );
};
