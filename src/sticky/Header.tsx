import React from 'react';
import styled from "styled-components";
import PlusIcon from "../components/icons/PlusIcon";
import EditorChoice from "../components/EditorChoice";
import {IData} from "../definitions";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`

const HeaderButton = styled.button`
  color: var(--sn-stylekit-secondary-foreground-color);
  background-color: var(--sn-stylekit-secondary-background-color);
  border: none;
  outline: none;
  padding: 5px 10px;
  cursor: pointer;
  border-right: 1px solid var(--sn-stylekit-border-color);
`

interface Params {
  data: IData;
  addSection: () => void;
}

const Header = (params: Params) => {


  return (
    <HeaderContainer>
      <EditorChoice value="randombits.sticky"/>
      <HeaderButton onClick={params.addSection}><PlusIcon/> Add Note</HeaderButton>
    </HeaderContainer>
  );
}

export default Header
