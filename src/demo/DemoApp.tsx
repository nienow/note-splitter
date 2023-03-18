import React, {useState} from 'react';
import {DialogProvider} from "../providers/DialogProvider";
import {PopoverProvider} from "../providers/PopoverProvider";
import {EditorProvider} from "../providers/EditorProvider";
import styled from "styled-components";
import {DAILY_GOALS, RECIPES, SHOPPING_LIST, WEEKLY_PLANNER} from "./test-data";

const Container = styled.div`
  display: flex;
`;

const Menu = styled.div`
  width: 200px;
  flex: 0 0 auto;
  border-right: 1px solid var(--sn-stylekit-border-color);
`;

const Content = styled.div`
  flex: 1 1 auto;
`;

const MenuItem = styled.div`
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`;

const EXAMPLES = [
  {title: 'Weekly Planner', data: WEEKLY_PLANNER},
  {title: 'Daily Planner', data: DAILY_GOALS},
  {title: 'Shopping List', data: SHOPPING_LIST},
  {title: 'Recipes', data: RECIPES}
]

const DemoApp = () => {
  const [selected, setSelected] = useState(0);

  const renderMenuItem = (_, i) => {
    const styles = selected === i ? {'background-color': 'var(--sn-stylekit-secondary-background-color)'} : {};
    return <MenuItem style={styles} onClick={() => setSelected(i)}>{EXAMPLES[i].title}</MenuItem>;
  };

  const save = () => {
  };
  return (
    <DialogProvider>
      <PopoverProvider>
        <Container>
          <Menu>
            {
              EXAMPLES.map(renderMenuItem)
            }
          </Menu>
          <Content>
            <EditorProvider text={EXAMPLES[selected].data} save={save}/>
          </Content>
        </Container>
      </PopoverProvider>
    </DialogProvider>
  );
}

export default DemoApp
