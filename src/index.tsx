import React from 'react';

import App from './App';
import './stylesheets/main.scss';
import {createRoot} from "react-dom/client";
import EditorHelper from "./editor-helper";
import {IData} from "./definitions";

const generatePreview = (data: IData) => {
  if (data.title) {
    return data.sections.map(section => section.title).filter(title => !!title).join(', ');
  } else {
    return '';
  }
};

const save = (data: any) => {
  const text = JSON.stringify(data);
  try {
    editor.save(text, generatePreview(data));
  } catch (error) {
    console.log('Error saving note:', error);
  }
};

const editor = new EditorHelper();
editor.connect((text, isLocked) => {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App text={text} save={save} isLocked={isLocked}/>
    </React.StrictMode>
  );
});
