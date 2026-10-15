import { BaseWindow } from '../os/BaseWindow';
import { useWindowManager } from '../../state/WindowManager';

export function Terminal() {
  const { windows, focusWindow, closeWindow, toggleMinimize } = useWindowManager();
  const id = 'terminal';
  const win = windows.find((w: any) => w.id === id);

  if (!win?.isOpen) return null;

  return (
    <BaseWindow
      title="Terminal"
      icon="/icons/console.png"
      customClass="terminal-window"
      zIndex={win.zIndex}
      isMinimized={win.minimized}
      startX={600}
      startY={200}
      onFocus={() => focusWindow(id)}
      onClose={() => closeWindow(id)}
      onMinimize={() => toggleMinimize(id)}
    >
      <div className="terminal-content" style={{ backgroundColor: '#000', color: '#0f0', padding: '10px', height: '100%', fontFamily: 'monospace' }}>
        <p>Bem-vindo ao Terminal!</p>
        <p>comandos abaixo:</p>
        <input 
          type="text" 
          className="terminal-input" 
          placeholder="digitar..." 
          style={{ background: 'transparent', border: 'none', color: '#0f0', outline: 'none', width: '100%', fontFamily: 'monospace' }} 
        />
      </div>
    </BaseWindow>
  );
}