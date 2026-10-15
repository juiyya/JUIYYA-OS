import { Rnd } from 'react-rnd';
import { useWindowManager } from '../../state/WindowManager'; 
import { Footer } from './Footer';

interface Props {
  title: string;
  icon?: string;
  customClass?: string;
  zIndex: number;
  isMinimized: boolean;
  startX?: number;
  startY?: number;
  width?: number | string;  
  height?: number | string; 
  onFocus: () => void;
  onMinimize: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

export function BaseWindow({ 
  title, icon, customClass = '', zIndex, startX = 50, startY = 50, 
  width = 600, height = 450, 
  isMinimized, onFocus, onMinimize, onClose, children 
}: Props) {
  
  const { windows } = useWindowManager();

  return (
    <Rnd
      default={{ x: startX, y: startY, width, height }} 
      bounds="parent"
      dragHandleClassName="title-bar"
      onDragStart={onFocus}
      style={{ zIndex }}
      className={`aim-window ${customClass} ${isMinimized ? 'minimized-window' : ''}`}
    >
      <div
        onMouseDown={onFocus}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onFocus()}
        style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#c0c0c0', border: '2px outset #fff' }}
      >
        {/* Barra de Título */}
        <div className="title-bar" style={{ background: '#000080', color: '#fff', padding: '4px', display: 'flex', justifyContent: 'space-between' }}>
          <span className="title" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
            {icon && <img src={icon} alt="" className="pixel-icon" style={{ width: 16, height: 16 }} />}
            {title}
          </span>
          <div className="controls" style={{ display: 'flex', gap: '2px' }}>
            <button onClick={onMinimize} style={{ cursor: 'pointer' }}>_</button>
            <button style={{ cursor: 'pointer' }}>☐</button>
            <button onClick={onClose} style={{ cursor: 'pointer' }}>✕</button>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>

        <Footer />
      </div>
    </Rnd>
  );
}