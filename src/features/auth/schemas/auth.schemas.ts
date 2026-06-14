import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Must contain uppercase, lowercase and number"),
  role: z.enum(["customer", "farmer", "admin"]),
  phoneNumber: z.string().min(10, "Phone must be at least 10 characters").max(15),
  region: z.string().min(3, "Region must be at least 3 characters"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const createProductTypeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export type CreateProductTypeFormValues = z.infer<typeof createProductTypeSchema>;

export const updateProductTypeSchema = createProductTypeSchema;

export type UpdateProductTypeFormValues = z.infer<typeof updateProductTypeSchema>;

export const createListingSchema = z.object({
  productTypeId: z.string().uuid("Select a product"),
  quantity: z.coerce.number().positive("Quantity must be positive"),
  unit: z.string().min(1, "Unit is required"),
  price: z.coerce.number().positive("Price must be positive"),
  description: z.string().min(5, "Description must be at least 5 characters"),
});

export type CreateListingFormValues = z.infer<typeof createListingSchema>;

export const updateListingSchema = z.object({
  quantity: z.coerce.number().positive().optional(),
  unit: z.string().min(1).optional(),
  price: z.coerce.number().positive().optional(),
  description: z.string().min(5).optional(),
});

export type UpdateListingFormValues = z.infer<typeof updateListingSchema>;

export const placeOrderSchema = z.object({
  listingId: z.string().uuid(),
  quantity: z.coerce.number().positive("Quantity must be positive"),
});

export type PlaceOrderFormValues = z.infer<typeof placeOrderSchema>;
