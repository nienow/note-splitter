import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {ISection} from "../definitions";

interface Params {
  section: ISection;
  onChange: (e) => void;
}

const SectionTextArea = styled.textarea`
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
  overflow-y: hidden;
`;

const AutoSizeTextArea = ({section, onChange}: Params) => {
  const [text, setText] = useState(section.text);
  const ref = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = '0';
      ref.current.style.height = (ref.current.scrollHeight) + 'px';
    }
  });

  const onLocalChange = (e) => {
    setText(e.target.value);
    onChange(e);
  };

  return (
    <SectionTextArea ref={ref} value={text} onChange={onLocalChange}></SectionTextArea>
  );
}

export default AutoSizeTextArea
