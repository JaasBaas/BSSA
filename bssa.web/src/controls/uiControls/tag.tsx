import React, { Children } from 'react';
// import * as Button from './button';

interface TagProps {
  value: string;
  onDeleteClick:
  | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
  | undefined;
  style: string;
  type: any;
  size: string;
  margin: number;
  children: React.ReactNode;
  key: string;
  deleteButtonVisible: boolean;
  checkBoxVisible: boolean;
  onCheckBoxChange:
  | ((event: React.ChangeEvent<HTMLInputElement>) => void)
  | undefined;
}

function BaseTag(props: TagProps) {
  function renderDeleteButton() {
    if (props.deleteButtonVisible)
      return (
        <button
          onClick={props.onDeleteClick}
          className="bsBadgeButtonDelete btn"
        >
          <img
            src="/icons/icons8-delete-bin-red-32.png"
            alt="Delete"
            width="20"
          />
        </button>
      );
  }
  function renderCheckBox() {
    if (props.checkBoxVisible)
      return (
        <input
          type="checkbox"
          className="bsBadgeCheckbox"
          onChange={props.onCheckBoxChange}
        />
      );
  }

  return (
    <span key={props.key} className="bsBadge">
      {renderCheckBox()}
      {props.value}
      {renderDeleteButton()}
    </span>
  );
}

export const Tag = props => {
  return <BaseTag {...props}></BaseTag>;
};

export const TagDelete = props => {
  return (
    <BaseTag {...props} deleteButtonVisible={true}></BaseTag>
  );
};
