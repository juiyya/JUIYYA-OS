import { BaseWindow } from '../os/BaseWindow';
import { useWindowManager } from '../../state/WindowManager';

export function WelcomeTxt() {
  const { windows, focusWindow, closeWindow, toggleMinimize } = useWindowManager();
  const id = 'welcome'; 
  const win = windows.find((w: any) => w.id === id);

  if (!win?.isOpen) return null;

  return (
    <BaseWindow 
      title="Welcome.txt" 
      icon="/icons/file.png" 
      customClass="welcome-window" 
      zIndex={win.zIndex} 
      isMinimized={win.minimized} 
      onFocus={() => focusWindow(id)} 
      onMinimize={() => toggleMinimize(id)} 
      onClose={() => closeWindow(id)} 
      startX={200} 
      startY={100} 
      width={700} 
      height={450}
    >
      <div className="menu-bar" style={{ padding: '2px 8px', background: '#c0c0c0', borderBottom: '1px solid #888', display: 'flex', gap: '15px' }}>
        <span>File</span> <span>Edit</span> <span>Format</span> <span>View</span> <span>Help</span>
      </div>
      <div className="window-content" style={{ flex: 1, background: '#fff', padding: '10px', overflow: 'auto', fontFamily: 'monospace' }}>
        <p>Oiiii! Bem-vindo(a) ao meu sistema.</p>
        <p>Esse é o meu portfólio! Você pode clicar nas pastas ao lado para navegar e ver os meus projetos.</p>
        <p>Ah, também tem um atalho para o "Instant Message" na pasta Apps, onde você pode conversar comigo (ou melhor, com a minha versão digital).</p>
        <p>Fique à vontade para arrastar as janelas e explorar! Qualquer coisa, use as mensagens para tirar dúvidas sobre o sistema.</p>
        <p>--</p>
        <div style={{ marginTop: '10px' }}>
          <img src="/gifs/julia2.gif" alt="icon gif" />
        </div>
      </div>
    </BaseWindow>
  );
}