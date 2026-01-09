/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createListing } from "@/services/admin/guidesManagement";
import { getCategories } from "@/services/admin/guidesManagement";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Category {
  id: string;
  title: string;
  icon?: string;
}

const LANGUAGE_OPTIONS = [
  "English",
  "Italian",
  "Japanese",
  "Arabic",
  "Spanish",
  "Hindi",
  "Bangla",
];

const ListingFormDialog = ({ open, onClose }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);

  const fetchCategories = async () => {
    try {
      setFetchingCategories(true);
      const res = await getCategories();
      if (res.success) {
        setCategories(res.data);
      } else {
        toast.error(res.message || "Failed to load categories");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to load categories");
    } finally {
      setFetchingCategories(false);
    }
  };

  useEffect(() => {
    if (open) fetchCategories();
  }, [open]);

   const handleLanguageToggle = (lang: string) => {
    setLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const payload = {
      title: form.title.value,
      description: form.description.value,
      itinerary: form.itinerary.value,
      price: Number(form.price.value),
      durationHours: Number(form.durationHours.value),
      meetingPoint: form.meetingPoint.value,
      maxGroupSize: Number(form.maxGroupSize.value),
      city: form.city.value,
      categoryId: form.categoryId.value,
      images: form.images.value,
      languages,
      isActive: true,
    };
    console.log(payload);

    if (
      !payload.title ||
      !payload.city ||
      !payload.categoryId ||
      !payload.meetingPoint
    ) {
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    if (!payload.images.startsWith("http")) {
      toast.error("Please provide a valid image URL");
      setLoading(false);
      return;
    }

    if (languages.length === 0) {
      toast.error("Please select at least one language");
      setLoading(false);
      return;
    }

    try {
      const res = await createListing(payload);

      if (res.success) {
        toast.success(res.message || "Listing created successfully!");
        console.log(res);
        form.reset();
        setLanguages([]);
        onClose();
        router.refresh();
      } else {
        toast.error(res.message || "Failed to create listing");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Listing</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            placeholder="Title"
            className="w-full border-2 p-2 rounded-2xl"
            required
          />
          <textarea
            name="itinerary"
            placeholder="Itinerary"
            className="w-full border-2 p-2 rounded-2xl"
            required
          />
          {/* <input
            name="images"
            type="file"
            multiple
            accept="image/*"
            className="w-full border-2 p-2 rounded-2xl"
          /> */}
          <input
            name="images"
            placeholder="Paste a valid image URL"
            className="w-full border-2 p-2 rounded-2xl"
            required
          />
          <input
            name="city"
            placeholder="City"
            className="w-full border-2 p-2 rounded-2xl"
            required
          />
          <input
            name="meetingPoint"
            placeholder="Meeting Point"
            className="w-full border-2 p-2 rounded-2xl"
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            className="w-full border-2 p-2 rounded-2xl"
            required
          />
          <input
            name="durationHours"
            type="number"
            placeholder="Duration (hours)"
            className="w-full border-2 p-2 rounded-2xl"
            required
          />
          <input
            name="maxGroupSize"
            type="number"
            placeholder="Max Group Size"
            className="w-full border-2 p-2 rounded-2xl"
            required
          />

          {/* ✅ Category select using getCategories */}
          <select
            name="categoryId"
            className="w-full border-2 p-2 rounded-2xl"
            required
            disabled={fetchingCategories}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon ? `${cat.icon} ` : ""}
                {cat.title}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border-2 p-2 rounded-2xl"
            required
          />

           <div>
            <p className="text-sm font-medium mb-2">Languages</p>
            <div className="flex flex-wrap gap-3">
              {LANGUAGE_OPTIONS.map((lang) => (
                <label key={lang} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={languages.includes(lang)}
                    onChange={() => handleLanguageToggle(lang)}
                  />
                  <span>{lang}</span>
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Listing"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ListingFormDialog;
