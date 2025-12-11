import { Search } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-20">
      <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-800">
        <Search size={48} className="text-gray-600" />
      </div>
      <h3 className="mb-3 text-3xl font-bold text-gray-100">{title}</h3>
      <p className="mb-8 max-w-md text-center text-gray-400">{description}</p>
    </div>
  );
};

export default EmptyState;
