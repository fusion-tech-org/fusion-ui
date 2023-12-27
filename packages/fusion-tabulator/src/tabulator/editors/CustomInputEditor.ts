import { CellComponent } from 'tabulator-tables';

export const CustomInputEditor = (
  cell: CellComponent,
  onRenderer: CallableFunction,
  success: CallableFunction
  // cancel: CallableFunction,
  // editorParams: Record<string, unknown>
) => {
  // cell - the cell component for the editable cell
  // onRendered - function to call when the editor has been rendered
  // success - function to call to pass thesuccessfully updated value to Tabulator
  // cancel - function to call to abort the edit and return to a normal cell
  // editorParams - params object passed into the editorParams column definition property

  // create and style editor
  const editor = document.createElement('input');

  editor.setAttribute('type', 'date');

  //create and style input
  editor.style.padding = '3px';
  editor.style.width = '100%';
  editor.style.boxSizing = 'border-box';

  //Set value of editor to the current value of the cell
  editor.value = '';

  //set focus on the select box when the editor is selected (timeout allows for editor to be added to DOM)

  onRenderer(() => {
    editor.focus();
    // editor.style.css = ''
  });

  //when the value has been set, trigger the cell to update
  function successFunc() {
    // success();
    console.log('successfully callback');
  }

  editor.addEventListener('change', successFunc);
  editor.addEventListener('blur', successFunc);

  // return the editor element
  return editor;
};
