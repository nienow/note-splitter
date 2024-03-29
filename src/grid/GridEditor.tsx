import React from 'react';
import GridSection from "./GridSection";
import styled from "styled-components";
import {useEditor} from "../providers/EditorProvider";
import SectionHeader from "../section/SectionHeader";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const EditorContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`

const EditorRow = styled.div`
  border-bottom: 1px solid var(--sn-stylekit-border-color);
  display: flex;
  flex: 1 0 auto;
`

const EditorSection = styled.div`
  border-right: 1px solid var(--sn-stylekit-border-color);
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`

const GridEditor = () => {
  const {data, saveNote} = useEditor();

  const rows = Math.ceil(data.sections.length / data.columns);

  return (
    <EditorContainer>
      <SectionHeader/>
      <EditorContent>
        {
          [...Array(rows)].map((_, i) => {
            return <EditorRow key={i}>
              {
                [...Array(data.columns)].map((_, j) => {
                  const index = i * data.columns + j;
                  const section = data.sections[index];
                  return <EditorSection key={Math.random()}>
                    {
                      <GridSection section={section} saveNote={saveNote} showTitle={data.title}></GridSection>
                    }
                  </EditorSection>;
                })
              }
            </EditorRow>;
          })
        }
      </EditorContent>
    </EditorContainer>
  );
}

export default GridEditor
