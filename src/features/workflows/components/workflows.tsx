'use client';

import { EntityContainer, EntityHeader } from '@/components/entity-components';
import { useCreateWorkflow, useSuspenseWorkflows } from '../hooks/use-workflows';
import { useUpgradeModal } from '@/hooks/use-upgrade-modal';
import { useRouter } from 'next/navigation';

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return (
    <div className="flex flex-1 items-center justify-center">
      {JSON.stringify(workflows.data, null, 2)}
    </div>
  );
};

export const Workflowsheader = ({ disable }: { disable?: boolean }) => {
  const createWorkflow = useCreateWorkflow();
  const router = useRouter();
  const { handleError, modal } = useUpgradeModal();

  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        newButtonLabel="New Workflow"
        disable={disable}
        onNew={handleCreate}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};

export const WorkflowContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <EntityContainer header={<Workflowsheader />} search={<></>} pagination={<></>}>
      {children}
    </EntityContainer>
  );
};
