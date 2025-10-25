import { Icon, IconifyIcon } from "@iconify/react";
import classNames from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    disabled?: boolean;
    suffixicon?: string | IconifyIcon;
}

export const Input: React.FC<InputProps> = (props) => {
    const className = classNames({
        'border-red-500 hover:border-red-600 focus:border-red-500': props.error,
        'bg-neutral-30 cursor-not-allowed': props.disabled,
    },
        `w-full text-m border-2 bg-white border-neutral-40 rounded-md py-2 px-4 outline-none hover:border-primary-focus focus:border-primary transition-colors duration-200`
    )

    return (
        <div className={`w-full text-start ${props.className || ''}`}>
            {props.label && <label className="block mb-2 text-s font-normal">{props.label} {props.required ? <span className="text-red-500">*</span> : null} </label>}
            <div className="relative">
                <input
                    {...props}
                    className={className}
                />
                {props.suffixicon && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Icon icon={props.suffixicon} className="text-primary size-6" />
                    </div>
                )}
            </div>
            {props.error && <p className="mt-1 text-red-500 text-s">{props.error}</p>}
        </div>
    );
}