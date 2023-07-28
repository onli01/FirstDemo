import { EditableProTable } from '@ant-design/pro-components';

export default ({
  columns,
  dataSource,
  setDataSource,
  editableKeys,
  setEditableRowKeys,
  extra,
}) => {
  return (
    <>
      <EditableProTable
        columns={columns}
        rowKey="id"
        // scroll={{
        //   // x: 960,
        //   y: 500,
        // }}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            if (extra) {
              extra(recordList);
            }
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};
