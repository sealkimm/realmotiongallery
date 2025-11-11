import { cn } from '@/lib/utils';

interface FormSectionProps {
  children: React.ReactNode;
  className?: string;
}

const FormSection = ({ children, className }: FormSectionProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 bg-gray-900/50 p-6 backdrop-blur-md',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FormSection;
