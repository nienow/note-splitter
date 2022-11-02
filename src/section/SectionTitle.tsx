import React, {useState} from 'react';
import styled from "styled-components";
import {ISectionSection} from "./section-definitions";

interface Params {
  section: ISectionSection;
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
  const [title, setTitle] = useState(section.title);

  const onLocalChange = (e) => {
    setTitle(e.target.value);
    onChange(e);
  };

  return (
    <TitleInput type="text" name="title" value={title} onChange={onLocalChange}/>
  );
}

export default SectionTitle
