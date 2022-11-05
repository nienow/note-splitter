import React, {useState} from 'react';
import styled from "styled-components";
import {IGridSectionData} from "./grid-definitions";

const SectionTitle = styled.input`
  border: none;
  background-color: var(--sn-stylekit-secondary-background-color);
  outline: none;
  color: var(--sn-stylekit-foreground-color);
  line-height: 1.4;
  padding: 10px;
`;

const SectionTextArea = styled.textarea`
  flex: 1 1 auto;
  background-color: inherit;
  border: none;
  outline: none;
  padding: 10px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  line-height: 1.4;
  resize: none;
  color: var(--sn-stylekit-foreground-color);
`;

interface Params {
  showTitle?: boolean;
  section: IGridSectionData;
  saveNote: () => void;
}

const GridSection = (params: Params) => {
  const [text, setText] = useState(params.section.text || '');
  const [title, setTitle] = useState(params.section.title || '');

  const onTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    params.section.title = value;
    params.saveNote();
  };

  const onTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    params.section.text = value;
    params.saveNote();
  };

  return (
    <>
      {
        params.showTitle ? <SectionTitle type="text" name="title" value={title} onChange={onTitleChange}/> : <div></div>
      }
      <SectionTextArea tabIndex={1} name="value" value={text} onChange={onTextChange}/>
    </>
  );
};

export default GridSection
