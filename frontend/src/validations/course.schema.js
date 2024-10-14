import { z } from "zod";

const courseSchema  = z.object({
  title: z
    .string()
    .min(10, { message: "Title must contain at least 10 characters." })
    .max(100, {
      message: "Title must not contain more than 100 characters.",
    }),
  description: z
    .string()
    .min(20, {
      message: "Course Description must contain at least 20 characters.",
    })
    .max(500, {
      message: "Course Description must not contain more than 500 characters.",
    }),
  price: z
    .string()
    .min(1, { message: "Price is required." })
    .regex(/^\d+(\.\d+)?$/, { message: "Price must be a valid number." }),
  originalPrice: z
    .string()
    .min(1, { message: "Original price is required" })
    .regex(/^\d+(\.\d+)?$/, {
      message: "Original price must be a valid number.",
    }),
  discountInPercentage: z
    .string()
    .min(1, { message: "Discount is required" })
    .regex(/^[1-9]?[0-9]{1}$|^100$/, {
      message: "Discount must be a valid percentage between 0 and 100.",
    }),
  syllabus: z.string().min(1, { message: "Syllabus is required." }), 
  
});

export default courseSchema
