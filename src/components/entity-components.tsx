import { PlusIcon, SearchIcon } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Input } from './ui/input';

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel: string;
  disable?: boolean;
  isCreating?: boolean;
} & (
  | {
      onNew: () => void;
      newButtonHref?: never;
    }
  | {
      newButtonHref: string;
      onNew?: never;
    }
  | {
      onNew?: never;
      newButtonHref?: never;
    }
);

export const EntityHeader = ({
  title,
  description,
  newButtonLabel,
  disable,
  isCreating,
  onNew,
  newButtonHref,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
        {description && <p className="text-muted-foreground text-xs md:text-sm">{description}</p>}
      </div>
      {onNew && !newButtonHref && (
        <Button size="sm" onClick={onNew} disabled={isCreating || disable}>
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </Button>
      )}
      {newButtonHref && !onNew && (
        <Button size="sm" asChild>
          <Link href={newButtonHref} prefetch>
            <PlusIcon className="size-4" />
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};

type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
};

export const EntityContainer = ({ children, header, search, pagination }: EntityContainerProps) => {
  return (
    <div className="h-full p-4 md:px-10 md:py-6">
      <div className="mx-auto flex h-full w-full max-w-screen flex-col gap-y-8">
        {header}
        <div className="flex h-full flex-col gap-y-4">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
};

interface EntitySearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const EntitySearch = ({ placeholder = 'Search', value, onChange }: EntitySearchProps) => {
  return (
    <div className="relative ml-auto">
      <SearchIcon className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
      <Input
        type="text"
        className="bg-background border-border max-w-[200px] pl-8 shadow-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}
export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2">
      <div className="text-muted-foreground flex-1 text-sm">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1 || disabled}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages || totalPages === 0 || disabled}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
