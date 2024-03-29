import React from 'react';
import {useEditor} from "../providers/EditorProvider";
import styled from "styled-components";

const SelectBox = styled.select`
  background-color: inherit;
  color: inherit;
  outline: none;
  padding: 2px 10px;
  border: 1px solid var(--sn-stylekit-border-color);
  margin: 3px;
  border-radius: 3px;
`;

const Option = styled.option`
  background-color: var(--sn-stylekit-background-color);
  color: var(--sn-stylekit-foreground-color);
`;

interface Params {
  value: string;
}

const EditorChoice = ({value}: Params) => {
  const {isLocked, changeEditor} = useEditor();
  const onSelectEditor = (e) => {
    changeEditor(e.target.value);
  };
  return (
    <SelectBox value={value} onChange={onSelectEditor} disabled={isLocked}>
      <Option value="randombits.grid">Expand</Option>
      <Option value="randombits.section">Collapse</Option>
      {/*<option value="randombits.tab">Tab</option>*/}
      {/*<option value="randombits.sticky">Sticky</option>*/}
    </SelectBox>
  );
}

export default EditorChoice
