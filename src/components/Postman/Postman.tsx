// import React, { useState } from 'react';
import { Card, Row, Tabs } from 'antd';
import RequestParams from './RequestParams';
import RequestHeader from './RequestHeader';
import Request from './Request';
import Response from './Response';
import RequestBody from './RequestBody';

const { TabPane } = Tabs;

const Postman: React.FC = () => {
  return (
    <Card>
      <Row gutter={[8, 8]}>
        <Request />
      </Row>
      <Row style={{ marginTop: 8 }}>
        <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
          <TabPane tab="Params" key="1">
            <RequestParams />
          </TabPane>
          <TabPane tab="Headers" key="2">
            <RequestHeader />
          </TabPane>
          <TabPane tab="Body" key="3">
            <RequestBody />
          </TabPane>
        </Tabs>
      </Row>
      <Row gutter={[8, 8]}>
        <Response />
      </Row>
    </Card>
  );
};

export default Postman;
