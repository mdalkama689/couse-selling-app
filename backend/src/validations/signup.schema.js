const { z } = require("zod");

const signUpSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name atleast contain 3 characters" })
    .max(30, {
      message: "Full name does not  contain more than  30 characters",
    }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

module.exports = signUpSchema;
