"use client";

import { Button } from "@/components/ui/button";
import Logout from "./logout";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const { data: workflows } = useQuery(trpc.getWorkflows.queryOptions());
  const queryClient = useQueryClient();

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("AI job queued");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    })
  );

  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    })
  );
  return (
    <div className="flex flex-col gap-4 ">
      <Button>Click me</Button>
      <pre className="p-y-4">{JSON.stringify(workflows, null, 2)}</pre>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test AI
      </Button>
      <pre className="p-y-4">{JSON.stringify(testAi, null, 2)}</pre>
      <Logout />
    </div>
  );
};

export default Page;
