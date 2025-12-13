'use client';

import { type NodeProps, Position, useReactFlow } from '@xyflow/react';
import { type LucideIcon } from 'lucide-react';
import { memo, type ReactNode } from 'react';
import { WorkflowNode } from '../../../components/workflow-node';
import { BaseNode, BaseNodeContent } from '../../../components/react-flow/base-node';
import Image from 'next/image';
import { BaseHandle } from '../../../components/react-flow/base-handle';
import {
  type NodeStatus,
  NodeStatusIndicator,
} from '@/components/react-flow/node-status-indicator';

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string;
  children?: ReactNode;
  description?: string;
  name: string;
  onSettings?: () => void;
  onDoubleClick?: () => void;
  status?: NodeStatus;
}

export const BaseTriggerNode = memo(
  ({
    id,
    icon: Icon,
    children,
    description,
    name,
    onSettings,
    onDoubleClick,
    status = 'initial',
  }: BaseTriggerNodeProps) => {
    const { setNodes, setEdges } = useReactFlow();

    const handleDelete = () => {
      setNodes((currentNodes) => {
        const updatedNodes = currentNodes.filter((node) => node.id !== id);
        return updatedNodes;
      });

      setEdges((currentEdges) => {
        const updatedEdges = currentEdges.filter(
          (edge) => edge.source !== id && edge.target !== id,
        );
        return updatedEdges;
      });
    };

    return (
      <WorkflowNode
        name={name}
        description={description}
        onSettings={onSettings}
        onDelete={handleDelete}
      >
        <NodeStatusIndicator status={status} variant='border' className='rounded-l-2xl'>
          <BaseNode
            status={status}
            onDoubleClick={onDoubleClick}
            className='group relative rounded-l-2xl'
          >
            <BaseNodeContent>
              {typeof Icon === 'string' ? (
                <Image src={Icon} alt={name} width={16} height={16} />
              ) : (
                <Icon className='text-muted-foreground size-4' />
              )}
              {children}
              <BaseHandle id='source-1' type='source' position={Position.Right} />
            </BaseNodeContent>
          </BaseNode>
        </NodeStatusIndicator>
      </WorkflowNode>
    );
  },
);

BaseTriggerNode.displayName = 'BaseTriggerNode';
