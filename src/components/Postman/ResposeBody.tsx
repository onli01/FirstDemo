import { Table, Tabs } from 'antd';
import CodeEditor from './CodeEditor';

const { TabPane } = Tabs;

export default ({ response }) => {
  const resColumns = [
    {
      title: 'KEY',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'VALUE',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const toTable = (field: string) => {
    if (!response[field]) {
      return [];
    }
    return Object.keys(response[field]).map((key) => ({
      key,
      value: response[field][key],
    }));
  };

  const STATUS = {
    200: { color: '#67C23A', text: 'OK' },
    401: { color: '#F56C6C', text: 'unAuthorized' },
  };

  const tabExtra = (response) => {
    return response ? (
      <div style={{ marginRight: 16 }}>
        <span>
          Status:
          <span
            style={{ color: STATUS[response.status_code].color, marginLeft: 8, marginRight: 8 }}
          >
            {response.status_code}
            {STATUS[response.status_code].text}
          </span>
          <span style={{ marginLeft: 8, marginRight: 8 }}>
            Time:<span style={{ color: '#67C23A' }}>{response.elapsed}</span>
          </span>
        </span>
      </div>
    ) : null;
  };

  return (
    <>
      {Object.keys(response).length === 0 ? null : (
        <Tabs style={{ width: '100%' }} tabBarExtraContent={tabExtra(response)}>
          <TabPane tab="Body" key={1}>
            <CodeEditor
              value={response.response ? JSON.stringify(response.response) : ''}
              height="30vh"
              language={undefined}
              onChange={undefined}
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
      )}
    </>
  );
};
