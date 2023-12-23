import React from "react";


interface ButtonProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>{}

export default function Button(props: ButtonProps) {
  const {children, ...rest} = props;

  return (
    <button className="w-fit" {...rest}>
      {children}
    </button>
  );
}