import React from 'react';
import {useDialog} from "../providers/DialogProvider";
import styled from "styled-components";
import NumberControl from "../components/NumberControl";
import ToggleButton from "../components/ToggleButton";
import EditorChoice from "../components/EditorChoice";
import {IData} from "../definitions";
import {makeSectionsFillRows} from "../transformations";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`

interface Params {
  data: IData;
  saveNote: () => void;
}

const GridHeader = ({data, saveNote}: Params) => {
  const {confirm, alert} = useDialog();

  const increaseColumns = () => {
    data.columns++;
    makeSectionsFillRows(data);
    saveNote();
  };

  const decreaseColumns = () => {
    if (data.columns > 1) {
      data.columns--;
    }
    makeSectionsFillRows(data);
    saveNote();
  };

  const addRow = () => {
    for (let i = 0; i < data.columns; i++) {
      data.sections.push({});
    }
    saveNote();
  };

  const checkLastRow = () => {
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
    saveNote();
  };

  const toggleTitle = () => {
    data.title = !data.title;
    saveNote();
  };

  const rows = Math.ceil(data.sections.length / data.columns);
  return (
    <HeaderContainer>
      <EditorChoice value="randombits.grid"/>
      <NumberControl increase={increaseColumns} decrease={decreaseColumns} display={data.columns + ' column(s)'}></NumberControl>
      <NumberControl increase={addRow} decrease={checkLastRow} display={rows + ' row(s)'}></NumberControl>
      <ToggleButton label="Show Title" initialValue={data.title} onToggle={toggleTitle}/>
    </HeaderContainer>
  );
}

export default GridHeader
