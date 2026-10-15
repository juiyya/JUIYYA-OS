import { useState, useRef } from 'react';
import { BaseWindow } from '../os/BaseWindow';
import { useWindowManager } from '../../state/WindowManager'; // Lembre-se do 'w' minúsculo

interface Message { role: 'info' | 'Você' | 'Juiyya'; text: string; }

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export function Chat() {
  const { windows, focusWindow, closeWindow, toggleMinimize } = useWindowManager();
  const id = 'chat';
  const win = windows.find((w: any) => w.id === id);

  const [inputMensagem, setInputMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [mensagens, setMensagens] = useState<Message[]>([
    { role: 'info', text: '...Juiyya está online...' }, 
    { role: 'Juiyya', text: 'eai' }, 
    { role: 'Juiyya', text: 'meu nome é Juiyya' }
  ]);

  const meuSessionId = useRef(generateUUID());

  if (!win?.isOpen) return null;

  const preencherChat = (texto: string) => { 
    if (!carregando) setInputMensagem(texto); 
  };

  const enviarMensagem = async () => {
    if (!inputMensagem.trim() || carregando) return;
    const textoUsuario = inputMensagem;
    setInputMensagem('');
    
    setMensagens(prev => [...prev, { role: 'Você', text: textoUsuario }]);
    setCarregando(true);

    try {
      const API_URL = import.meta.env.VITE_PUBLIC_API_URL || ''; 
      const resposta = await fetch(`${API_URL}/api/chat`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ 
          mensagem: textoUsuario, 
          userId: meuSessionId.current 
        }) 
      });

      if (!resposta.ok) throw new Error('Falha');

      const textoRetorno = await resposta.text();
      setMensagens(prev => [...prev, { role: 'Juiyya', text: textoRetorno }]); 

    } catch (erro) {
      console.error("Erro no chat:", erro); 
      setMensagens(prev => [...prev, { role: 'info', text: '*** Erro ao conectar com o servidor ***' }]);
    } finally {
      setCarregando(false);
    }
  };

  const chamarAtencao = () => {
    if (isShaking) return;
    setMensagens(prev => [...prev, { role: 'info', text: 'Você acaba de enviar um alerta.' }]);
    setIsShaking(true);
    setTimeout(() => { setIsShaking(false); }, 500);
  };

  // Estilo base para botões flat
  const flatBtnStyle = {
    background: 'transparent',
    border: 'none',
    textAlign: 'left' as const,
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '11px',
    padding: 0,
    color: '#000',
    textDecoration: 'none'
  };

  return (
    <>
      <style>
        {`
          .shake-animation {
            animation: msn-shake 0.05s infinite alternate !important;
          }
          @keyframes msn-shake {
            0% { margin-left: 0px; margin-top: 0px; }
            25% { margin-left: 10px; margin-top: -10px; }
            50% { margin-left: -10px; margin-top: 10px; }
            75% { margin-left: 10px; margin-top: 10px; }
            100% { margin-left: -10px; margin-top: -10px; }
          }
        `}
      </style>

      <BaseWindow 
        title="Juiyya - Instant Message" 
        icon="/icons/msn.png" 
        customClass={`chat-window ${isShaking ? 'shake-animation' : ''}`} 
        zIndex={win.zIndex} 
        isMinimized={win.minimized}
        width={600}  
        height={550} 
        onFocus={() => focusWindow(id)} 
        onMinimize={() => toggleMinimize(id)} 
        onClose={() => closeWindow(id)} 
        startX={win.startX || 150} 
        startY={win.startY || 50}
      >
        <div className="menu-bar"><span>File</span> <span>Edit</span> <span>Insert</span> <span>People</span></div>
        
        {/* Layout Principal*/}
        <div className="window-content chat-layout" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
          
          {/* (Histórico | Sidebar) */}
          <div className="chat-split-view" style={{ display: 'flex', flexGrow: 1, borderBottom: '2px groove #fff', overflow: 'hidden' }}>
            
            {/* Esquerda: Histórico */}
            <div className="chat-history scrollable" style={{ flexGrow: 1, padding: '10px', overflowY: 'auto' }}>
              {mensagens.map((msg, idx) => (
                msg.role === 'info' ? (
                  <div key={idx} className="message info" style={{ color: '#808080', fontStyle: 'italic', textAlign: 'center', marginTop: '15px' }}>
                    <span className="text">{msg.text}</span>
                  </div>
                ) : (
                  <div key={idx} className="message" style={{ marginBottom: '8px' }}>
                    <span className="username" style={{ fontWeight: 'bold', marginRight: '5px', color: msg.role === 'Você' ? '#000000' : '#0000ff' }}>{msg.role}:</span>{' '}
                    <span className="text">{msg.text}</span>
                  </div>
                )
              ))}
              {carregando && <div className="message info" style={{ color: '#808080', fontStyle: 'italic', textAlign: 'center', marginTop: '15px' }}><span className="text">...Juiyya está processando...</span></div>}
            </div>

            {/* Direita: Sidebar*/}
            <div className="chat-sidebar" style={{ width: '140px', flexShrink: 0, backgroundColor: '#ece9d8', borderLeft: '2px groove #fff', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px 5px 5px' }}>
              <div className="avatar-frame" style={{ border: '2px inset #ffffff', backgroundColor: '#ffffff', padding: '2px', height: '96px', width: '96px', marginBottom: '5px' }}>
                <img src="/profile.jpg" alt="Avatar" className="avatar-img" style={{ width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated' }} />
              </div>
              <span className="status-name" style={{ fontWeight: 'bold', color: '#0000ff', fontSize: '11px', marginTop: '5px' }}>Juiyya</span>
              <span className="status-music" style={{ fontSize: '10px', color: '#808080', fontStyle: 'italic', textAlign: 'center', lineHeight: '1.2', marginBottom: '10px' }}>♪ Ouvindo: The Cure - Lovesong</span>
              
              <div className="agent-commands" style={{ width: '100%', marginTop: '15px', padding: '0 5px' }}>
                <div className="commands-title" style={{ fontWeight: 'bold', color: '#404040', marginBottom: '8px', borderBottom: '1px dashed #a0a0a0', paddingBottom: '2px', textAlign: 'center' }}>Pergunte sobre:</div>
                
                <ul className="commands-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <img src="/icons/chatcd.png" alt="" className="cmd-icon-img" style={{ width: '14px', height: '14px' }} /> 
                    <button type="button" style={flatBtnStyle} disabled={carregando} onClick={() => preencherChat("O que está tocando no Spotify agora?")}>Status do Spotify</button>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <img src="/icons/steam.png" alt="" className="cmd-icon-img" style={{ width: '14px', height: '14px' }} /> 
                    <button type="button" style={flatBtnStyle} disabled={carregando} onClick={() => preencherChat("Quais foram os seus últimos jogos na Steam?")}>Atividade Steam</button>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <img src="/icons/help.png" alt="" className="cmd-icon-img" style={{ width: '14px', height: '14px' }} /> 
                    <button type="button" style={flatBtnStyle} disabled={carregando} onClick={() => preencherChat("Como eu posso usar este sistema? O que você sabe fazer?")}>Como usar o Juiyya OS</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* cht Input */}
          <div className="chat-input-area fixed-bottom" style={{ height: '120px', flexShrink: 0, backgroundColor: '#ece9d8', display: 'flex', flexDirection: 'column' }}>
            <div className="format-bar" style={{ padding: '2px 8px', borderBottom: '1px solid #aca899', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="format-tools" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <b style={{ cursor: 'pointer' }}>A</b> <i style={{ cursor: 'pointer' }}>A</i> <u style={{ cursor: 'pointer' }}>A</u>
                <div className="divider-vertical" style={{ width: '1px', height: '14px', backgroundColor: '#aca899', margin: '0 4px' }}></div>
                <img src="/icons/smile.png" alt="Emotions" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                <img src="/icons/clip.png" alt="Attach" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
              </div>
              <button className="attention-btn" onClick={chamarAtencao} disabled={carregando} style={{ padding: '2px 6px', border: '1px outset #ffffff', backgroundColor: '#ece9d8', cursor: 'pointer', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px', height: '22px' }}>
                <img src="/icons/shake.png" alt="" style={{ width: '14px', height: '14px' }} /> Chamar Atenção
              </button>
            </div>
            
            <input 
              type="text" 
              className="chat-input" 
              placeholder="escreva algo aqui..." 
              value={inputMensagem} 
              onChange={(e) => setInputMensagem(e.target.value)}
              disabled={carregando} 
              onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()} 
              style={{ flexGrow: 1, border: '1px inset #fff', margin: '4px', padding: '5px', outline: 'none' }}
            />
            
            <div className="send-row" style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 4px 4px 0' }}>
              <button className="send-btn" disabled={carregando} onClick={enviarMensagem} style={{ backgroundColor: '#ece9d8', border: '2px outset #fff', padding: '2px 15px', cursor: 'pointer' }}>
                Send
              </button>
            </div>
          </div>
        </div>
      </BaseWindow>
    </>
  );
}