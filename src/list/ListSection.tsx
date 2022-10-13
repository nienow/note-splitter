import React from 'react';
import {ItemData} from "./list-definitions";
import ListField from "./ListField";
import styled from "styled-components";
import DeleteIcon from "../components/icons/DeleteIcon";

interface Params {
  item: ItemData;
  fields: string[];
  onChange: (fieldName: string, value: any) => void;
  onDelete: () => void;
}

const DeleteButton = styled.button`
  padding: 5px;
`;

const ListSection = (params: Params) => {
  return (
    <>
      {
        params.fields.map(field =>
          <ListField key={field} fieldName={field} item={params.item} onChange={(value) => params.onChange(field, value)}/>
        )
      }
      <DeleteButton onClick={params.onDelete}><DeleteIcon></DeleteIcon></DeleteButton>
    </>
  );
};

export default ListSection
