import { ReactElement } from "react";
import { getUsers } from "./actions/dashboard.actions";

export const Dashboard = async (): Promise<ReactElement> => {
  const { data, errors } = await getUsers();

  return <div>User count: {JSON.stringify(data)} </div>;
};
