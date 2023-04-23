import { Switch as RASwitch } from 'react-aria-components';

interface Props {
  children?: React.ReactNode;
  isSelected: boolean;
  handleChange: (isSelected: boolean) => void;
}

export default function Switch({ children, isSelected, handleChange }: Props) {
  return (
    <RASwitch className="inline-flex gap-2 group" isSelected={isSelected} onChange={isSelected => handleChange(isSelected)}>
      {children}
      <div className="bg-zinc-600 w-9 h-6 rounded-full border-2 border-transparent group-data-[selected]:bg-green-600 transition duration-200 group-data-[focus-visible]:ring ring-offset-2">
        <div className="w-5 h-5 bg-white rounded-full shadow group-data-[selected]:ml-3 group-data-[pressed]:w-6 group-data-[selected]:group-data-[pressed]:ml-2 transition-all duration-200"></div>
      </div>
    </RASwitch>
  );
}

