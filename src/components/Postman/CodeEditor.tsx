import Editor from '@monaco-editor/react';

export default ({ language, height, theme, value, setValue }) => {
  const saveEditorValue = (val: any) => {
    setValue(val);
  };
  return (
    <Editor
      height={height || '35vh'}
      defaultLanguage={language || 'json'}
      defaultValue=""
      value={value || ''}
      theme={theme || 'light'}
      onChange={saveEditorValue}
    />
  );
};
