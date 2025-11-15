import { Button } from "@/components/ui/button";
import { caller } from "@/trpc/server";

const Page = async () => {
  const users = await caller.getUsers();
  return (
    <div>
      <Button>Click me</Button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};

export default Page;
