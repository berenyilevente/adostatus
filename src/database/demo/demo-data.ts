import { IUser } from "@/app/(admin)/users/models/user.model";
import { faker } from "@faker-js/faker";

function createRandomUser(): IUser {
  return {
    id: faker.string.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    email: faker.internet.email(),
    emailVerified: faker.date.past(),
    mobileNumber: faker.phone.number(),
    image: faker.image.avatar(),
  };
}

const demoUsers = faker.helpers.multiple(createRandomUser, {
  count: 50,
});

export const getUsersDemo = () => demoUsers;

export const getUserByIdDemo = (id: string) => {
  return demoUsers.find((user) => user.id === id) || null;
};
