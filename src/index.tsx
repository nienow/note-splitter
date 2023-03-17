import React from 'react';
import EditorKit from "@standardnotes/editor-kit";

import App from './App';
import './stylesheets/main.scss';
import {createRoot} from "react-dom/client";
import {isDevEnv} from "./environment";
import {TEST_DATA} from "./test-data";

const params = new URLSearchParams(window.location.search);

const save = (data: any) => {
  const text = JSON.stringify(data);
  try {
    editor.onEditorValueChanged(text);
  } catch (error) {
    console.log('Error saving note:', error);
  }
};
const initializeText = (text) => {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App text={text} save={save}/>
    </React.StrictMode>
  );
};

const editor = new EditorKit({
  setEditorRawText: initializeText,
  clearUndoHistory: () => {
  },
  getElementsBySelector: () => []
}, {
  mode: 'plaintext',
  supportsFileSafe: false
});

if (isDevEnv() || params.get('demo')) {
  initializeText(TEST_DATA);
}
