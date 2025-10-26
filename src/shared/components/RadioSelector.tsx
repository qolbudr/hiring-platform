import React, { useState } from "react"

export interface RadioOption {
  label: string
  value: string
}

interface RadioSelectorProps {
  label?: string
  required?: boolean
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  name?: string
}

export const RadioSelector: React.FC<RadioSelectorProps> = ({
  label,
  required,
  options,
  value,
  onChange,
  name,
}) => {
  const [selected, setSelected] = useState(value || "")

  const handleSelect = (val: string) => {
    setSelected(val)
    onChange?.(val)
  }

  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="block mb-2 text-s font-normal">{label} {required ? <span className="text-red-500">*</span> : null} </label>}


      <div className="flex flex-wrap gap-6">
        {options.map((option) => (
          <label
            key={option.value}
            className="inline-flex items-center cursor-pointer space-x-2"
          >
            <span
              className={`relative flex items-center justify-center w-5 h-5 border-2 rounded-full transition-all duration-200 border-neutral-90`}
              onClick={() => handleSelect(option.value)}
            >
              {selected === option.value && (
                <span className="w-3 h-3 rounded-full bg-teal-700" />
              )}
            </span>
            <span onClick={() => handleSelect(option.value)} className="text-m">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
