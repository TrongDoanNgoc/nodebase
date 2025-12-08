import { PlusIcon } from 'lucide-react';
import { Button } from './ui/button';
import { memo, useState } from 'react';
import { NodeSelector } from './node-selector';

export const AddNodeButton = memo(({ onClick }: { onClick: () => void }) => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <Button size={'icon'} onClick={onClick} variant='outline' className='bg-background'>
        <PlusIcon />
      </Button>
    </NodeSelector>
  );
});

AddNodeButton.displayName = 'AddNodeButton';
