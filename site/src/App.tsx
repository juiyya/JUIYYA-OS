import { useEffect } from 'react';
import { WindowManagerProvider, useWindowManager } from './state/WindowManager'; // Atenção ao 'w' minúsculo
import { Taskbar } from './components/os/Taskbar';

// Importação das Aplicações
import { Browser } from './components/windows/Browser'; // <--- O navegador com Iframe
import { OSExplorer } from './components/windows/OSExplorer'; // <--- O novo explorador de ficheiros
import { WelcomeTxt } from './components/windows/WelcomeTxt';
import { ToDoListTxt } from './components/windows/ToDoListTxt';
import { Terminal } from './components/windows/Terminal';
import { Lixeira } from './components/windows/Lixeira';
import { ImageViewer } from './components/windows/ImageViewer';
import { Folder } from './components/windows/Folder';
import { Chat } from './components/windows/Chat';
// import { CDPlayer } from './components/windows/CDPlayer';
// import { Calendar } from './components/windows/Calendar';
// import { CalculatorWindow } from './components/windows/CalculatorWindow';
// import { LivroWindow } from './components/windows/LivroWindow';

function Desktop() {
  const { openWindow } = useWindowManager();

  useEffect(() => {
    // openWindow('cdplayer', 'CD Player', '/icons/music.png'); 
    openWindow('tarefas', 'Tarefas.txt', '/icons/file.png');
    openWindow('explorer', 'C:\\Juiyya\\Root', '/icons/directory_open.png'); 
    openWindow('welcome', 'Welcome.txt', '/icons/file.png');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Esquerda
  const desktopShortcuts = [
    { name: 'Projetos', icon: '/icons/directory_closed-4.png', action: () => openWindow('folder', 'Projetos', '/icons/directory_closed-4.png') },
    { name: 'Certificados', icon: '/icons/directory_closed-4.png', action: () => openWindow('explorer', 'C:\\Juiyya\\Root', '/icons/directory_open.png') },
    { name: 'Instant Message', icon: '/icons/msn.png', action: () => openWindow('chat', 'Juiyya - Instant Message', '/icons/msn.png') },
    { name: 'BOOO!', icon: '/gifs/cat.gif', action: () => openWindow('imageviewer', 'dança gatinho dança', '/icons/file.png', '/gifs/cat.gif') },
    { name: 'Tarefas.txt', icon: '/icons/file.png', action: () => openWindow('tarefas', 'Tarefas.txt', '/icons/file.png') }
  ];

  // Direita
  const rightDesktopShortcuts = [ 
    { name: 'Video.mp4', icon: '/icons/video.png', action: () => openWindow('browser', 'Video.mp4', '/icons/video.png', 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1') },
    { name: 'Juiyya OS', icon: '/icons/computer.png', action: () => openWindow('explorer', 'C:\\Juiyya\\Root', '/icons/directory_open.png') },
    // { name: 'Em Produção', icon: '/icons/producao.png', action: () => openWindow('producao', 'Em Produção', '/icons/producao.png') },
    // { name: 'Calculadora', icon: '/icons/calculator.png', action: () => openWindow('calculator', 'Calculadora', '/icons/calculator.png') },
    { name: 'Lixeira', icon: '/icons/lixeira.png', action: () => openWindow('lixeira', 'Lixeira', '/icons/lixeira.png') },
    // { name: 'Gabi.exe', icon: '/book/book.png', action: () => openWindow('livro', 'Gabi.exe', '/book/book.png') }
  ];

  return (
    <div className="desktop">
      
      {/* esquerdo: icone */}
      <div className="desktop-icons">
        {desktopShortcuts.map((shortcut, index) => (
          <button key={index} className="desktop-icon" onDoubleClick={shortcut.action}>
            <img src={shortcut.icon} alt="" />
            <span>{shortcut.name}</span>
          </button>
        ))}
      </div>

      {/* direito: icone */}
      <div className="desktop-icons right-side">
        {rightDesktopShortcuts.map((shortcut, index) => (
          <button key={index} className="desktop-icon" onDoubleClick={shortcut.action}>
            <img src={shortcut.icon} alt="" />
            <span>{shortcut.name}</span>
          </button>
        ))}
      </div>

      <WelcomeTxt />
      <Browser />
      <OSExplorer /> 
      <ToDoListTxt />
      <Terminal />
      <Lixeira />
      <ImageViewer />
      <Folder />
      <Chat />
      <Taskbar />
    </div>
  );
}

export default function App() {
  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  );
}