import React from 'react';
import styled from "styled-components";
import AutoSizeTextArea from "./AutoSizeTextArea";
import SectionHeader from "./SectionHeader";
import {BigActionButton} from "../components/ActionButton";
import {useEditor} from "../providers/EditorProvider";
import SectionTitle from "./SectionTitle";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const SectionContainer = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
  border-right: 1px solid var(--sn-stylekit-border-color);
  border-collapse: collapse;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SectionEditor = () => {
  const {data, saveNote, saveNoteAndRefresh} = useEditor();

  const onTextChange = (e, index) => {
    data.sections[index].text = e.target.value;
    saveNote();
  };

  const addRow = () => {
    for (let i = 0; i < data.columns; i++) {
      const newTab = {text: ''};
      data.sections.push(newTab);
    }
    saveNoteAndRefresh();
  };

  const removeSection = (index) => {
    data.sections.splice(index, 1);
    saveNoteAndRefresh();
  };

  const onTitleChange = (e, index) => {
    data.sections[index].title = e.target.value;
    saveNote();
  };

  const sectionWidth = (100 / data.columns) + '%';

  return (
    <EditorContainer>
      <SectionHeader/>
      <ContentContainer>
        {
          data.sections.map((section, index) => (
            <SectionContainer key={Math.random()} style={{'width': sectionWidth}}>
              {
                data.title ?
                  <SectionTitle section={section} onChange={(e) => onTitleChange(e, index)}/>
                  : <div></div>
              }
              <AutoSizeTextArea section={section} onChange={(e) => onTextChange(e, index)}
                                remove={() => removeSection(index)}></AutoSizeTextArea>
            </SectionContainer>
          ))
        }
      </ContentContainer>
      <BigActionButton onClick={addRow}>Add Row +</BigActionButton>
    </EditorContainer>
  );
}

export default SectionEditor
