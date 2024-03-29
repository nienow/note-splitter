import React, {useState} from 'react';
import styled from "styled-components";
import {ISection} from "../definitions";
import {useEditor} from "../providers/EditorProvider";

interface Params {
  section: ISection;
  onChange: (e) => void;
}

const TitleInput = styled.input`
  border: none;
  background-color: var(--sn-stylekit-secondary-background-color);
  outline: none;
  color: var(--sn-stylekit-foreground-color);
  line-height: 1.4;
  padding: 5px 10px;
  width: 100%;
  box-sizing: border-box;
`;

const SectionTitle = ({section, onChange}: Params) => {
  const {isLocked} = useEditor();
  const [title, setTitle] = useState(section.title);

  const onLocalChange = (e) => {
    setTitle(e.target.value);
    onChange(e);
  };

  return (
    <TitleInput disabled={isLocked} type="text" name="title" value={title} onChange={onLocalChange}/>
  );
}

export default SectionTitle
