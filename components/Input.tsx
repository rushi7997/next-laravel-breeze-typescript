import React from "react";

interface IInputProps {
    id: string;
    type: string;
    value: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    name?: string;
}

const Input = (props: IInputProps) => (
    <input
        className={`${props.className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
    />
)

export default Input
