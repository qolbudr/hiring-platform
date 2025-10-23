interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button
            {...props}
            className="w-full bg-primary cursor-pointer px-4 py-2 text-l font-bold text-white rounded-md hover:bg-primary-dark transition-colors duration-200">
            {props.children}
        </button>
    );
}