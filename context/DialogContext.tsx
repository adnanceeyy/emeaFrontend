'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DialogContextType {
  confirm: (message: string) => Promise<boolean>;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<{ message: string; resolve: (val: boolean) => void } | null>(null);

  const confirm = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setDialog({ message, resolve });
    });
  };

  const handleAction = (value: boolean) => {
    if (dialog) {
      dialog.resolve(value);
      setDialog(null);
    }
  };

  return (
    <DialogContext.Provider value={{ confirm }}>
      {children}
      {dialog && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white max-w-sm w-full p-8 shadow-2xl border-2 border-gray-100 animate-in zoom-in-95 duration-300 relative">
            <button 
              onClick={() => handleAction(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center">
                  <AlertTriangle size={32} />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                  Confirmation Required
                </h3>
                <p className="text-gray-900 font-bold text-lg leading-tight uppercase tracking-tighter">
                  {dialog.message}
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => handleAction(false)}
                  className="flex-1 py-4 font-black text-xs uppercase tracking-widest bg-gray-100 text-gray-400 hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleAction(true)}
                  className="flex-1 py-4 font-black text-xs uppercase tracking-widest bg-gray-900 text-white hover:bg-black transition-all"
                >
                  Yes, Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    // Fallback to prevent build crashes
    return { confirm: async () => false };
  }
  return context;
};
