import { faker } from "@faker-js/faker";

export const createFakeUsers = () => {
  const gender = faker.person.sexType();
  const lastName = faker.person.lastName().toLowerCase();
  const firstName = faker.person.firstName(gender).toLowerCase();
  return {
    firstname: firstName,
    lastname: lastName,
    username: faker.internet.email({ firstName, lastName }),
    surname: faker.person.middleName(),
    password: "intell",
    password2: "intell",
    address: faker.location.streetAddress(),
    phone: faker.helpers.fromRegExp(/[080|081|090|091|070|071][0-9]{8}/),
    salary: faker.commerce.price({ min: 25000, max: 65000 }),
  };
};

export const createFakeItems = () => {
  return {
    description: faker.commerce.productName(),
    name: faker.commerce.product(),
    type: faker.commerce.productAdjective(),
    price: faker.commerce.price({ min: 2000, max: 6000 }),
    createdAt: faker.date.betweens({
      from: new Date("2024-05-01"),
      to: new Date("2024-05-26"),
    })[0],
  };
};

export const createFakeRooms = () => {
  return {
    description: faker.helpers.arrayElement([
      "classic",
      "dual classic",
      "delux",
      "dual delux",
      "suite",
      "dual suite",
      "brook suite",
      "dual double",
      "double",
      "west wing",
      "single",
      "dual single",
    ]),
    name: faker.number.int({ min: 100, max: 300 }),
    type: "room",
    status: "good",
    // type: faker.helpers.arrayElement(["room", "hall", "pool", "other"]),
    price: faker.helpers.arrayElement([20000, 25000, 30000, 40000, 50000]),
  };
};
