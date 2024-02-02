import { useRef, useState } from 'react';
import TabulatorWithRecoil from '../../src';
import { colConfigTableData, colConfigTableColumns } from '../constants';
import { Input, Select, Form, Button } from '@arco-design/web-react';
import { Editor } from '@monaco-editor/react';

const tagsApi = 'https://api.fujia.site/api/v1/tags';
const articlesApi = 'https://api.fujia.site/api/v1/articles';
const platformApi = 'https://staging.fusiontech.cn/api/v1/actions/execute';

const defaultContent = {
  actionId: '',
  tableData: [],
  colDef: [],
};

export const TabulatorTest = () => {
  const [customProps, setCustomProps] = useState<{
    actionId?: string;
    tableData?: any[];
    colDef?: any[];
  }>({});
  const editorRef = useRef(null);

  function handleEditorChange(value, event) {
    // here is the current value
  }

  function handleEditorDidMount(editor, monaco) {
    // console.log('onMount: the editor instance:', editor);
    // console.log('onMount: the monaco instance:', monaco);
    editorRef.current = editor;
  }

  function handleDiffEditorDidMount(editor, monaco) {
    console.log('onMount: the diff editor instance:', editor);
    console.log('onMount: the diff monaco instance:', monaco);
  }

  function handleEditorWillMount(monaco) {
    // here is the monaco instance
    // do something before editor is mounted
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    console.log('beforeMount: the monaco instance:', monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  function handleSync() {
    const value = editorRef.current.getValue();
    try {
      const parsedValue = JSON.parse(value);
      setCustomProps(parsedValue);
    } catch (err) {
      console.log(err);
    }
  }
  function hanldeEvents(eventName, data) {
    console.log(eventName, data);
  }

  return (
    <div>
      <div
        style={{
          border: '1px dashed #ddd',
          borderRadius: 6,
          marginBottom: 24,
        }}
      >
        <Editor
          height="30vh"
          defaultLanguage="json"
          defaultValue={JSON.stringify(defaultContent)}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            tabSize: 2,
          }}
          beforeMount={handleEditorWillMount}
          onValidate={handleEditorValidation}
        />
        <Button type="primary" onClick={handleSync}>
          确认
        </Button>
      </div>
      <div style={{ height: '70vh', padding: '32px' }}>
        <TabulatorWithRecoil
          onEvents={hanldeEvents}
          appMode="EDIT"
          widgetId="ss"
          tableType="tabulator"
          tabulatorOptions={{
            data: [
              {
                name: '',
                age: '',
                gender: '',
                height: '',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
