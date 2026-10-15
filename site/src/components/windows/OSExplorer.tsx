import { useState } from 'react';
import { BaseWindow } from '../os/BaseWindow';
import { useWindowManager } from '../../state/WindowManager';
import { linksPessoais, listaCertificados } from '../../data/data'; 

export type ItemOS = {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'link' | 'app';
  isRoot?: boolean;
  expanded?: boolean;
  contents?: ItemOS[];
  icon?: string;
  specialIcon?: string;
  url?: string;
  bold?: boolean;
  action?: () => void;
};

export function OSExplorer() {
  const { windows, focusWindow, closeWindow, toggleMinimize, openWindow } = useWindowManager();
  const id = 'explorer';
  const win = windows.find((w: any) => w.id === id);

  const [rootTree, setRootTree] = useState<ItemOS[]>([
    // usuarios
    { id: 'usuarios', name: 'Usuários', type: 'folder', isRoot: true, expanded: true, contents: [ 
      { id: 'juiyya', name: 'Juiyya', type: 'folder', isRoot: false, expanded: true, contents: [ 
        { id: 'welcome', name: 'Welcome.txt', type: 'file', icon: '/icons/file.png', action: () => openWindow('welcome', 'Welcome.txt', '/icons/file.png') },
        { id: 'tarefas', name: 'Tarefas.txt', type: 'file', icon: '/icons/file.png', action: () => openWindow('tarefas', 'Tarefas.txt', '/icons/file.png') } 
      ]} 
    ]},
    // curriculo
    { id: 'curriculo', name: 'Currículo', type: 'folder', isRoot: true, expanded: false, contents: [ 
      { id: 'cv-pt', name: 'Curriculo.pdf', type: 'file', icon: '/icons/pdf.png', action: () => openWindow('browser', 'Curriculo.pdf', '/icons/pdf.png', linksPessoais?.curriculoPt) },
      { id: 'cv-en', name: 'Curriculum.pdf', type: 'file', icon: '/icons/pdf.png', action: () => openWindow('browser', 'Curriculum.pdf', '/icons/pdf.png', linksPessoais?.curriculoEn) }, 
      //certificados
      { id: 'certificados', name: 'Certificados', type: 'folder', isRoot: false, expanded: false, contents: 
        (listaCertificados || []).map((cert: any) => ({ id: cert.id, name: cert.nome, type: 'file', icon: '/icons/pdf.png', action: () => openWindow('browser', cert.nome, '/icons/pdf.png', cert.link) })) 
      } 
    ]},
    // contato
    { id: 'contato', name: 'Contato', type: 'folder', isRoot: true, expanded: false, specialIcon: '/icons/rede.png', contents: [ 
      { id: 'github', name: 'GitHub.com', type: 'link', icon: '/icons/github.png', url: linksPessoais?.github }, 
      { id: 'linkedin', name: 'LinkedIn.com', type: 'link', icon: '/icons/linkedin.png', url: linksPessoais?.linkedin }, 
      { id: 'email', name: 'E-mail', type: 'link', icon: '/icons/mail.png', url: `mailto:${linksPessoais?.email}` } 
    ]},
    // apps
    { id: 'apps', name: 'Apps', type: 'folder', isRoot: true, expanded: true, contents: [ 
      { id: 'msn', name: 'Instant Message', type: 'app', icon: '/icons/msn.png', action: () => openWindow('chat', 'Juiyya - Instant Message', '/icons/msn.png') }, 
      { id: 'spotify', name: "Cd Player", type: 'app', icon: "/icons/music.png", action: () => openWindow('cdplayer', 'CD Player', '/icons/music.png')} 
    ]},
    // projetos
    { id: 'projetos', name: 'Projetos', type: 'folder', isRoot: true, expanded: true, contents: [ 
      { id: 'proj-mindguard', name: 'MindGuard.txt', type: 'file', icon: '/icons/file.png', bold: true, action: () => openWindow('folder', 'Detalhe Projeto', '/icons/file.png') }, 
      { id: 'proj-bluadiagnostics', name: 'BluaDiagnostics.txt', type: 'file', icon: '/icons/file.png', action: () => openWindow('folder', 'Detalhe Projeto', '/icons/file.png') }, 
      { id: 'proj-filemonitor', name: 'File Integrity Monitor.txt', type: 'file', icon: '/icons/file.png', action: () => openWindow('folder', 'Detalhe Projeto', '/icons/file.png') }, 
      { id: 'proj-wired', name: 'Wired.txt', type: 'file', icon: '/icons/file.png', action: () => openWindow('folder', 'Detalhe Projeto', '/icons/file.png') } 
    ]},
    // producao
    { id: 'producao', name: 'Em Produção', type: 'folder', isRoot: true, expanded: false, specialIcon: '/icons/producao.png', contents: [ 
      { id: 'txt-juiyya-os', name: 'Juiyya_OS.txt', type: 'file', icon: '/icons/file.png', action: () => openWindow('folder', 'Detalhe Projeto', '/icons/file.png') }, 
      { id: 'proj-mindguard2', name: 'MindGuard.txt', type: 'file', icon: '/icons/file.png', bold: true, action: () => openWindow('folder', 'Detalhe Projeto', '/icons/file.png') },
      { id: 'gif-arduino', name: 'pedal.txt', type: 'file', icon: '/icons/file.png', action: () => openWindow('imageviewer', 'bip bop bip', '/icons/file.png', '/gifs/robot.gif') }, 
      { id: 'gif-pizza', name: 'pizza', type: 'file', icon: '/icons/file.png', action: () => openWindow('imageviewer', 'lanches e hardcore', '/icons/file.png', '/wallpapers/pizza.jpg') } 
    ]}
  ]);

  if (!win?.isOpen) return null;

  const windowTitle = win.title || 'C:\\Juiyya\\Root';

  // abrir/fechar pastas
  const toggleFolder = (folderId: string) => {
    const toggleRecursive = (items: ItemOS[]): ItemOS[] => {
      return items.map(item => {
        if (item.id === folderId) return { ...item, expanded: !item.expanded };
        if (item.contents) return { ...item, contents: toggleRecursive(item.contents) };
        return item;
      });
    };
    setRootTree(prev => toggleRecursive(prev));
  };

  const renderItem = (item: ItemOS, level: number = 0) => {
    
    const alignStyle = {
      marginLeft: `${level * 15}px`, 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px'
    };

    if (item.contents) {
      return (
        <div key={item.id}>
          <div className={item.isRoot ? 'category' : 'buddy online'}>
            {}
            <button 
              className={`btn-clear ${item.isRoot ? 'category-toggle-btn' : 'buddy-link'}`} 
              style={{ ...alignStyle, fontWeight: item.isRoot ? 'bold' : 'normal' }} 
              onClick={() => toggleFolder(item.id)}
            >
              <img src={item.specialIcon || (item.expanded ? '/icons/directory_open.png' : '/icons/directory_closed-4.png')} alt="" className="pixel-icon" /> {item.name}
            </button>
          </div>
          {item.expanded && item.contents.map(filho => renderItem(filho, level + 1))}
        </div>
      );
    } else if (item.url) {
      return (
        <div key={item.id} className="buddy online">
          {}
          <a href={item.url} target={item.url.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer" className="btn-clear buddy-link link" style={{ ...alignStyle, textDecoration: 'none' }}>
            <img src={item.icon} alt="" className="pixel-icon" /> {item.name}
          </a>
        </div>
      );
    } else {
      return (
        <div key={item.id} className="buddy online">
          {}
          <button className="btn-clear buddy-link" style={{ ...alignStyle, fontWeight: item.bold ? 'bold' : 'normal' }} onClick={item.action}>
            <img src={item.icon} alt="" className="pixel-icon" /> {item.name}
          </button>
        </div>
      );
    }
  };

  return (
    <BaseWindow 
      title={windowTitle} 
      icon="/icons/directory_open.png" 
      customClass="folder-window" 
      zIndex={win.zIndex} 
      isMinimized={win.minimized} 
      startX={win.startX || 400} 
      startY={win.startY || 10} 
      onFocus={() => focusWindow(id)} 
      onMinimize={() => toggleMinimize(id)} 
      onClose={() => closeWindow(id)}
      width={470} height={600}
    >
      <div className="menu-bar"><span>File</span> <span>People</span> <span>Help</span></div>
      <div className="window-content buddy-content">
        {rootTree.map(categoria => renderItem(categoria))}
      </div>
    </BaseWindow>
  );
}