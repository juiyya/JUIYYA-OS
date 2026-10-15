export type JanelaAberta = {
  id: string;
  title: string;
  isOpen: boolean;
  zIndex: number;
  icon?: string;
  focused?: boolean;
  minimized?: boolean;
  url?: string;
};