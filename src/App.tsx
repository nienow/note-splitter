import React from 'react';
import {DialogProvider} from "./providers/DialogProvider";
import {PopoverProvider} from "./providers/PopoverProvider";
import {EditorProvider} from "./providers/EditorProvider";

const App = ({text, save, isLocked}) => {
  return (
    <DialogProvider>
      <PopoverProvider>
        <EditorProvider text={text} save={save} isLocked={isLocked}/>
      </PopoverProvider>
    </DialogProvider>
  );
}

export default App
