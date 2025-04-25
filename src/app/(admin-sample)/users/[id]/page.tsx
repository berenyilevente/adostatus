import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import { routes } from "@/lib/routes";
import { PageTitle } from "@/components/admin/index";

import { EditUser } from "./EditUser";
import { EditUserProvider } from "./use-edit-user";
import { getUser } from "../actions/user.actions";

export const metadata: Metadata = {
  title: "Edit User",
};

const EditUserPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  let user: any | null = null;
  const rUser = await getUser(params.id);

  if (rUser.status === "success" && rUser.data) {
    user = rUser.data;
  } else {
    notFound();
  }

  return (
    <div>
      <PageTitle
        title={"Edit User"}
        breadcrumbs={[
          { label: "Users", path: routes.admin.users.index },
          { label: "Edit", active: true },
        ]}
      />
      <div className="mt-5">
        <EditUserProvider user={user}>
          <EditUser />
        </EditUserProvider>
      </div>
    </div>
  );
};

export default EditUserPage;
