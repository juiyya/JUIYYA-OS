import { useState, useEffect } from 'react';
import { useWindowManager } from '../../state/WindowManager';

export function Taskbar() {
  const { windows, focusWindow, openWindow } = useWindowManager();
  const [hora, setHora] = useState('');
  const [menuStartAberto, setMenuStartAberto] = useState(false);

  useEffect(() => {
    const closeMenu = () => setMenuStartAberto(false);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  useEffect(() => {
    const atualizarHora = () => {
      setHora(new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit', minute: '2-digit'
      }).format(new Date()));
    };
    atualizarHora();
    const intervalo = setInterval(atualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuStartAberto(prev => !prev);
  };

  return (
    <div className="taskbar">

      <button 
        className={`start-btn ${menuStartAberto ? 'active' : ''}`} 
        onClick={toggleMenu}
      >
        <img src="/icons/minesweeper-1.png" alt="" className="pixel-icon" /> <span>Start</span>
      </button>

      <div className="quick-launch">
        <button 
          className="quick-launch-btn" 
          onClick={() => openWindow('explorer', 'C:\\Juiyya\\Root', '/icons/directory_open.png')}
        >
          <img src="/icons/directory_open.png" alt="Explorer" className="pixel-icon" />
        </button>
      </div>

      <div className="taskbar-items">
        {windows.map((w: any) => w.isOpen && (
          <button 
            key={w.id}
            className={`taskbar-btn ${w.focused && !w.minimized ? 'active' : ''}`}
            onClick={() => focusWindow(w.id)}
          >
            {w.title}
          </button>
        ))}
      </div>

      <div className="tray">
        <img src="/icons/computer_sound.png" title="Volume" alt="Volume" className="pixel-icon" />
        <span>{hora}</span>
      </div>
    </div>
  );
}