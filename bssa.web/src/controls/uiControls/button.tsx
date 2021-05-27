import React from 'react';

export const ControlStyle = {
  Primary: 'primary',
  Secondary: 'secondary',
  Success: 'success',
  Danger: 'danger',
  Warning: 'warning',
  Info: 'info',
  Light: 'light',
  Dark: 'dark'
};

export const ButtonType = {
  submit: 'submit',
  button: 'button',
  reset: 'reset'
};

export const ControlSize = {
  Small: 'sm',
  Medium: '',
  Large: 'lg'
};

export interface ButtonProps {
  value: string;
  onClick:
  | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
  | undefined;
  style: string;
  type: any;
  size: string;
  margin: number;
  children: React.ReactNode;
  classNames: string;
}

function BaseButton(props: ButtonProps) {
  function getClassNames() {
    const style = 'btn-' + props.style || ControlStyle.Primary;
    const size = props.size ? 'btn-' + props.size : '';
    const margin = props.margin || 1;
    const m = `mr-${margin} mb-${margin}`;
    return `btn ${style} ${size} ${m} ${props.classNames}`;
  }

  return (
    <button
      onClick={props.onClick}
      className={getClassNames()}
      type={props.type || ButtonType.button}
    >
      {props.value} {props.children}
    </button>
  );
}

export const Button = props => (
  <BaseButton {...props} style={ControlStyle.Primary} />
);
export const ButtonWarning = props => (
  <BaseButton {...props} style={ControlStyle.Warning} />
);
export const ButtonDanger = props => (
  <BaseButton {...props} style={ControlStyle.Danger} />
);
export const ButtonSuccess = props => (
  <BaseButton {...props} style={ControlStyle.Success} />
);

export const ButtonDelete = props => (
  <BaseButton {...props} style={ControlStyle.Danger} value="">
    <img
      src="/icons/icons8-delete-bin-red-32.png"
      alt="Delete"
      width="20"
      sizes={ControlSize.Small}
    />
  </BaseButton>
);

export const ButtonEdit = props => (
  <BaseButton
    {...props}
    style={ControlStyle.Primary}
    value=""
    classNames="btn-edit"
  >
    <img
      src="/icons/icons8-edit-32.png"
      alt="Edit"
      width="20"
      sizes={ControlSize.Small}
    />
  </BaseButton >
);
