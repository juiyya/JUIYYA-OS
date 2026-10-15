import { BaseWindow } from '../os/BaseWindow';
import { useWindowManager } from '../../state/WindowManager';
import { detalhesDosProjetos } from '../../data/data'; 

export function Folder() {
  const { windows, focusWindow, closeWindow, toggleMinimize, } = useWindowManager();
  const id = 'folder';
  const win = windows.find((w: any) => w.id === id);

  if (!win?.isOpen) return null;

  // função simulada para abrir os detalhes (adaptar para abrir outra janela)
  const onOpenDetail = (projId: string) => {
    alert(`Abrir detalhes do projeto: ${projId}`);
  };

  return (
    <BaseWindow 
      title="Projetos" 
      icon="/icons/directory_open.png" 
      customClass="folder-window" 
      zIndex={win.zIndex} 
      isMinimized={win.minimized} 
      onFocus={() => focusWindow(id)} 
      onMinimize={() => toggleMinimize(id)} 
      onClose={() => closeWindow(id)}
    >
      <div className="menu-bar"><span>File</span> <span>Edit</span> <span>View</span> <span>Favorites</span> <span>Help</span></div>
      <div className="address-bar"><span>Address</span> <div className="address-input"><span>C:\Juiyya\Projetos</span></div></div>
      <div className="window-content folder-content" style={{ padding: '10px' }}>
        {Object.entries(detalhesDosProjetos || {}).map(([key, project]: [string, any]) => (
          <div key={key} className="file-item" style={{ marginBottom: '10px' }}>
            <button className="file-main-btn" onClick={() => onOpenDetail(key)}>
              <img src="/icons/file.png" alt="" className="pixel-icon-lg" />
              <span className="file-info">
                <span className="file-name" style={{ fontWeight: 'bold' }}>{project.nome}.exe</span>
                <span className="file-desc" style={{ display: 'block', fontSize: '12px' }}>{project.texto}</span>
              </span>
            </button>
            <div className="file-link-wrapper">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="file-link">&gt; Ver repositório no Github</a>
            </div>
          </div>
        ))}
      </div>
    </BaseWindow>
  );
}