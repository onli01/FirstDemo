import React, { useState } from 'react';
import { Card, Row, Tabs } from 'antd';
import RequestParams from './RequestParams';
import RequestHeader from './RequestHeader';
import RequestBody from './RequestBody';
import RequestUrl from './RequestUrl';
import ResposeBody from './ResposeBody';

const { TabPane } = Tabs;

const Postman: React.FC = () => {
  const [bodyType, setBodyType] = useState(0);
  const [rawType, setRawType] = useState('JSON');
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [paramsData, setParamsData] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState(() => paramsData.map((item: any) => item.id));
  const [headers, setHeaders] = useState([]);
  const [headersKeys, setHeadersKeys] = useState(() => headers.map((item: any) => item.id));
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});

  return (
    <Card>
      <Row gutter={[8, 8]}>
        <RequestUrl
          url={url}
          setUrl={setUrl}
          method={method}
          setMethod={setMethod}
          setParamsData={setParamsData}
          setEditableRowKeys={setEditableRowKeys}
          loading={loading}
          setLoading={setLoading}
          headers={headers}
          setResponse={setResponse}
          bodyType={bodyType}
        />
      </Row>
      <Row style={{ marginTop: 8 }}>
        <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
          <TabPane tab="Params" key="1">
            <RequestParams
              url={url}
              setUrl={setUrl}
              paramsData={paramsData}
              setParamsData={setParamsData}
              editableKeys={editableKeys}
              setEditableRowKeys={setEditableRowKeys}
            />
          </TabPane>
          <TabPane tab="Headers" key="2">
            <RequestHeader
              headers={headers}
              setHeaders={setHeaders}
              headersKeys={headersKeys}
              setHeadersKeys={setHeadersKeys}
            />
          </TabPane>
          <TabPane tab="Body" key="3">
            <RequestBody
              bodyType={bodyType}
              setBodyType={setBodyType}
              rawType={rawType}
              setRawType={setRawType}
            />
          </TabPane>
        </Tabs>
      </Row>
      <Row gutter={[8, 8]}>
        <ResposeBody response={response} />
      </Row>
    </Card>
  );
};

export default Postman;
