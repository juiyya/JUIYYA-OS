

export type TipoItem = 'folder' | 'file' | 'link' | 'app';

export interface ItemOS {
  id: string;
  name: string;
  type: TipoItem;
  isRoot?: boolean;
  expanded?: boolean;
  specialIcon?: string;
  icon?: string;
  bold?: boolean;
  url?: string;
  action?: () => void;
  contents?: ItemOS[]; // permite pastas dentro de pastas
}

export interface ProjetoDetalhe {
  nome: string;
  texto: string;
  detalhes: string;
  link: string;
  video?: string;
}

export interface Certificado {
  id: string;
  nome: string;
  link: string;
}

export const detalhesDosProjetos: Record<string, ProjetoDetalhe> = {
  'mindguard': {
    nome: 'MindGuard',
    texto: 'Uma plataforma desenvolvida para apoiar clientes de um plano de saúde corporativo. Reúne informações médicas, marca consultas e detecta necessidade de ajuda psicológica para os colaboradores através de sinais vitais registrados por wearables (apple watch) e questionários diários, além de contextos que podem ser adicionados (ciclo menstrual, férias, semana de provas etc). Também conta com uma área desenvolvida para a empresa com um painel de medicina ocupacional, com dashboards estatísticos apresentando o risco por departamento (Venda, Finaceiro, TI, Operações, etc). O projeto já está rodando em produção na vida real.',
    detalhes: ` Python, Node.js, Express, React + Vite + Tailwind, PostgreSQL, HTML, CSS`,
    link: 'https://frontend-production-4508.up.railway.app/'
  },
  'bluadiagnostics': {
    nome: 'BluaDiagnostics',
    texto: 'Plataforma de monitoramento inteligente processando dados médicos e fazendo análise estatística pesada.',
    detalhes: 'O backend usa LangGraph para orquestrar a bagunça toda com 4 modelos locais de IA.',
    link: 'https://github.com/juiyya/BluaDiagnostic_Sprint.4',
    video: 'https://www.youtube.com/embed/fSAKRy0DaWs?autoplay=1'
  },
  'file-integrity': {
    nome: 'File Integrity Monitor',
    texto: 'Um sistema focado em integridade de arquivos (EDR) que usa listas encadeadas (sofri, mas rodou) e hashing para rastrear qualquer alteração. Ele entrega quem mexeu e tem mecânicas de defesa ativa e dá rollback automático.',
    detalhes: 'C, Python, Node.js, PostgreSQL. Security: Flask, JWT, bcrypt, Watchdog. Testado no Postman.',
    link: 'https://github.com/juiyya/File-Integrity-Monitor-Sistema-de-Commit-'
  },
  'wired': {
    nome: 'Wired',
    texto: 'Digital Twin de rede em tempo real com detecção de anomalias via Autoencoder e sistema de defesa ativa (IPS)',
    detalhes: 'C++; PyTorch; Three.js',
    link: 'https://github.com/juiyya/wired'
  },
  'juiyya_os': {
    nome: 'Juiyya OS (Web Desktop)',
    texto: 'Um portfólio interativo simulando um ambiente desktop. Esse é o meu maior projeto, além de todo o código, configurar blindagem de rede, Nginx e defesa contra DDos foi difícil pra caramba kkkkkk. Ainda não foi finalizado, pretendo implementar vários outros projetos e quem sabe subir uns joguinhos básicos. ',
    detalhes: 'Svelte, TypeScript, HTML, CSS, Python; Rodando numa instância pública pela Oracle',
    link: 'https://github.com/juiyya/julia-os' 
  }
};

export const linksPessoais = {
  github: 'https://github.com/juiyya',
  linkedin: 'https://linkedin.com/in/julia-yamazaki',
  email: 'yamazaki.y@outlook.com',
  curriculoDown: '/curriculo.pdf',
  curriculoPt: '/docs/Julia Yamazaki Curriculo.pdf',
  curriculoEn: '/docs/Julia Yamazaki Curriculum_EN.pdf'
};

export const listaCertificados: Certificado[] = [
  { id: 'praticas_SAST', nome: 'Práticas SAST e integração em CI_CD', link: '/docs/certificados/SAST_CI_CD.pdf' },
  { id: 'supply_chain', nome: 'Supply Chain vulnerabilidades e lincenças', link: '/docs/certificados/Supply_Chain_Vulnerabilidades_Lincenças.pdf' },
  { id: 'pipelines', nome: 'Segurança em Pipelines práticas SCA e integração em CI_CD', link: '/docs/certificados/Segurança em Pipelines_CI_CD.pdf' },
  { id: 'dast', nome: 'DAST Segurança em aplicações web e APIs', link: '/docs/certificados/DAST_WEB_API.pdf' },
  { id: 'vault', nome: 'Automação com vault.pdf', link: '/docs/certificados/automacao com vault.pdf' },
  { id: 'AppSec Checkpoint 1', nome: 'AppSec Checkpoint 1.pdf', link: '/docs/certificados/AppSec Checkpoint 1.pdf' },
  { id: 'cert-owasp', nome: 'OWASP_top10.pdf', link: '/docs/certificados/OWASP_top10.pdf' },
  { id: 'cert-appsec', nome: 'AppSec Fundamentos.pdf', link: '/docs/certificados/appsec_fundamentos.pdf' },
  { id: 'cert-cyber', nome: 'Cyber Segurança.pdf', link: '/docs/certificados/cyber_redes.pdf' },
  { id: 'seg_web', nome: 'Segurança de Aplicações Web.pdf', link: '/docs/certificados/Segurança de Aplicações Web.pdf' },
  { id: 'cert-cyber-fund', nome: 'Cyber Segurança Fundamentos.pdf', link: '/docs/certificados/cyber_fundamentos.pdf' },
  { id: 'linux_cyber', nome: 'Linux para Segurança.pdf', link: '/docs/certificados/linux_cyber.pdf' },
  { id: 'seg_api', nome: 'Segurança de APIs.pdf', link: '/docs/certificados/Segurança de APIs.pdf' },
  { id: 'python_sql', nome: 'python_sql.pdf', link: '/docs/certificados/python_sql.pdf' },
];

export const startMenuItems = [
  { type: 'link', href: linksPessoais.github, blank: true, icon: 'github.png', text: 'GitHub' },
  { type: 'link', href: linksPessoais.linkedin, blank: true, icon: 'linkedin.png', text: 'LinkedIn' },
  { type: 'divider' },
  { type: 'link', href: linksPessoais.curriculoDown, download: true, icon: 'pdf.png', text: 'Baixar Currículo' }
];

export const quickLaunchItems = [
  { id: 'terminal', icon: 'console.png', alt: 'Terminal' },
  { id: 'explorer', icon: 'computer_explorer.png', alt: 'Explorer' },
  { id: 'cdplayer', icon: 'music.png', alt: 'CD Player' }
];

