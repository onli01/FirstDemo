import { DeleteTwoTone } from '@ant-design/icons';
import { useModel } from 'umi';
import EditTable from '../Table/EditTable';

export default () => {
  const { headers, setHeaders, headersKeys, setHeadersKeys } = useModel('postman', (header) => ({
    headers: header.headers,
    setHeaders: header.upHeaders,
    headersKeys: header.headersKeys,
    setHeadersKeys: header.upHeadersKeys,
  }));
  const onDelete = (key: any) => {
    const data = headers.filter((item: { id: any }) => item.id !== key);
    setHeaders(data);
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
      dataSource={headers}
      setDataSource={setHeaders}
      editableKeys={headersKeys}
      setEditableRowKeys={setHeadersKeys}
      extra={undefined}
    />
  );
};
