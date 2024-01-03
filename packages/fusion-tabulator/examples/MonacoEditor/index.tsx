import Editor, { DiffEditor } from '@monaco-editor/react';

export const MonacoEditor = () => {
  function handleEditorChange(value, event) {
    // here is the current value
  }

  function handleEditorDidMount(editor, monaco) {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
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

  return (
    <div>
      <div style={{ border: '1px dashed #999' }}>
        <Editor height="50vh" defaultLanguage="javascript" defaultValue="// some comment"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            tabSize: 2
          }}
          beforeMount={handleEditorWillMount}
          onValidate={handleEditorValidation}
        />

      </div>

      <div style={{ marginTop: 24, border: '1px dashed #999' }}>
        <DiffEditor height="50vh" language="javascript" original="// the original code"
          modified="// the modified code"
          onMount={handleDiffEditorDidMount} />
      </div>
    </div>
  )
};