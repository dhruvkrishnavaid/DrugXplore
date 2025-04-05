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

export type AyurvedicRes = {
  description: string;
  name: string;
  path: string;
  result: { text: string };
  symptoms: string[];
};

export type DiscoveryRes = {
  active_compounds: string[];
  description: string;
  desired_extraction_method: string;
  medicine_name: string;
  name: string;
  path: string;
  regions_of_interest: string[];
  result: { text: string };
  target_disease: string;
};

export type ExistingRes = {
  description: string;
  medicines: string[];
  name: string;
  path: string;
  result: { text: string };
  symptoms: string[];
};
