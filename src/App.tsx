import React from 'react';
import {DialogProvider} from "./providers/DialogProvider";
import {PopoverProvider} from "./providers/PopoverProvider";
import {EditorProvider} from "./providers/EditorProvider";

const App = ({text, save}) => {
  return (
    <DialogProvider>
      <PopoverProvider>
        <EditorProvider text={text} save={save}/>
      </PopoverProvider>
    </DialogProvider>
  );
}

export default App
