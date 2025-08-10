import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Input } from "./ui/input";

interface IInlineEditProps {
  text: string;
  isEditing: boolean;
  onSetText: Dispatch<SetStateAction<string>>
  onSetIsEditing: Dispatch<SetStateAction<boolean>>
}

export default function InlineEdit({ isEditing, onSetIsEditing, onSetText, text }: IInlineEditProps) {
  const inpRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isEditing) inpRef.current?.focus()
  }, [isEditing])

  return <Input className="max-w-max" ref={inpRef} defaultValue={text} onBlur={({ target: { value } }) => {
    onSetText(value);
    onSetIsEditing(true);
  }} onKeyDown={({ key, target }) => {
    if (key === "Enter") {
      const value = (target as HTMLInputElement).value;
      onSetText(value)
      onSetIsEditing(true)
    }
  }} />
}