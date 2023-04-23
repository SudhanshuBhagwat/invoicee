import { Dialog } from '@headlessui/react'

interface Props {
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleConfirmation: () => void;
}

export default function Modal({ title, description, isOpen, setIsOpen, handleConfirmation }: Props) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="flex items-center justify-center px-8 py-6 bg-white rounded-lg max-w-md">
          <Dialog.Panel>
            <Dialog.Title className="text-xl font-bold mb-4">{title}</Dialog.Title>
            <Dialog.Description>
              {description}
            </Dialog.Description>

            <div className="space-x-4 mt-6 float-right">
              <button className="px-4 py-2 bg-red-600 text-white rounded-md" onClick={async () => {
                await handleConfirmation();
                setIsOpen(false);
              }}>Delete</button>
              <button className="px-4 py-2 bg-slate-300 text-black rounded-md" onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}
