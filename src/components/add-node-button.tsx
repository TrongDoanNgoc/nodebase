import { PlusIcon } from 'lucide-react';
import { Button } from './ui/button';
import { memo } from 'react';

export const AddNodeButton = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <Button size={'icon'} onClick={onClick} variant='outline' className='bg-background'>
      <PlusIcon />
    </Button>
  );
});

AddNodeButton.displayName = 'AddNodeButton';
