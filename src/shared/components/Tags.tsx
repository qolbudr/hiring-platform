import { Icon, IconifyIcon } from "@iconify/react";
import classNames from "classnames";

interface TagsProps {
  text: string;
  type?: "success" | "warning" | "error";
  variant?: "outline" | "filled";
  icon?: string | IconifyIcon;
}

export const Tags: React.FC<TagsProps> = ({ variant = "filled", type = "success", ...props }) => {

  const className = classNames({
    "text-white": variant === "filled",
    "text-success-main": variant === "outline" && type === "success",
    "text-danger-main": variant === "outline" && type === "error",
    "text-secondary-main": variant === "outline" && type === "warning",
    "bg-success-main": type === "success" && variant === "filled",
    "bg-danger-main": type === "error" && variant === "filled",
    "bg-secondary-main": type === "warning" && variant === "filled",
    "border border-success-main": variant === "outline" && type === "success",
    "border border-danger-main": variant === "outline" && type === "error",
    "border border-secondary-main": variant === "outline" && type === "warning",
  },
    `inline-flex items-center py-1 px-2 rounded-md text-s font-bold`,
  )
  return (
    <div className={className}>
      {props.icon && <Icon icon={props.icon} className="mr-1 size-3" />}
      {props.text}
    </div>
  );
}