import React from 'react';
import './button.css';
import { clean } from '@src/shared/helpers.ts';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default function Button(props: ButtonProps) {
  const { children, className, ...rest } = props;

  return (
    <button className={clean(`_button ${className}`)} {...rest}>
      {children}
    </button>
  );
}
