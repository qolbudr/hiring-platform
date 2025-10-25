"use client";

import { Icon } from "@iconify/react";
import classNames from "classnames";
import React, { useState, useRef, useEffect } from "react";

export interface Option {
  label: string;
  value: string;
}

interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  options: Option[];
  value?: string;
  onSelectValue: (value: string) => void;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = props.options.find((opt) => opt.value === props.value);
  const className = classNames({
    'border-red-500': props.errorMessage,
    'bg-neutral-30 cursor-not-allowed': props.disabled,
  },
    `relative cursor-pointer w-full text-m border-2 bg-white border-neutral-40 rounded-md py-2 px-4 outline-none hover:border-primary-focus focus:border-primary transition-colors duration-200`
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`flex flex-col gap-1`} ref={dropdownRef}>
      {props.label && <label className="block mb-2 text-s font-normal">{props.label} {props.required ? <span className="text-red-500">*</span> : null} </label>}

      <div onClick={() => setIsOpen(!isOpen)} className={className}>
        <span className="block text-gray-800">
          {selectedOption ? (
            selectedOption.label
          ) : (
            <span className="text-gray-400">{props.placeholder ?? 'Select Option'}</span>
          )}
        </span>

        <Icon icon="uil:angle-down"
          className={`absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        />

        {isOpen && (
          <ul className="absolute left-0 z-10 mt-3 w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
            {props.options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  props.onSelectValue(opt.value);
                  setIsOpen(false);
                }}
                className={`cursor-pointer px-4 text-neutral-90 py-2 hover:bg-primary/30 ${opt.value === props.value
                  ? "bg-primary/10 font-medium text-primary"
                  : ""
                  }`}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
