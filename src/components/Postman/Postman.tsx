// import React, { useState } from 'react';
import { Card, Col, Divider, Row, Tabs } from 'antd';
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
      <Divider />
      <Row gutter={[16, 16]} style={{ marginTop: 8, height: '75vh', background: '#F5F5F5' }}>
        <Col span={12}>
          <Tabs defaultActiveKey="1" style={{ width: '100%', height: '100%' }}>
            <TabPane tab="参数" key="1">
              <RequestParams />
            </TabPane>
            <TabPane tab="Headers" key="2">
              <RequestHeader />
            </TabPane>
            <TabPane tab="Body" key="3">
              <RequestBody />
            </TabPane>
          </Tabs>
        </Col>
        <Col span={12}>
          <Response />
        </Col>
      </Row>
      {/* <Row gutter={[8, 8]}>
        <Response />
      </Row> */}
    </Card>
  );
};

export default Postman;
