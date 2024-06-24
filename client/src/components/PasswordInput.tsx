import { Input } from "@nextui-org/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
  label: string;
  name: string;
  isRequired: boolean;
}

export const PasswordInput = (props: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Input
      label={props.label}
      name={props.name}
      type={isVisible ? "text" : "password"}
      isRequired={props.isRequired}
      endContent={
        <button
          onClick={toggleVisibility}
          className="text-gray-500 focus:outline-none"
          type="button"
        >
          {isVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      }
    />
  );
};
