import React from "react";

interface IButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button = (props:IButtonProps) => (
    <button
        type={props.type}
        className={`${props.className} inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
    >
        {props.children}
    </button>
)

export default Button
