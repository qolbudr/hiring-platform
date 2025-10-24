import classNames from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    errorMessage?: string;
    disabled?: boolean;
}

export const Input: React.FC<InputProps> = (props) => {
    const className = classNames({
        'border-red-500': props.errorMessage,
        'bg-neutral-30 cursor-not-allowed': props.disabled,
    },
        `w-full text-m border-2 border-neutral-40 rounded-md py-2 px-4 outline-none hover:border-primary-focus focus:border-primary transition-colors duration-200`,
        props.className
    )

    return (
        <div className="flex flex-col items-start">
            {props.label && <label className="mb-2 text-s font-normal">{props.label}</label>}
            <input
                {...props}
                className={className}
            />
        </div>
    );
}