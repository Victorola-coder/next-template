// define your mf types here

declare module "aos";

declare module "*.svg" {
  const content: string;
  export default content;
}
interface SVGProps {
  fill?: string;
  className?: string;
  onClick?: () => void;
}
type Props = {
  show?: boolean;
};

type InputProps = {
  id?: string;
  error?: string;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
} & (
  | React.InputHTMLAttributes<HTMLInputElement>
  | React.TextareaHTMLAttributes<HTMLTextAreaElement>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  loading?: boolean;
  noDefault?: boolean;
  size?: "default" | "sm" | "lg";
  variant?: "primary" | "default" | "secondary" | "danger" | "google";
}

type ModalProps = {
  close?: boolean;
  title?: string;
  isOpen: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
};

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  defaultValue?: string;
  className?: string;
  onChange?: (value: string) => void;
};

type Tab = {
  label: string;
  value: string;
};

type TabsProps = {
  tabs: Tab[];
  className?: string;
  defaultValue?: string;
  buttonClassName?: string;
  onChange?: (value: string) => void;
};

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

type TextareaProps = {
  name: string;
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  className?: string;
};

type OTPState = {
  [key: string]: string;
};

// ============================================
// Foundation Components Types
// ============================================

// Accordion
interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
  collapsible?: boolean;
}

// Alert
type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  description: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  variant?: AlertVariant;
  loading?: boolean;
}

// Avatar
type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type AvatarStatus = "online" | "offline" | "away" | "busy";

interface AvatarProps {
  src?: string;
  alt: string;
  fallback?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
  shape?: "circle" | "square";
}

interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    alt: string;
    fallback?: string;
  }>;
  max?: number;
  size?: AvatarSize;
  className?: string;
}

// Badge
type BadgeVariant = "default" | "primary" | "success" | "warning" | "error" | "info";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  onRemove?: () => void;
  className?: string;
}

// Breadcrumbs
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

// Checkbox
interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  indeterminate?: boolean;
}

// Radio Group
interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
  error?: string;
}

// Separator
interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  decorative?: boolean;
}

// Switch
type SwitchSize = "sm" | "md" | "lg";

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  size?: SwitchSize;
  className?: string;
}

// ============================================
// Advanced Input Components Types
// ============================================

// Combobox
interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}

// Multi-Select
interface MultiSelectProps {
  options: ComboboxOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  maxSelected?: number;
  disabled?: boolean;
  className?: string;
  error?: string;
}

// Date Picker
interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}

// Date Range Picker
interface DateRangePickerProps {
  value?: { from: Date | undefined; to: Date | undefined };
  defaultValue?: { from: Date | undefined; to: Date | undefined };
  onChange?: (range: { from: Date | undefined; to: Date | undefined }) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}

// Time Picker
interface TimePickerProps {
  value?: string; // HH:mm format
  defaultValue?: string;
  onChange?: (time: string) => void;
  format?: "12" | "24";
  step?: number; // minutes
  disabled?: boolean;
  className?: string;
  error?: string;
}

// Color Picker
interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  format?: "hex" | "rgb" | "hsl";
  presets?: string[];
  disabled?: boolean;
  className?: string;
  showAlpha?: boolean;
}

// File Upload
interface FileUploadFile {
  file: File;
  preview?: string;
  progress?: number;
  error?: string;
}

interface FileUploadProps {
  value?: File[];
  onChange?: (files: File[]) => void;
  accept?: string;
  maxSize?: number; // bytes
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  onUpload?: (files: File[]) => Promise<void>;
}

// Tag Input
interface TagInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  suggestions?: string[];
}

// Slider
interface SliderProps {
  value?: number | number[];
  defaultValue?: number | number[];
  onChange?: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

// Rating
interface RatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  precision?: number; // 0.5 for half stars, 1 for full stars
  disabled?: boolean;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
}

