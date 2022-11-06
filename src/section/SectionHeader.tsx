import React from 'react';
import styled from "styled-components";
import ToggleButton from "../components/ToggleButton";
import NumberControl from "../components/NumberControl";
import {useEditor} from "../providers/EditorProvider";
import ActionButton from "../components/ActionButton";
import {clearEmptySections, makeSectionsFillRows} from "./section-transformations";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`

const GridHeader = () => {
  const {data, saveNoteAndRefresh} = useEditor();
  const toggleTitle = () => {
    data.title = !data.title;
    saveNoteAndRefresh();
  };

  const increaseColumns = () => {
    data.columns++;
    makeSectionsFillRows(data);
    saveNoteAndRefresh();
  };

  const decreaseColumns = () => {
    if (data.columns > 1) {
      data.columns--;
    }
    makeSectionsFillRows(data);
    saveNoteAndRefresh();
  };

  const clearEmpty = () => {
    clearEmptySections(data);
    saveNoteAndRefresh();
  };

  const numColumns = data.columns || 1;

  return (
    <HeaderContainer>
      <ToggleButton label="Show Title" initialValue={data.title} onToggle={toggleTitle}/>
      <NumberControl increase={increaseColumns} decrease={decreaseColumns} display={numColumns + " Columns"}/>
      <ActionButton onClick={clearEmpty}>Clear Empty Sections</ActionButton>
    </HeaderContainer>
  );
}

export default GridHeader
