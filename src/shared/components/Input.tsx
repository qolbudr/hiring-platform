interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = (props) => {
    return (
        <div className="flex flex-col items-start">
            {props.label && <label className="mb-2 text-m font-semibold">{props.label}</label>}
            <input
                {...props}
                className="w-full text-m border-2 border-neutral-40 rounded-md py-2 px-4 outline-none focus:border-primary active:border-primary transition-colors duration-200"
            />
        </div>
    );
}