interface ILabelProps{
    children: string;
    className?: string;
    htmlFor?: string;
}

const Label = (props: ILabelProps) => (
    <label
        className={`${props.className} block font-medium text-sm text-gray-700`}
        htmlFor={props.htmlFor}>
        {props.children}
    </label>
)

export default Label
