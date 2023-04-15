import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label: string,
  id: string,
  value: string,
  onChange: (value: string, id: string) => void;
}

export default function DetailsInput({ label, id, value, onChange, ...rest }: Props) {
  return (
    <div className="grid grid-cols-2 items-center">
      <label htmlFor={id} className="">{label}:</label>
      <input required {...rest} id={id} name={id} className="ml-2 border rounded-md px-4 py-2" value={value} onChange={(e) => onChange(e.target.value, id)} />
    </div>
  )
}
