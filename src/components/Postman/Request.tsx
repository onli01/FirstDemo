import { sendRequest } from '@/services/request/api';
import { SendOutlined } from '@ant-design/icons';
import { Button, Col, Input, notification, Select } from 'antd';
import { useModel } from 'umi';
const { Option } = Select;

export default () => {
  const {
    url,
    setUrl,
    method,
    setMethod,
    setParamsData,
    setEditableKeys,
    loading,
    setLoading,
    headers,
    setRespResult,
    bodyType,
    bodyValue,
  } = useModel('postman', (req) => ({
    url: req.url,
    setUrl: req.upUrl,
    method: req.method,
    setMethod: req.upMethod,
    setParamsData: req.upParamsData,
    setEditableKeys: req.upEditableKeys,
    loading: req.loading,
    setLoading: req.upLoading,
    headers: req.headers,
    setRespResult: req.upResponse,
    bodyType: req.bodyType,
    bodyValue: req.bodyValue,
  }));

  const selectBefore = (
    <Select
      value={method}
      onChange={(data) => setMethod(data)}
      style={{ width: 120, fontSize: 16, textAlign: 'left' }}
    >
      <Option key="GET" value="GET">
        GET
      </Option>
      <Option key="POST" value="POST">
        POST
      </Option>
      <Option key="PUT" value="PUT">
        PUT
      </Option>
      <Option key="DELETE" value="DELETE">
        DELETE
      </Option>
    </Select>
  );

  const splitUrl = (nowUrl: string) => {
    const split = nowUrl.split('?');
    if (split.length < 2) {
      setParamsData([]);
    } else {
      const params = split[1].split('&');
      const newParams:
        | ((prevState: never[]) => never[])
        | { key: string; value: string; id: number; description: string }[] = [];
      const keys: React.SetStateAction<any[]> = [];
      params.forEach((item, idx) => {
        const [key, value] = item.split('=');
        const now = Date.now();
        keys.push(now + idx + 10);
        newParams.push({ key, value, id: now + idx + 10, description: '' });
      });
      setParamsData(newParams);
      setEditableKeys(keys);
    }
  };

  const getHeaders = () => {
    const result = {};
    headers.forEach((item: any) => {
      if (item.key !== '') {
        result[item.key] = item.value;
      }
    });
    return result;
  };

  const onRequest = async () => {
    if (url === '') {
      notification.error({
        message: 'url不能为空',
      });
      return;
    }
    setLoading(true);
    const params = {
      method,
      url,
      body: {},
      headers: getHeaders(),
    };
    if (bodyType === 3) {
      params.body = JSON.parse(String(bodyValue));
    }
    console.log(params);
    const res = await sendRequest(params);
    setLoading(false);
    if (res.code !== 200) {
      notification.error(res);
      return;
    }
    setRespResult(res.data);
  };

  return (
    <>
      <Col span={20}>
        <Input
          size="large"
          value={url}
          addonBefore={selectBefore}
          // placeholder="请输入要请求的url"
          onChange={(e) => {
            setUrl(e.target.value);
            splitUrl(e.target.value);
          }}
        />
      </Col>
      <Col span={4}>
        <Button type="primary" size="large" onClick={onRequest} loading={loading}>
          <SendOutlined />
          发送
        </Button>
      </Col>
    </>
  );
};
