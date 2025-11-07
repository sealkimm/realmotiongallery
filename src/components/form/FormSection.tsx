import { cn } from '@/lib/utils';

interface FormSectionProps {
  children: React.ReactNode;
  className?: string;
}

const FormSection = ({ children, className }: FormSectionProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-800 bg-gray-700/40 p-6',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FormSection;
