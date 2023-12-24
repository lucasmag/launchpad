import React from "react";


interface ButtonProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>{}

export default function Button(props: ButtonProps) {
  const {children, ...rest} = props;

  return (
    <button className="flex items-center gap-3 justify-center w-fit" {...rest}>
      {children}
    </button>
  );
}