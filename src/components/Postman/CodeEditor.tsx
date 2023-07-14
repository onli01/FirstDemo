import Editor from '@monaco-editor/react';

export default ({ language, value, onChange, height, theme }) => {
  return (
    <Editor
      height={height || '35vh'}
      defaultLanguage={language || 'json'}
      defaultValue=""
      value={value}
      theme={theme || 'light'}
      onChange={onChange}
    />
  );
};
