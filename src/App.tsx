import React from 'react';
import {DialogProvider} from "./providers/DialogProvider";
import GridEditor from "./grid/GridEditor";
import ListEditor from "./list/ListEditor";
import TabEditor from "./tab/TabEditor";
import {PopoverProvider} from "./providers/PopoverProvider";

const DEFAULT_ROUTE = <div>Invalid</div>;
const ROUTES = {
  '#grid': <GridEditor></GridEditor>,
  '#list': <ListEditor></ListEditor>,
  '#tab': <TabEditor></TabEditor>,
};

const App = () => {
  return (
    <DialogProvider>
      <PopoverProvider>
        {
          ROUTES[location.hash] || DEFAULT_ROUTE
        }
      </PopoverProvider>
    </DialogProvider>
  );
}

export default App
