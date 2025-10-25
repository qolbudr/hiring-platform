import classNames from "classnames";

interface ChipProps {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const Chip: React.FC<ChipProps> = (props: ChipProps) => {
  const className = classNames(
    'inline-block cursor-pointer py-1.5 px-3 bg-neutral-10 hover:bg-neutral-30 text-neutral-90 text-s rounded-full border border-neutral-40',
    {
      'text-primary border-primary hover:bg-primary/20': props.active === true,
      'text-neutral-60 border-neutral-40 bg-neutral-30': props.disabled === true,
    },
  )

  return <>
    <div onClick={props.disabled ? undefined : props.onClick} className={className}>
      {props.label}
    </div>
  </>
}