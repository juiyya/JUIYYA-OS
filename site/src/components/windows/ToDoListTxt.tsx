import { BaseWindow } from '../os/BaseWindow';
import { useWindowManager } from '../../state/WindowManager';

export function ToDoListTxt() {
  const { windows, focusWindow, closeWindow, toggleMinimize } = useWindowManager();
  const id = 'tarefas'; // ID que vai usar no openWindow
  const win = windows.find((w: any) => w.id === id);

  if (!win?.isOpen) return null;

  return (
    <BaseWindow
      title="Tarefas.txt"
      icon="/icons/file.png"
      customClass="tarefas"
      zIndex={win.zIndex}
      isMinimized={win.minimized}
      startX={333}
      startY={100}
      onFocus={() => focusWindow(id)}
      onClose={() => closeWindow(id)}
      onMinimize={() => toggleMinimize(id)}
      width={400} height={400}
    >
      <div className="menu-bar"><span>File</span> <span>Edit</span> <span>Format</span> <span>View</span> <span>Help</span></div>
      <div className="address-bar"><span>Address</span><div className="address-input"><span>C:\Usuários\Juiyya\Tarefas.txt</span></div></div>
      <div className="window-content notepad-content" style={{ padding: '10px' }}>
        <p>Lista de Tarefas</p>
        <p>objetivos para desenvolver nesse site</p>
        <p>- refatorar projeto: Window Manager Pattern</p>
        <p>- rodar doom</p>
        <p>- implementar mais acoes nas janelas</p>
        <p>- implementar acoes no chatbot</p>
        <p>- funcao para o terminal</p>
        <p>- implementar o jogo da cobrinha</p>
        <p>- atualizar certificados</p>
      </div>
    </BaseWindow>
  );
}