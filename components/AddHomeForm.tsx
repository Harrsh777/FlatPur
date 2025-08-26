"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { countries } from "@/config/countries";
import { Input } from "./ui/input";
import { categories } from "@/config/categories";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Env from "@/config/Env";
import { generateRandomNumber } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HomeSchemaType, homeSchema } from "@/validations/homeSchema";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddHomeForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]); // Array of images
  const [homeCategories, setHomeCategories] = useState<Array<string>>([]);
  const [description, setDescription] = useState("");
  const [step, setStep] = useState<number>(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    getValues,
  } = useForm<HomeSchemaType>({
    resolver: yupResolver(homeSchema),
  });

  const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages((prev) => [...prev, ...Array.from(files)]); // Append new images without replacing old ones
      setValue("images", [...images, ...Array.from(files)]); // Update form values
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index)); // Remove image by index
  };

  useEffect(() => {
    setValue("categories", homeCategories);
    setValue("description", description);
  }, [homeCategories, description]);

  const submit = async (payload: HomeSchemaType) => {
    setLoading(true);
    const imagePaths: string[] = [];
    
    for (const image of images) {
      const uniquePath = Date.now() + "_" + generateRandomNumber();
      const { data: imgData, error: imgErr } = await supabase.storage
        .from(Env.KanpurRealty_BUCKET)
        .upload(uniquePath, image);
      if (imgErr) {
        toast.error(imgErr.message, { theme: "colored" });
        setLoading(false);
        return;
      }
      imagePaths.push(imgData?.path); // Store image path
    }

    // Store home data with image paths
    const { error: homeErr } = await supabase.from("homes").insert({
      country: payload.country,
      state: payload.state,
      city: payload.city,
      title: payload.title,
      price: payload.price,
      description: payload.description,
      categories: homeCategories,
      images: imagePaths, // Store the array of image paths
    });
  
    if (homeErr) {
      toast.error(homeErr.message, { theme: "colored" });
      setLoading(false);
      return;
    }
  
    toast.success("Home added successfully!", { theme: "colored" });
    router.push("/dashboard?success=Home added successfully!");
  };

  const goNext = async () => {
    if (step === 1) {
      const valid = await trigger(["title", "country", "state", "city", "price", "sqft"]);
      if (!valid) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      const valid = await trigger(["images", "description"]);
      if (!valid) return;
      setStep(3);
      return;
    }
  };

  const goBack = () => {
    if (loading) return;
    setStep((s) => Math.max(1, s - 1));
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="mb-5">
      <ToastContainer />
      {/* Stepper */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold ${step >= s ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{s}</div>
              {s !== 3 && (
                <div className={`mx-2 h-[2px] flex-1 ${step > s ? 'bg-green-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-3 text-center text-xs sm:text-sm text-gray-600">
          <div>Basic Info</div>
          <div>Photos & Description</div>
          <div>Categories & Review</div>
        </div>
      </div>
      {step === 1 && (
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-semibold flex items-center justify-between">Basic Information <span className="text-xs text-gray-500">Step 1 of 3</span></h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="mt-5">
          <Label htmlFor="title">Title</Label>
          <Input
            placeholder="Enter title"
            id="title"
            disabled={loading}
            onChange={(e) => setValue("title", e.target.value)}
          />
          <span className="text-red-500 font-bold">
            {errors?.title?.message}
          </span>
          </div>
          <div className="mt-5">
          <Label htmlFor="countries">Countries</Label>
          <select
            className="outline-brand h-10 px-3 py-2 rounded-md w-full border"
            id="countries"
            disabled={loading}
            {...register("country")}
          >
            <option value=""> -- Select Countries --</option>
            {countries.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <span className="text-red-500 font-bold">
            {errors?.country?.message}
          </span>
          </div>
          <div className="mt-5">
          <Label htmlFor="state">State</Label>
          <Input placeholder="Enter state" id="state" disabled={loading} {...register("state")} />
          <span className="text-red-500 font-bold">
            {errors?.state?.message}
          </span>
          </div>
          <div className="mt-5">
          <Label htmlFor="city">City</Label>
          <Input placeholder="Enter city" id="city" disabled={loading} {...register("city")} />
          <span className="text-red-500 font-bold">
            {errors?.city?.message}
          </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="mt-1">
          <Label htmlFor="price">Price</Label>
          <Input
            placeholder="Enter price"
            type="text"
            id="price"
            inputMode="decimal"
            disabled={loading}
            {...register("price")}
          />
          <span className="text-red-500 font-bold">
            {errors?.price?.message}
          </span>
          </div>
          <div className="mt-1">
          <Label htmlFor="sqft">Square Feet</Label>
          <Input
            placeholder="Enter sqft"
            type="number"
            id="sqft"
            disabled={loading}
            {...register("sqft")}
          />
          <span className="text-red-500 font-bold">
            {errors?.sqft?.message}
          </span>
          </div>
        </div>
      </div>
      )}

      {step === 2 && (
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 sm:p-6 mt-5">
        <h2 className="text-lg font-semibold flex items-center justify-between">Photos <span className="text-xs text-gray-500">Step 2 of 3</span></h2>
        <div className="mt-3 text-sm text-gray-600">Max 6 images, up to 2MB each. JPG, PNG, HEIC, WEBP.</div>
        <div className="mt-5">
          <Label htmlFor="images">Images</Label>
          <Input
            type="file"
            id="images"
            multiple // Allow multiple image selection
            accept="image/*"
            disabled={loading}
            onChange={handleImages}
          />
          <span className="text-red-500 font-bold">
            {errors?.images?.message}
          </span>
        </div>
        {/* Image preview section with remove button */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square w-full overflow-hidden rounded-lg ring-1 ring-gray-200">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white h-7 w-7 rounded-full flex items-center justify-center shadow"
                onClick={() => removeImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Description</h3>
          <Label htmlFor="description">Description</Label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
          />
          <span className="text-red-500 font-bold">
            {errors?.description?.message}
          </span>
        </div>
      </div>
      )}

      {step === 3 && (
      <>
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 sm:p-6 mt-5">
          <h2 className="text-lg font-semibold flex items-center justify-between">Categories <span className="text-xs text-gray-500">Step 3 of 3</span></h2>
          <Label htmlFor="categories">Categories</Label>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((item) => (
              <label key={item.name} htmlFor={item.name} className="inline-flex items-center justify-start gap-2 rounded-lg px-3 py-2 ring-1 ring-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={homeCategories.includes(item.name)}
                  id={item.name}
                  value={item.name}
                  disabled={loading}
                  className="h-4 w-4"
                  onChange={(event) => {
                    if (event.target.checked) {
                      setHomeCategories([...homeCategories, item.name]);
                    } else {
                      setHomeCategories(
                        homeCategories.filter((cat) => cat !== event.target.value)
                      );
                    }
                  }}
                />
                <span className="text-sm font-medium">{item.name}</span>
              </label>
            ))}
          </div>
          <span className="text-red-500 font-bold mt-2">
            {errors?.categories?.message}
          </span>
        </div>

        {/* Review card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 sm:p-6 mt-5">
          <h3 className="text-lg font-semibold mb-3">Review & Submit</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Title</p>
              <p className="font-medium">{getValues("title")}</p>
            </div>
            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-medium">{getValues("city")}, {getValues("state")}, {getValues("country")}</p>
            </div>
            <div>
              <p className="text-gray-500">Price</p>
              <p className="font-medium">{getValues("price")}</p>
            </div>
            <div>
              <p className="text-gray-500">Area (sqft)</p>
              <p className="font-medium">{getValues("sqft")}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-500">Categories</p>
              <p className="font-medium">{homeCategories.join(", ") || "—"}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Button className="bg-brand w-full h-11 text-base" disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </Button>
        </div>
      </>
      )}

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          className={`rounded-lg px-4 py-2 text-sm ring-1 ring-gray-300 hover:bg-gray-50 ${step === 1 ? 'invisible' : ''}`}
        >
          Back
        </button>
        {step < 3 ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-lg bg-green-600 text-white px-5 py-2 text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            disabled={loading}
          >
            Next
          </button>
        ) : (
          <div />
        )}
      </div>
    </form>
  );
}
