import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div onMouseDown={(e) => e.target === e.currentTarget && onClose()} 
        className="fixed inset-0 z-100 flex items-center justify-center p-4
                bg-black/40 backdrop-blur-[2px]" >
      <div role="dialog" aria-modal="true" aria-label={title} 
          className="w-full max-w-120 max-h-[88vh] overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5">
          <h2 className="text-[17px] font-bold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close dialog"
            className="flex items-center justify-center w-7.5 h-7.5 rounded bg-gray-100
                  text-gray-600 hover:bg-gray-200 transition-colors" >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
