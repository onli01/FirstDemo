import { useModel } from 'umi';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Card, Col, Dropdown, Radio, Row, Space } from 'antd';
import CodeEditor from './CodeEditor';

export default () => {
  const { bodyType, setBodyType, rawType, setRawType, bodyValue, setBodyValue } = useModel(
    'postman',
    (body) => ({
      bodyType: body.bodyType,
      setBodyType: body.upBodyType,
      rawType: body.rawType,
      setRawType: body.upRawType,
      bodyValue: body.bodyValue,
      setBodyValue: body.upBodyValue,
    }),
  );

  const onClick: MenuProps['onClick'] = ({ key }) => {
    // message.info(`Click on item ${key}`);
    setRawType(key);
  };

  const items: MenuProps['items'] = [
    {
      label: 'JSON',
      key: 'JSON',
    },
    {
      label: 'Text',
      key: 'Text',
    },
    {
      label: 'JavaScript',
      key: 'JavaScript',
    },
    {
      label: 'XML',
      key: 'XML',
    },
    {
      label: 'HTML',
      key: 'HTML',
    },
  ];

  return (
    <>
      <Row>
        <Radio.Group
          defaultValue={3}
          value={bodyType}
          onChange={(e) => {
            setBodyType(e.target.value);
          }}
        >
          <Radio value={0}>none</Radio>
          <Radio value={1}>form-data</Radio>
          <Radio value={2}>x-www-form-urlencoded</Radio>
          <Radio value={3}>raw</Radio>
          <Radio value={4}>binary</Radio>
          <Radio value={5}>GraphQL</Radio>
        </Radio.Group>
        {bodyType === 3 && (
          <Dropdown menu={{ items, onClick }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {rawType} <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        )}
      </Row>
      <Row style={{ marginTop: 12 }}>
        <Col span={24}>
          <Card bodyStyle={{ padding: 0 }}>
            {bodyType === 3 ? (
              <CodeEditor
                language={rawType}
                height={'30vh'}
                theme={undefined}
                setValue={setBodyValue}
                value={undefined}
              />
            ) : (
              <div style={{ height: '35vh', lineHeight: '35vh', textAlign: 'center' }}>
                This Body does not have a body
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};
