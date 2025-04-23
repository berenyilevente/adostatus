import { Metadata } from "next";
import React from "react";

import { routes } from "@/lib/routes";

import { CreateUser } from "./CreateUser";
import { CreateUserProvider } from "./use-create-user";
import { PageTitle } from "../../components/ui/page-title";

export const metadata: Metadata = {
  title: "Create User",
};

const CreateUserPage = () => {
  return (
    <div>
      <PageTitle
        title={"Create User"}
        breadcrumbs={[
          { label: "Users", path: routes.admin.users.index },
          { label: "Create", active: true },
        ]}
      />
      <div className="mt-5">
        <CreateUserProvider>
          <CreateUser />
        </CreateUserProvider>
      </div>
    </div>
  );
};

export default CreateUserPage;
