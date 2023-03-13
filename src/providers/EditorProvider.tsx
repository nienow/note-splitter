import React, {createContext, useContext, useEffect, useState} from 'react';
import EditorKit from "@standardnotes/editor-kit";
import Unsupported from "../components/Unsupported";
import {isDevEnv} from "../environment";
import {newData, transformEditorData} from "../transformations";
import {TEST_DATA} from "../test-data";
import {EDITORS} from "../definitions";

interface IEditorContext {
  data: any;
  saveNote: () => void;
  saveNoteAndRefresh: () => void;
  changeEditor: (name: string) => void;
}

const EditorContext = createContext<IEditorContext>({
  data: null,
  saveNote: null,
  saveNoteAndRefresh: null,
  changeEditor: null
});

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = () => {
  const [editor, setEditor] = useState(null);
  const [data, setData] = useState(null);
  const [unsupported, setUnsupported] = useState(false);

  const changeEditor = (name: string) => {
    data.editor = name;
    saveNoteAndRefresh();
  };

  const eraseDataAndStartNewNote = () => {
    setUnsupported(false);
    setData(newData());
    saveNote();
  };

  const initializeText = (text) => {
    const data = transformEditorData(text);
    if (data) {
      setData(data);
    } else {
      setUnsupported(true);
    }
  };

  useEffect(() => {
    setEditor(new EditorKit({
      setEditorRawText: initializeText,
      clearUndoHistory: () => {
      },
      getElementsBySelector: () => []
    }, {
      mode: 'plaintext',
      supportsFileSafe: false
    }));

    if (isDevEnv()) {
      initializeText(TEST_DATA);
    }
  }, []);


  const saveNote = () => {
    // setHasChanges(true);
    const text = JSON.stringify(data);
    try {
      editor.onEditorValueChanged(text);
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  const saveNoteAndRefresh = () => {
    setData({...data});
    saveNote();
  };

  const renderContent = () => {
    if (data) {
      const Editor = EDITORS[data.editor];
      return <Editor/>;
    } else if (unsupported) {
      return <Unsupported eraseFn={eraseDataAndStartNewNote}></Unsupported>;
    } else {
      return <div>Loading...</div>
    }
  };

  return (
    <EditorContext.Provider value={{data, changeEditor, saveNote, saveNoteAndRefresh}}>
      {renderContent()}
    </EditorContext.Provider>
  );
};
