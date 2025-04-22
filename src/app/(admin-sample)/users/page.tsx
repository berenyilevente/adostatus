import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { UserTable } from "./UserTable";
import { UsersProvider } from "./use-users";
import { getUsers } from "./actions";
import { PageTitle } from "../components/PageTitle/PageTitle";

export const metadata: Metadata = {
  title: "Users",
};

const Users = async () => {
  let users: any[] = [];
  const rUsers = await getUsers();

  if (rUsers.status === "success" && rUsers.data) {
    users = rUsers.data;
  } else {
    notFound();
  }

  return (
    <div>
      <PageTitle
        title={"Users"}
        breadcrumbs={[{ label: "Users", active: true }]}
      />
      <div className="mt-5">
        <UsersProvider usersData={users}>
          <UserTable />
        </UsersProvider>
      </div>
    </div>
  );
};

export default Users;
