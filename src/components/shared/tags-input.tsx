"use client";
import { useRef } from "react";
import { X } from "lucide-react";

export interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function TagsInput({
  value,
  onChange,
  placeholder,
  disabled,
  className,
}: TagsInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === " " || e.key === "," || e.key === "Enter") &&
      inputRef.current
    ) {
      e.preventDefault();
      const tag = inputRef.current.value.trim();
      if (tag && !value.includes(tag)) {
        onChange([...value, tag]);
        inputRef.current.value = "";
      }
    } else if (
      e.key === "Backspace" &&
      inputRef.current &&
      !inputRef.current.value &&
      value.length > 0
    ) {
      onChange(value.slice(0, -1));
    }
  };

  const handleRemove = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div
      className={`flex flex-wrap gap-2 items-center border border-gray-300 rounded-lg px-2 py-1 bg-white focus-within:ring-2 focus-within:ring-black/5 focus-within:border-black transition-all ${
        className || ""
      }`.trim()}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 bg-gray-100 rounded px-2 py-0.5 text-sm"
        >
          {tag}
          <button
            type="button"
            className="ml-1 text-gray-400 hover:text-red-500 focus:outline-none"
            onClick={() => handleRemove(tag)}
            tabIndex={-1}
            disabled={disabled}
          >
            <X size={14} />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        className="flex-1 min-w-[120px] border-none outline-none bg-transparent py-1 px-2 text-sm"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        tabIndex={0}
      />
    </div>
  );
}
