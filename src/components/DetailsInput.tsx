import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  id: string;
  onInputChange: (value: string, id: string) => void;
}

export default function DetailsInput({
  label,
  id,
  onInputChange,
  ...rest
}: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        {...rest}
        id={id}
        name={id}
        className="rounded-md border border-input px-4 py-2"
        onChange={(e) => onInputChange!(e.target.value, id)}
      />
    </div>
  );
}
