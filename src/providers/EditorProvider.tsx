import React, {createContext, useContext, useEffect, useState} from 'react';
import Unsupported from "../components/Unsupported";
import {newData, transformEditorData} from "../transformations";
import {EDITORS} from "../definitions";

interface IEditorContext {
  data: any;
  saveNote: () => void;
  saveNoteAndRefresh: () => void;
  changeEditor: (name: string) => void;
  isLocked: boolean;
}

const EditorContext = createContext<IEditorContext>({
  data: null,
  saveNote: null,
  saveNoteAndRefresh: null,
  changeEditor: null,
  isLocked: false
});

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({text, save, isLocked}) => {
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
    if (!text) {
      const data = newData();
      setData(data);
      saveNote();
    } else {
      const data = transformEditorData(text);
      if (data) {
        setData(data);
      } else {
        setUnsupported(true);
      }
    }
  };

  useEffect(() => {
    initializeText(text);
  }, [text]);


  const saveNote = () => {
    save(data);
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
    <EditorContext.Provider value={{data, changeEditor, saveNote, saveNoteAndRefresh, isLocked}}>
      {renderContent()}
    </EditorContext.Provider>
  );
};
