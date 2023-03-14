import React from 'react';
import Header from "./Header";
import styled from "styled-components";
import EditorContent from "./EditorContent";
import {IStickySection, transformFromServer, transformToServer} from "./sticky-transformations";
import {useEditor} from "../providers/EditorProvider";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const StickyEditor = () => {
  const {data: originalData, saveNote, saveNoteAndRefresh} = useEditor();

  const transformedData = transformFromServer(originalData);

  const transformAndSave = (refresh?: boolean) => {
    transformToServer(originalData, transformedData);
    if (refresh) {
      saveNoteAndRefresh();
    } else {
      saveNote();
    }
  };

  const addSection = () => {
    let largestIndex = 0;
    Object.values(transformedData.sections).forEach((section: IStickySection) => {
      largestIndex = section.index > largestIndex ? section.index : largestIndex;
    });

    const newId = new Date().getTime();
    transformedData.sections[newId] = {title: 'New', index: largestIndex + 1};
    transformAndSave(true);
  };

  const handleDelete = (sectionId) => {
    const index = transformedData.sections[sectionId].index;
    delete transformedData.sections[sectionId];
    Object.values(transformedData.sections).forEach((section: IStickySection) => {
      if (section.index > index) {
        section.index--;
      }
    });
    console.log(transformedData);
    transformAndSave(true);
  };

  return (
    <EditorContainer>
      <Header data={transformedData} addSection={addSection}></Header>
      <EditorContent saveNote={transformAndSave} data={transformedData} handleDelete={handleDelete}></EditorContent>
    </EditorContainer>
  );
}

export default StickyEditor
