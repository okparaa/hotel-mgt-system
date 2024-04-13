import { faker } from "@faker-js/faker";

export const createRandomUsers = () => {
  const lastName = faker.person.lastName().toLowerCase();
  const firstName = faker.person.firstName().toLowerCase();
  return {
    firstname: firstName,
    lastname: lastName,
    username: faker.internet.email({ firstName, lastName }),
    surname: faker.person.middleName(),
    password: "intell",
    password2: "intell",
    address: faker.location.streetAddress(),
    phone: faker.phone.number(),
    salary: faker.number.float({ min: 25000, max: 250000 }),
  };
};

export const createRandomItems = () => {
  return {
    description: faker.commerce.productName(),
    name: faker.commerce.product(),
    type: faker.commerce.productMaterial(),
    price: faker.commerce.price({ min: 1000, max: 2000 }),
    createdAt: faker.date.betweens({
      from: new Date("2024-02-01"),
      to: new Date("2024-02-26"),
    })[0],
  };
};

export const createRandomRooms = () => {
  return {
    description: faker.helpers.arrayElement([
      "classic",
      "delux",
      "suite",
      "double room",
      "west wing",
    ]),
    name: faker.number.int({ min: 1, max: 60 }),
    type: 0,
    price: faker.helpers.arrayElement([20000, 25000, 30000, 40000, 50000]),
  };
};
