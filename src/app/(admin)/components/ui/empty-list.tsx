import { Icon, IconType } from '@/components';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const EmptyList = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-center py-12">{children}</div>;
};

EmptyList.Icon = ({ icon }: { icon: IconType }) => (
  <Icon icon={icon} className="mx-auto text-gray-300 mb-4" size="xl" />
);

EmptyList.Title = ({ title }: { title: string }) => (
  <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
);

EmptyList.Description = ({ description }: { description: string }) => (
  <p className="text-gray-500 mb-4">{description}</p>
);

EmptyList.Action = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      variant="default"
      color="primary"
      startIcon="plus"
      size="sm"
      iconSize="xs"
    >
      {label}
    </Button>
  );
};
