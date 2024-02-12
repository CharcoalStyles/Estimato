import { Text } from "@/components/ui";
import { InputHTMLAttributes, useState } from "react";

export type InputProps = {
  label?: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  value: string;
  onChange?: (e: string) => void;
  disabled?: boolean;
};

export const Input = ({
  label,
  disabled,
  value,
  onChange,
  placeholder,
}: InputProps) => {
  const [inputValue, setInputValue] = useState(value);

  return (
    <label>
      {label && <Text>{label}</Text>}
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        type="text"
        name="name"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange && onChange(e.target.value);
        }}
      />
    </label>
  );
};
