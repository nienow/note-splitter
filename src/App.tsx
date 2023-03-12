import React from 'react';
import {DialogProvider} from "./providers/DialogProvider";
import {PopoverProvider} from "./providers/PopoverProvider";
import {EditorProvider} from "./providers/EditorProvider";

const App = () => {
  return (
    <DialogProvider>
      <PopoverProvider>
        <EditorProvider/>
      </PopoverProvider>
    </DialogProvider>
  );
}

export default App
