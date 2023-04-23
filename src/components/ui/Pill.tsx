import { XMarkIcon } from '@heroicons/react/20/solid';
import { Value } from '@/components/Form';
import { OptionWithValue } from './ComboBox';

interface Props {
  item: Value;
  onRemove: (name: OptionWithValue<Value>) => void;
}

export default function Pill({ item, onRemove }: Props) {
  return (
    <p className="flex items-center gap-1 pl-4 pr-3 py-1 rounded-full bg-amber-300 text-xs font-bold">
      {item.value}
      <span>
        <button onClick={() => onRemove(item)} className="block">
          <XMarkIcon className="w-4 h-4" />
        </button>
      </span>
    </p>
  );
}

