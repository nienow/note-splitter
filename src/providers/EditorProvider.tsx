import React, {createContext, useContext, useEffect, useState} from 'react';
import EditorKit from "@standardnotes/editor-kit";
import Unsupported from "../components/Unsupported";
import {isDevEnv} from "../environment";
import {newData, transformEditorData} from "../transformations";
import {TEST_DATA} from "../test-data";
import {EDITORS} from "../definitions";

// interface Props {
//   config: IEditorConfig;
// }

interface IEditorContext {
  data: any;
  hasChanges: boolean;
  saveNote: () => void;
  saveNoteAndRefresh: () => void;
  revertChanges: () => void;
  changeEditor: (name: string) => void;
}

const EditorContext = createContext<IEditorContext>({
  data: null,
  hasChanges: false,
  saveNote: null,
  saveNoteAndRefresh: null,
  revertChanges: null,
  changeEditor: null
});

export const useEditor = () => useContext(EditorContext);

let backupData;
export const EditorProvider = () => {
  const [editor, setEditor] = useState(null);
  const [data, setData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
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
      backupData = JSON.parse(JSON.stringify(data));
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
    setHasChanges(true);
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

  const revertChanges = () => {
    saveNote();
    setData(JSON.parse(JSON.stringify(backupData)));
    setHasChanges(false);
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
    <EditorContext.Provider value={{data, hasChanges, changeEditor, saveNote, saveNoteAndRefresh, revertChanges}}>
      {renderContent()}
    </EditorContext.Provider>
  );
};
