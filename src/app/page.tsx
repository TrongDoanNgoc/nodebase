import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import Logout from "./logout";

const Page = async () => {
  await requireAuth();
  const users = await caller.getUsers();
  return (
    <div>
      <Button>Click me</Button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <Logout />
    </div>
  );
};

export default Page;
