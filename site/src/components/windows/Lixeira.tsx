import { BaseWindow } from '../os/BaseWindow';
import { useWindowManager } from '../../state/WindowManager';

export function Lixeira() {
  const { windows, focusWindow, closeWindow, toggleMinimize } = useWindowManager();
  const id = 'lixeira';
  const win = windows.find((w: any) => w.id === id);

  if (!win?.isOpen) return null;

  return (
    <BaseWindow 
      title="Lixeira" 
      icon="/icons/lixeira.png" 
      zIndex={win.zIndex} 
      isMinimized={win.minimized} 
      startX={300} 
      startY={150} 
      onFocus={() => focusWindow(id)} 
      onClose={() => closeWindow(id)} 
      onMinimize={() => toggleMinimize(id)}
    >
      <div className="menu-bar"><span>File</span> <span>Edit</span> <span>Format</span> <span>View</span> <span>Help</span></div>
      <div className="address-bar"><span>Address</span><div className="address-input"><span>C:\Lixeira</span></div></div>
      <div className="window-content notepad-content" style={{ padding: '10px' }}>
        <p>LIXOOO HAHA</p>
      </div>
    </BaseWindow>
  );
}