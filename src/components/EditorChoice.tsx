import React from 'react';
import {useEditor} from "../providers/EditorProvider";
import styled from "styled-components";

const SelectBox = styled.select`
  background-color: inherit;
  outline: none;
  padding: 2px 10px;
  border: 1px solid var(--sn-stylekit-border-color);
  margin: 3px;
  border-radius: 3px;
`;

interface Params {
  value: string;
}

const EditorChoice = ({value}: Params) => {
  const {changeEditor} = useEditor();
  const onSelectEditor = (e) => {
    changeEditor(e.target.value);
  };
  return (
    <SelectBox value={value} onChange={onSelectEditor}>
      <option value="randombits.grid">Grid</option>
      <option value="randombits.section">Sections</option>
      {/*<option value="randombits.tab">Tab</option>*/}
      {/*<option value="randombits.sticky">Sticky</option>*/}
    </SelectBox>
  );
}

export default EditorChoice
