import { DeleteTwoTone } from '@ant-design/icons';
import EditTable from '../Table/EditTable';

export default ({ url, setUrl, paramsData, setParamsData, editableKeys, setEditableRowKeys }) => {
  // 根据paramsData拼接url
  const joinUrl = (data: any[]) => {
    let tempUrl = url.split('?')[0];
    data.forEach((item, idx) => {
      if (item.key) {
        // 如果item.key有效
        if (idx === 0) {
          tempUrl = `${tempUrl}?${item.key}=${item.value || ''}`;
        } else {
          tempUrl = `${tempUrl}&${item.key}=${item.value || ''}`;
        }
      }
    });
    setUrl(tempUrl);
  };

  const onDelete = (key: any) => {
    const data = paramsData.filter((item: { id: any }) => item.id !== key);
    setParamsData(data);
    joinUrl(data);
  };

  const columns = () => {
    return [
      {
        title: 'KEY',
        key: 'key',
        dataIndex: 'key',
      },
      {
        title: 'VALUE',
        key: 'value',
        dataIndex: 'value',
      },
      {
        title: 'DESCRIPTION',
        key: 'description',
        dataIndex: 'description',
      },
      {
        title: '操作',
        valueType: 'option',
        render: (text: any, record: { id: any }) => {
          return (
            <DeleteTwoTone
              style={{ cursor: 'pointer', marginLeft: 8 }}
              onClick={() => {
                onDelete(record.id);
              }}
              twoToneColor="#eb2f96"
            />
          );
        },
      },
    ];
  };

  return (
    <EditTable
      columns={columns()}
      dataSource={paramsData}
      setDataSource={setParamsData}
      extra={joinUrl}
      editableKeys={editableKeys}
      setEditableRowKeys={setEditableRowKeys}
    />
  );
};
