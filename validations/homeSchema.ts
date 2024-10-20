import { bytesToMB } from "@/lib/utils";
import * as yup from "yup";

export const homeSchema = yup
  .object()
  .shape({
    title: yup.string().min(5).max(40).required(),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    price: yup
      .string()
      .required()
      .typeError("Amount should be there")
      .matches(/^\₹?\d+(\.\d{1,2})? ?[A-Za-z]*$/, "Please enter a valid price with '₹' or without."),
      sqft:yup.string().required(),
    description: yup.string().min(10).max(20000).required(),
    categories: yup
      .mixed<Array<string> | []>()
      .test(
        "categories",
        "Please select at least one category",
        (data: any) => {
          const isValid = data?.length >= 1;
          return isValid;
        }
      ),
    images: yup
      .array()
      .of(
        yup
          .mixed()
          .test("fileType", "Only JPEG or PNG images are allowed", (file: any) => {
            const isValid =
              file?.type === "image/jpeg" ||
              file?.type === "image/png" ||
              file?.type === "image/jpg" ||
              file?.type === "image/heic" ||
              file?.type === "image/webp";
            return isValid;
          })
          .test("fileSize", "Image must be less than 2 MB", (file: any) => {
            const isValid = bytesToMB(file?.size) <= 2;
            return isValid;
          })
      )
      .min(1, "You must upload at least one image.")
      .max(6, "You can upload a maximum of 6 images."),
  })
  .required();

export type HomeSchemaType = yup.InferType<typeof homeSchema>;
