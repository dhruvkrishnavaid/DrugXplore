export type AppProps = {
  page: React.ReactNode;
};

export type AddInputProps = {
  title: string;
  required?: boolean;
  placeholder: string;
  count: number;
  inputs: string[];
  setCount: (count: number) => void;
  setInputs: (inputs: string[]) => void;
  buttonText: string;
};

export type PopupProps = {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  hasButtons?: boolean;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
};

