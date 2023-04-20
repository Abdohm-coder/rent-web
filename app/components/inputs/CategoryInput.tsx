"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  label: string;
  selected?: boolean;
  icon: IconType;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  onClick,
  selected,
}) => {
  return (
    <div
      className={`rounded-xl border-2 p-4 flex flex-col hover:border-black gap-3 transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
      onClick={() => onClick(label)}>
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
