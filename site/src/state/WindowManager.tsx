import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { JanelaAberta } from '../types';

const WindowManagerContext = createContext<any>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<JanelaAberta[]>([]);
  const [activeZ, setActiveZ] = useState(1);

  const openWindow = (id: string, title: string, icon?: string, url?: string) => {
    setActiveZ(z => z + 1);
    setWindows(prev => {
      const exists = prev.find(w => w.id === id);
      if (exists) return prev.map(w => w.id === id ? { ...w, isOpen: true, zIndex: activeZ + 1 } : w);
      return [...prev, { id, title, icon, url, isOpen: true, zIndex: activeZ + 1, focused: true, minimized: false }];
    });
  };

  const closeWindow = (id: string) => setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  
  const focusWindow = (id: string) => {
    setActiveZ(z => z + 1);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: activeZ + 1, focused: true, minimized: false } : { ...w, focused: false }));
  };

  const toggleMinimize = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: !w.minimized } : w));
  };

  return (
    <WindowManagerContext.Provider value={{ windows, openWindow, closeWindow, focusWindow, toggleMinimize }}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export const useWindowManager = () => useContext(WindowManagerContext);