import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { UserTable } from "./UserTable";
import { UsersProvider } from "./use-users";
import { getUsers } from "./actions";
import { PageTitle } from "../components/ui/page-title";
import { User } from "@/generated/prisma";

export const metadata: Metadata = {
  title: "Users",
};

const Users = async () => {
  let users: User[] = [];
  const rUsers = await getUsers();

  if (rUsers === null) {
    return notFound();
  }

  if (rUsers.status === "success" && rUsers.data) {
    users = rUsers.data;
  }

  return (
    <UsersProvider usersData={users}>
      <PageTitle
        title={"Users"}
        breadcrumbs={[{ label: "Users", active: true }]}
      />
      <div className="mt-5">
        <UserTable />
      </div>
    </UsersProvider>
  );
};

export default Users;
