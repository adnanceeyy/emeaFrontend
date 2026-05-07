'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);

  const showNotification = (message: string, type: NotificationType = 'info') => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white max-w-sm w-full p-8 shadow-2xl border-2 border-gray-100 animate-in zoom-in-95 duration-300 relative">
            <button 
              onClick={closeNotification}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-6">
              <div className="flex justify-center">
                {notification.type === 'success' && (
                  <div className="w-16 h-16 bg-[#55CF9A]/10 text-[#55CF9A] rounded-full flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                )}
                {notification.type === 'error' && (
                  <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                    <AlertCircle size={32} />
                  </div>
                )}
                {notification.type === 'warning' && (
                  <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center">
                    <AlertTriangle size={32} />
                  </div>
                )}
                {notification.type === 'info' && (
                  <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                    <Info size={32} />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                  {notification.type}
                </h3>
                <p className="text-gray-900 font-bold text-lg leading-tight uppercase tracking-tighter">
                  {notification.message}
                </p>
              </div>

              <button 
                onClick={closeNotification}
                className={`w-full py-4 font-black text-xs uppercase tracking-widest transition-all ${
                  notification.type === 'success' ? 'bg-[#55CF9A] text-white hover:opacity-90' :
                  notification.type === 'error' ? 'bg-red-500 text-white hover:bg-red-600' :
                  'bg-gray-900 text-white hover:bg-black'
                }`}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};
