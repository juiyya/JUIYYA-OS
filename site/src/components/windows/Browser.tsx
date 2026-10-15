import { BaseWindow } from '../os/BaseWindow';
import { useWindowManager } from '../../state/WindowManager';

export function Browser() {
  const { windows, focusWindow, closeWindow, toggleMinimize } = useWindowManager();
  const id = 'browser';
  const win = windows.find((w: any) => w.id === id);

  if (!win?.isOpen) return null;
  const url = win.url || 'about:blank';

  return (
    <BaseWindow 
      title="Net Scape" 
      icon="/icons/msi.png" 
      customClass="browser-window" 
      zIndex={win.zIndex} 
      isMinimized={win.minimized} 
      onFocus={() => focusWindow(id)} 
      onMinimize={() => toggleMinimize(id)} 
      onClose={() => closeWindow(id)} 
      startX={150} 
      startY={50}
      width={800} height={600}
    >
      <div className="address-bar" style={{ padding: '4px', background: '#C0C0C0', borderBottom: '1px solid #888' }}>
        <span>Address: </span>
        <input type="text" value={url} readOnly style={{ width: '80%' }} />
      </div>
      <div className="window-content" style={{ flex: 1, display: 'flex' }}>
        <iframe src={url} title="Navegador Interno" style={{ flex: 1, border: 'none', background: '#fff' }}></iframe>
      </div>
    </BaseWindow>
  );
}