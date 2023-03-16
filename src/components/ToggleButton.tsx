import React, {useState} from 'react';
import styled from "styled-components";

interface Params {
  label: string;
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
`;

const ToggleButtonImg = styled.img`
  margin-right: 5px;
  align-self: end;
`;

const ToggleButton = ({label, initialValue, onToggle}: Params) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => {
    setValue(!value);
    onToggle(!value);
  };
  return <ToggleButtonContainer onClick={toggle}>
    {value ? <ToggleButtonImg width="18" src="check.svg"/> : <ToggleButtonImg width="18" src="uncheck.svg"/>}
    {label}
  </ToggleButtonContainer>;
}

export default ToggleButton
