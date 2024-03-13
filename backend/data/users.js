import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: true,
  },
  {
    name: "akuddev",
    email: "test@email.com",
    password: bcrypt.hashSync("12345678", 10),
  },
  {
    name: "John Doe",
    email: "doe@email.com",
    password: bcrypt.hashSync("12345678", 10),
  },
];

export default users;
