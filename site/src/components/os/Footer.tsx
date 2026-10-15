import { useState, useEffect } from 'react';

export function Footer() {
  const [hora, setHora] = useState('');

  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, '0');
    function atualizarHora() {
      const d = new Date();
      const fuso = -(d.getTimezoneOffset() / 60);
      setHora(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
              `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ` +
              `UTC${fuso > 0 ? '+' : ''}${fuso}`);
    }
    atualizarHora(); 
    const intervalo = setInterval(atualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="footer-bar">
      <span>{hora}</span>
      <span>&lt;/&gt; with &lt;3 by Juiyya</span>
    </div>
  );
}