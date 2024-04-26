export type TextControl = {
  control: 'text';
  default?: string;
};

export type CheckboxControl = {
  control: 'checkbox';
  default?: boolean;
};

export type JdmControl = TextControl | CheckboxControl;
