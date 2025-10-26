import classNames from "classnames";
import React, { useState } from "react";
import { Input } from "./Input";

type Country = {
  name: string;
  code: string;
  cc: string;
};

const countries: Country[] = [
  { name: "Indonesia", code: "+62", cc: "ID" },
  { name: "Palestine", code: "+970", cc: "PS" },
  { name: "Papua New Guinea", code: "+675", cc: "PG" },
  { name: "Portugal", code: "+351", cc: "PT" },
  { name: "Qatar", code: "+974", cc: "QA" },
  { name: "Romania", code: "+40", cc: "RO" },
  { name: "Russia", code: "+7", cc: "RU" },
  { name: "Rwanda", code: "+250", cc: "RW" },
];


interface PhoneInputProps {
  label?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = (props: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const className = classNames({
    'border-red-500 hover:border-red-600 focus:border-red-500': props.error,
    'bg-neutral-30 cursor-not-allowed': props.disabled,
  },
    `w-full flex items-center text-m cursor-pointer border-2 bg-white border-neutral-40 rounded-md outline-none hover:border-primary-focus focus:border-primary transition-colors duration-200`
  )

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full">
      {props.label && <label className="block mb-2 text-s font-normal">{props.label} {props.required ? <span className="text-red-500">*</span> : null} </label>}

      <div className={className}>
        <button
          type="button"
          onClick={() => setShowDropdown((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 border-r border-neutral-40"
        >
          <img src={`https://flagcdn.com/w20/${selectedCountry.cc.toLowerCase()}.png`} className="size-4 border border-neutral-40 rounded-full object-cover" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transform transition-transform ${showDropdown ? "rotate-180" : ""
              }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <span className="px-2 text-gray-600">{selectedCountry.code}</span>
        <input
          type="tel"
          placeholder="81XXXXXXXXX"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="flex-1 px-2 py-2 outline-none text-gray-800"
        />
      </div>

      {showDropdown && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-neutral-40 max-w-sm rounded-lg shadow-sm">
          <div className="p-4 border-b border-neutral-40 flex items-center gap-2">
            <Input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" prefixicon="uil:search" />
          </div>

          <div className="max-h-56 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.name}
                onClick={() => handleSelectCountry(country)}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 text-left"
              >
                <div className="flex items-center gap-2">
                  <img src={`https://flagcdn.com/w20/${country.cc.toLowerCase()}.png`} className="size-4 border border-neutral-40 rounded-full object-cover" />
                  <span className="text-s font-bold">{country.name}</span>
                </div>
                <span className="text-neutral-500 text-s">{country.code}</span>
              </button>
            ))}

            {filteredCountries.length === 0 && (
              <div className="p-3 text-center text-sm text-gray-500">No results</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
