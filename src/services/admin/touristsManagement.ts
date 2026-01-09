/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { ITourist } from "@/types/tourist.interface";
import { updateTouristZodSchema } from "@/zod/tourist.validation";


export async function getTourists(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/user/tourist${queryString ? `?${queryString}` : ""}`
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

export async function getTouristById(id: string) {
  try {
    const response = await serverFetch.get(`/tourist/${id}`);
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

export async function deleteTourist(id: string) {
  try {
    const response = await serverFetch.delete(`/user/tourist/soft/${id}`);
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



export async function updateTourist(id: string, formData: FormData) {
  if (!formData) {
    return {
      success: false,
      message: "Form data is missing",
    };
  }

  const payload: Partial<ITourist> = {};

  // Basic fields
  const name = formData.get("name") as string;
  if (name) payload.name = name;

  const email = formData.get("email") as string;
  if (email) payload.email = email;

  const contactNumber = formData.get("contactNumber") as string;
  if (contactNumber) payload.contactNumber = contactNumber;

  const address = formData.get("address") as string;
  if (address) payload.address = address;

  const country = formData.get("country") as string;
  if (country) payload.country = country;

  // Gender (optional)
//   const gender = formData.get("gender") as string;
//   if (gender && ["MALE", "FEMALE", "OTHER"].includes(gender)) {
//     payload.gender = gender as "MALE" | "FEMALE" | "OTHER";
//   }

  // Languages (comma separated → array)
  const languagesStr = formData.get("languages") as string;
  if (languagesStr) {
    payload.languages = languagesStr
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean);
  }

  // Travel Preferences
  const travelPreferences = formData.get("travelPreferences") as string;
  if (travelPreferences) payload.travelPreferences = travelPreferences;

  // Validate payload
  const validated = zodValidator(payload, updateTouristZodSchema);
  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validated.errors,
      formData: payload,
    };
  }

  // Send update request
  try {
    const response = await serverFetch.patch(`/user/update-my-profile`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated.data),
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
      formData: payload,
    };
  }
}


