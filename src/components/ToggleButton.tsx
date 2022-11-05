import React, {useState} from 'react';
import styled from "styled-components";

interface Params {
  label: string;
  initialValue: boolean;
  onToggle: (value: boolean) => void;
}

const ToggleButtonContainer = styled.div`
  cursor: pointer;
  padding: 5px;
  border: 1px solid var(--sn-stylekit-border-color);
  border-radius: 3px;
  display: flex;
  align-items: center;
`;

const ToggleButtonInput = styled.input`
  margin-right: 5px;
`;

const ToggleButton = ({label, initialValue, onToggle}: Params) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => {
    setValue(!value);
    onToggle(!value);
  };
  return <ToggleButtonContainer onClick={toggle}>
    <ToggleButtonInput type="checkbox" checked={value} readOnly={true}/>
    {label}
  </ToggleButtonContainer>;
}

export default ToggleButton
