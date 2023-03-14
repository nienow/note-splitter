import React, {useState} from 'react';
import {useDialog} from "../providers/DialogProvider";
import styled from "styled-components";
import DeleteIcon from "../components/icons/DeleteIcon";
import {usePopover} from "../providers/PopoverProvider";
import ActionButton from "../components/ActionButton";
import {useEditor} from "../providers/EditorProvider";
import EditorChoice from "../components/EditorChoice";

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

const Header = styled.div`
  display: flex;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`;

const TabTitleContainer = styled.div`
  border-right: 1px solid var(--sn-stylekit-border-color);
  padding: 5px 10px;
  cursor: pointer;
  display: flex;

  &.active {
    background-color: var(--sn-stylekit-secondary-background-color);
    border-bottom: 2px solid var(--sn-stylekit-secondary-contrast-border-color);
  }
`;

const TabTitle = styled.div`
  flex: 1 1 auto;
`;

const TabTitleEditable = styled.input`
  flex: 1 1 auto;
  border: none;
  outline: none;
  color: var(--sn-stylekit-foreground-color);
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

const AddTabButton = styled.button`
  border: none;
  background-color: inherit;
  color: inherit;
  cursor: pointer;
  border-right: 1px solid var(--sn-stylekit-border-color);

  &:hover {
    background-color: var(--sn-stylekit-secondary-background-color);
  }
`;

const TabEditor = () => {
  let workingTitle = '';
  const {data, saveNoteAndRefresh} = useEditor();
  const [activeTab, setActiveTab] = useState<number>(0);
  const {popover} = usePopover();
  const {confirm} = useDialog();

  const changeTab = (index) => {
    setActiveTab(index);
  };

  const onTextChange = (e) => {
    data.sections[activeTab].text = e.target.value;
    saveNoteAndRefresh();
  };

  const addTab = () => {
    const newTab = {title: 'New'};
    data.sections.push(newTab);
    setActiveTab(data.sections.length - 1);
    saveNoteAndRefresh();
  };

  const deleteTabConfirm = (index) => {
    if (data.sections[index].text) {
      confirm('Are you sure you want to remove this tab?', () => {
        deleteTab(index)
      });
    } else {
      deleteTab(index);
    }
  };

  const deleteTab = (index) => {
    data.sections.splice(index, 1);
    setActiveTab(0);
    saveNoteAndRefresh();
  };

  const onTitleChange = () => {
    data.sections[activeTab].title = workingTitle;
    saveNoteAndRefresh();
  };

  const openPopover = (e, tab, index) => {
    workingTitle = tab.title;
    let closePopover;
    const onDeleteIconClick = () => {
      closePopover();
      deleteTabConfirm(index)
    };
    const popoverContents = <div>
      <TabTitleEditable id="working-title" defaultValue={tab.title} onChange={(e) => workingTitle = e.target.value}></TabTitleEditable>
      <ActionButton onClick={onDeleteIconClick}><DeleteIcon/></ActionButton>
    </div>;
    closePopover = popover(e.currentTarget, popoverContents, onTitleChange);
    setTimeout(() => {
      const el = document.getElementById('working-title') as HTMLInputElement;
      el.select();
    });
  };

  const renderTabTitle = (index, tab) => {
    if (index === activeTab) {
      return <TabTitleContainer key={index} className={index === activeTab ? 'active' : ''} onClick={(e) => openPopover(e, tab, index)}>
        <TabTitle>{tab.title}</TabTitle>
      </TabTitleContainer>;
    }
    return <TabTitleContainer key={index} className={index === activeTab ? 'active' : ''} onClick={() => changeTab(index)}>
      <TabTitle>{tab.title}</TabTitle>
    </TabTitleContainer>;
  };

  return (
    <EditorContainer>
      <Header>
        <EditorChoice value="randombits.tab"/>
        <Tabs>
          {
            data.sections.map((tab, index) => renderTabTitle(index, tab))
          }
          <AddTabButton onClick={addTab}>+</AddTabButton>
        </Tabs>
      </Header>
      <EditorContent>
        <SectionTextArea tabIndex={1} name="value" value={data.sections[activeTab]?.text || ''} onChange={onTextChange}/>
      </EditorContent>
    </EditorContainer>
  );
}

export default TabEditor
