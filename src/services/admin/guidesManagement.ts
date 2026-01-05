/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IGuide } from "@/types/guide.interface";
import {
  createGuideZodSchema,
  updateGuideZodSchema,
} from "@/zod/guide.validation";

/**
 * Create a new guide
 */
export async function createGuide(_prevState: any, formData: FormData) {
  try {
    // Parse categories array from formData
    const categoriesString = formData.get("categories") as string;
    let guideCategories: { id: string }[] = [];
    if (categoriesString) {
      try {
        const parsed = JSON.parse(categoriesString);
        if (Array.isArray(parsed)) {
          guideCategories = parsed.map((c) => ({ id: String(c) }));
        }
      } catch {
        guideCategories = [];
      }
    }

    // Build validation payload
    const languagesString = formData.get("languages") as string;
    const languagesArray = languagesString
      ? languagesString.split(",").map((l) => l.trim())
      : [];

    const validationPayload: any = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      languages: languagesArray,
      contactNumber: formData.get("contactNumber") as string,
      address: (formData.get("address") as string) || "",
      gender: formData.get("gender") as "MALE" | "FEMALE",
      bio: (formData.get("bio") as string) || "",
      city: formData.get("city") as string,
      country: formData.get("country") as string,
      dailyRate: Number(formData.get("dailyRate") || 0),
      experience: Number(formData.get("experience") || 0),
      guideCategories: guideCategories.map((gc) => ({
        id: gc.id,
        // title: gc.title,
      })),
      profilePhoto: formData.get("file") as File | undefined,
      averageRating: 0,
    };

    // Validate payload using Zod
    const validatedPayload = zodValidator(
      validationPayload,
      createGuideZodSchema
    );
    if (!validatedPayload.success || !validatedPayload.data) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedPayload.errors,
      };
    }

    const data = validatedPayload.data;

    // Prepare backend payload
    const backendPayload = {
      password: data.password,
      guide: {
        name: data.name,
        email: data.email,
        languages: data.languages,
        contactNumber: data.contactNumber,
        address: data.address,
        gender: data.gender,
        bio: data.bio,
        city: data.city,
        country: data.country,
        dailyRate: data.dailyRate,
        experience: data.experience,
        guideCategories: Array.isArray(data.guideCategories)
          ? data.guideCategories.map((gc: any) => ({
              categoryId: gc.id,
            }))
          : [],
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(backendPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const response = await serverFetch.post("/user/create-guide", {
      body: newFormData,
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

/**
 * Get all categories
 */
export async function getCategories() {
  try {
    const response = await serverFetch.get("/category");
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

/**
 * Get all guides (optionally with query string)
 */
export async function getGuides(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/user/guide${queryString ? `?${queryString}` : ""}`
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

/**
 * Get a single guide by ID
 */
export async function getGuideById(id: string) {
  try {
    const response = await serverFetch.get(`/guide/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

/**
 * Update a guide
 */
export async function updateGuide(
  id: string,
  _prevState: any,
  formData: FormData
) {
  const dailyRateValue = formData.get("dailyRate");
  const experienceValue = formData.get("experience");

  const languagesString = formData.get("languages") as string;
  const languagesArray = languagesString
    ? languagesString.split(",").map((l) => l.trim())
    : [];

  const validationPayload: Partial<IGuide> = {};

  // Only include fields that have values
  const nameValue = formData.get("name") as string;
  if (nameValue) validationPayload.name = nameValue;

  const contactNumberValue = formData.get("contactNumber") as string;
  if (contactNumberValue) validationPayload.contactNumber = contactNumberValue;

  const addressValue = formData.get("address") as string;
  if (addressValue) validationPayload.address = addressValue;

  const cityValue = formData.get("city") as string;
  if (cityValue) validationPayload.city = cityValue;

  const countryValue = formData.get("country") as string;
  if (countryValue) validationPayload.country = countryValue;

  if (languagesArray.length > 0) {
    validationPayload.languages = languagesArray;
  }

  const genderValue = formData.get("gender") as string;
  if (genderValue && (genderValue === "MALE" || genderValue === "FEMALE")) {
    validationPayload.gender = genderValue as "MALE" | "FEMALE";
  }

  const bioValue = formData.get("bio") as string;
  if (bioValue) validationPayload.bio = bioValue;

  if (dailyRateValue) {
    validationPayload.dailyRate = Number(dailyRateValue);
  }

  if (experienceValue) {
    validationPayload.experience = Number(experienceValue);
  }

  // Parse new categories
  const categoriesValue = formData.get("categories") as string;
  if (categoriesValue) {
    try {
      const parsed = JSON.parse(categoriesValue);
      if (Array.isArray(parsed) && parsed.length > 0) {
        validationPayload.guideCategories = parsed.map((id) => ({ id } as any));
      }
    } catch {}
  }

  // Parse removed categories (handle separately)
  let removedCategories: string[] = [];
  const removedCategoriesValue = formData.get("removedCategories") as string;
  if (removedCategoriesValue) {
    try {
      const parsed = JSON.parse(removedCategoriesValue);
      if (Array.isArray(parsed) && parsed.length > 0) {
        removedCategories = parsed;
      }
    } catch {}
  }

  const validatedPayload = zodValidator(
    validationPayload,
    updateGuideZodSchema
  );

  if (!validatedPayload.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validatedPayload.errors,
      formData: validationPayload,
    };
  }

  // Build backend payload, including removedCategories if present
  const backendPayload = {
    ...validatedPayload.data,
    ...(removedCategories.length > 0 && { removedCategories }),
  };

  try {
    const response = await serverFetch.patch(`/update-my-profile`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendPayload),
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
      formData: validationPayload,
    };
  }
}

/**
 * Soft delete a guide
 */
export async function deleteGuide(id: string) {
  try {
    const response = await serverFetch.delete(`/user/guide/soft/${id}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

/**
 * Hard delete a guide
 */
// export async function deleteGuide(id: string) {
//   try {
//     const response = await serverFetch.delete(`/guide/${id}`);
//     const result = await response.json();
//     return result;
//   } catch (error: any) {
//     console.log(error);
//     return {
//       success: false,
//       message:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Something went wrong",
//     };
//   }
// }

export async function createCategory(_prev: any, formData: FormData) {
  try {
    const payload = {
      title: String(formData.get("title") || "")
        .trim()
        .toUpperCase(),
      icon: String(formData.get("icon") || ""),
    };

    const response = await serverFetch.post("/category", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create category",
      formData: Object.fromEntries(formData),
    };
  }
}

// export async function getCategories() {
//   try {
//     const response = await serverFetch.get("/category", {
//       cache: "force-cache",
//       next: { tags: ["categories-list"] },
//     });
//     const result = await response.json();
//     return result;
//   } catch (error: any) {
//     console.log(error);
//     return {
//       success: false,
//       message: `${
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Something went wrong"
//       }`,
//     };
//   }
// }

export async function deleteCategory(id: string) {
  try {
    const response = await serverFetch.delete(`/category/${id}`);
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to delete category",
    };
  }
}
