import { BaseWindow } from '../os/BaseWindow';
import { useWindowManager } from '../../state/WindowManager';

export function ImageViewer() {
  const { windows, focusWindow, closeWindow, toggleMinimize } = useWindowManager();
  const id = 'imageviewer';
  const win = windows.find((w: any) => w.id === id);

  if (!win?.isOpen) return null;

  const imagePath = win.url; 
  const windowTitle = win.title || 'Visualizador de Imagens';

  return (
    <BaseWindow 
      title={windowTitle} 
      icon="/icons/file.png" 
      customClass="image-viewer-window" 
      zIndex={win.zIndex} 
      isMinimized={win.minimized} 
      onFocus={() => focusWindow(id)} 
      onMinimize={() => toggleMinimize(id)} 
      onClose={() => closeWindow(id)}
    >
      <div className="menu-bar"><span>File</span> <span>View</span> <span>Help</span></div>
      <div className="window-content image-content">
        {imagePath ? (
          <img src={imagePath} alt={windowTitle} className="pixel-art-image" />
        ) : (
          <p style={{ padding: '20px' }}>Nenhuma imagem selecionada.</p>
        )}
      </div>
    </BaseWindow>
  );
}