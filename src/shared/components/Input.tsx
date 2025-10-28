import { Icon, IconifyIcon } from "@iconify/react";
import classNames from "classnames";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    disabled?: boolean;
    prefixicon?: string | IconifyIcon;
    suffixicon?: string | IconifyIcon;
    isRequired?: boolean;
    withShowHide?: boolean;
}

export const Input: React.FC<InputProps> = ({error, disabled, prefixicon, suffixicon, isRequired, withShowHide, type, ...props}) => {
    const [show, setShow] = useState(false);

    const className = classNames({
        'border-red-500 hover:border-red-600 focus:border-red-500': error,
        'bg-neutral-30 cursor-not-allowed': disabled,
        'pl-10': prefixicon,
    },
        `w-full text-m border-2 bg-white border-neutral-40 rounded-md py-2 px-4 outline-none hover:border-primary-focus focus:border-primary transition-colors duration-200`
    )

    return (
        <div className={`w-full text-start ${props.className || ''}`}>
            {props.label && <label className="block mb-2 text-s font-normal">{props.label} {isRequired ? <span className="text-red-500">*</span> : null} </label>}
            <div className="relative">
                <input
                    {...props}
                    type={withShowHide ? (show ? 'text' : 'password') : type}
                    className={className}
                />
                {suffixicon && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Icon icon={suffixicon} className="text-primary size-6" />
                    </div>
                )}
                {withShowHide && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Icon icon={show ? 'mdi:eye-off' : 'mdi:eye'} className="cursor-pointer size-6" onClick={() => setShow(!show)} />
                    </div>
                )}
                {prefixicon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Icon icon={prefixicon} className="text-primary size-4" />
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-red-500 text-s">{error}</p>}
        </div>
    );
}