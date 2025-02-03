"use server";

import connectMongo from "@/database/mongoose";
import { Response } from "@/types/action.types";
import { faker } from "@faker-js/faker";

import { User, IUser } from "../models/user.model";
import dayjs from "dayjs";

export const getUsers = async (): Promise<Response<IUser[]>> => {
  function createRandomUser(): IUser {
    return {
      id: faker.string.uuid(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      email: faker.internet.email(),
      emailVerified: faker.date.past(),
    };
  }

  await connectMongo();
  const users = await User.find();

  const usersDemo = faker.helpers.multiple(createRandomUser, {
    count: 50,
  });

  return {
    status: "success",
    data: usersDemo,
    code: 200,
    errors: undefined,
  };
};
