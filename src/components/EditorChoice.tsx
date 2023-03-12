import React from 'react';
import {useEditor} from "../providers/EditorProvider";

interface Params {
  value: string;
}

const EditorChoice = ({value}: Params) => {
  const {changeEditor} = useEditor();
  const onSelectEditor = (e) => {
    changeEditor(e.target.value);
  };
  return (
    <select value={value} onChange={onSelectEditor}>
      <option value="randombits.grid">Grid</option>
      <option value="randombits.section">Sections</option>
      <option value="randombits.tab">Tab</option>
      <option value="randombits.sticky">Sticky</option>
    </select>
  );
}

export default EditorChoice
