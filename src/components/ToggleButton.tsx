import React, {useState} from 'react';
import styled from "styled-components";
import {useEditor} from "../providers/EditorProvider";

interface Params {
  label: string;
  label2?: string;
  initialValue: boolean;
  onToggle: (value: boolean) => void;
}

const ToggleButtonContainer = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid var(--sn-stylekit-border-color);
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin: 0 5px;

  svg {
    margin-right: 5px;
  }

  path {
    stroke: var(--sn-stylekit-secondary-foreground-color) !important;
  }

  &.selected {
    background-color: var(--sn-stylekit-secondary-background-color);
  }
`;

const ToggleButton = ({label, label2, initialValue, onToggle}: Params) => {
  const {isLocked} = useEditor();
  const [value, setValue] = useState(initialValue);
  const toggle = () => {
    if (isLocked) return;
    setValue(!value);
    onToggle(!value);
  };
  return <ToggleButtonContainer onClick={toggle} className={value ? 'selected' : ''}>
    {value ? label2 || label : label}
  </ToggleButtonContainer>;
}

export default ToggleButton
