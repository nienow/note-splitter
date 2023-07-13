import React from 'react';
import styled from "styled-components";
import ToggleButton from "../components/ToggleButton";
import NumberControl from "../components/NumberControl";
import {useEditor} from "../providers/EditorProvider";
import {makeSectionsFillRows} from "../transformations";
import {useDialog} from "../providers/DialogProvider";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`

const GridHeader = () => {
  const {confirm, alert} = useDialog();
  const {isLocked, data, saveNoteAndRefresh, changeEditor} = useEditor();
  const toggleTitle = () => {
    if (isLocked) return;
    data.title = !data.title;
    saveNoteAndRefresh();
  };

  const toggleEditor = () => {
    if (data.editor === 'randombits.grid') {
      changeEditor('randombits.section');
    } else {
      changeEditor('randombits.grid');
    }
  };

  const increaseColumns = () => {
    if (isLocked) return;
    data.columns++;
    makeSectionsFillRows(data);
    saveNoteAndRefresh();
  };

  const decreaseColumns = () => {
    if (isLocked) return;
    if (data.columns > 1) {
      data.columns--;
    }
    makeSectionsFillRows(data);
    saveNoteAndRefresh();
  };

  const addRow = () => {
    if (isLocked) return;
    for (let i = 0; i < data.columns; i++) {
      data.sections.push({});
    }
    saveNoteAndRefresh();
  };

  const checkLastRow = () => {
    if (isLocked) return;
    if (data.sections.length > data.columns) {
      const startChecking = data.sections.length - data.columns;
      const hasContent = !!data.sections.find((section, i) => i >= startChecking && !!section.text);
      if (hasContent) {
        confirm('Removing a row will delete content? Are you sure?', () => {
          removeRow();
        })
      } else {
        removeRow();
      }
    } else {
      alert('Cannot delete the only row');
    }
  };

  const removeRow = () => {
    const startRemoving = data.sections.length - data.columns;
    data.sections = data.sections.slice(0, startRemoving);
    saveNoteAndRefresh();
  };

  const numColumns = data.columns || 1;
  const rows = Math.ceil(data.sections.length / data.columns);

  return (
    <HeaderContainer>
      <NumberControl increase={increaseColumns} decrease={decreaseColumns} display={numColumns + " column(s)"}/>
      <NumberControl increase={addRow} decrease={checkLastRow} display={rows + ' row(s)'}></NumberControl>
      <ToggleButton label="Expand" label2="Collapse" initialValue={data.editor === 'randombits.grid'} onToggle={toggleEditor}/>
      <ToggleButton label="Show Title" label2="Hide Title" initialValue={data.title} onToggle={toggleTitle}/>
    </HeaderContainer>
  );
}

export default GridHeader
