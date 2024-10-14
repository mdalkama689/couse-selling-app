import { z } from 'zod'

const videoSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .min(7, { message: "Title must be at least 7 characters long" })
    .max(40, { message: "Title must not exceed 40 characters" }),
});

export default videoSchema
