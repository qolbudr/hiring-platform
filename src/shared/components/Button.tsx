import { IconifyIcon } from "@iconify/react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary';
    icon?: string | IconifyIcon;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ size = 'medium', variant = 'primary', fullWidth = false, ...props }) => {
    const className = classNames({
        'py-1 px-4 text-s font-bold': size === 'small',
        'py-1 px-4 text-m font-bold': size === 'medium',
        'py-[6px] px-6 text-l font-bold': size === 'large',
        'bg-primary text-white': variant === 'primary',
        'bg-secondary-main text-neutral-90': variant === 'secondary',
        'w-full': fullWidth,
    },
        'cursor-pointer rounded-md transition-colors duration-200',
        props.className,
    )

    return (
        <button
            {...props}
            className={className}>
            {props.children}
        </button>
    );
}