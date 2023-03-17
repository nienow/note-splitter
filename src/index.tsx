import React from 'react';
import EditorKit from "@standardnotes/editor-kit";

import App from './App';
import './stylesheets/main.scss';
import {createRoot} from "react-dom/client";
import {isDevEnv} from "./environment";
import {TEST_DATA} from "./test-data";


const save = (data: any) => {
  const text = JSON.stringify(data);
  try {
    editor.onEditorValueChanged(text);
  } catch (error) {
    console.log('Error saving note:', error);
  }
};
const initializeText = (text) => {
  console.log('initialize text 1');
  console.log(text);
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App text={text} save={save}/>
    </React.StrictMode>
  );
};

console.log('init editor');
const editor = new EditorKit({
  setEditorRawText: initializeText,
  clearUndoHistory: () => {
  },
  getElementsBySelector: () => []
}, {
  mode: 'plaintext',
  supportsFileSafe: false
});

if (isDevEnv()) {
  initializeText(TEST_DATA);
}
