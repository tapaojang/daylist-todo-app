import { Feather } from 'lucide-react';
// import './EmptyState.css';

export default function EmptyState({ label = 'Nothing on the list yet.' }) {
  return (
    <div className="flex flex-col items-center justify-center text-center
                px-6 py-10 border-[1.5px] border-dashed border-gray-300 rounded-md text-gray-500">
      <div className="flex items-center justify-center w-10.5 h-11.2 rounded-full
                bg-gray-100 text-gray-500 mb-3">
        <Feather size={20} strokeWidth={2} />
      </div>
      <p className="text-[13.5px] max-w-60">{label}</p>
    </div>
  );
}
