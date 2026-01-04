/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import {
  createGuide,
  getCategories,
  updateGuide,
} from "@/services/admin/guidesManagement";
import { IGuide } from "@/types/guide.interface";
import { ICategory } from "@/types/category.interface";
import { useCategorySelection } from "@/hooks/CategoryHook/useCategorySelection";
import CategoryMultiSelect from "./CategoryMultiSelect";

interface IGuideFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  guide?: IGuide;
  categories: ICategory[];
}

const GuideFormDialog = ({
  open,
  onClose,
  onSuccess,
  guide,
  categories,
}: IGuideFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!guide;

  const [gender, setGender] = useState<"MALE" | "FEMALE">(
    guide?.gender || "MALE"
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    guide?.guideCategories?.map((c) => c.categoryId) || []
  );
  const [guideCategories, setGuideCategories] = useState<ICategory[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const [state, formAction, pending] = useActionState(
    isEdit ? updateGuide.bind(null, guide.id as string) : createGuide,
    null
  );

  // const [languages, setLanguages] = useState<string>(
  //   guide?.languages?.join(", ") || ""
  // );

  const handleClose = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (selectedFile) {
      setSelectedFile(null); // Clear preview
    }
    formRef.current?.reset(); // Clear form
    onClose(); // Close dialog
  };

  console.log({ state });

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const categorySelection = useCategorySelection({
    guide,
    isEdit,
    open,
  });

  const getCategoryTitle = (id: string): string => {
    return guideCategories.find((cat) => cat.id === id)?.title || "N/A";
  };

  // NEW: Fetch categories dynamically from backend
  // -------------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      if (res.success && Array.isArray(res.data)) {
        const mapped: ICategory[] = res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          icon: item.icon || "",
        }));
        setGuideCategories(mapped);
      } else {
        toast.error(res.message || "Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      if (formRef.current) {
        formRef.current.reset();
      }
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);

      if (selectedFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state, onSuccess, onClose, selectedFile]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Guide" : "Add New Guide"}</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="space-y-4">
          {/* Name */}
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="Mr. "
              defaultValue={
                state?.formData?.name || (isEdit ? guide?.name : "")
              }
            />
            <InputFieldError state={state} field="name" />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="guide@example.com"
              // defaultValue={isEdit ? doctor?.email : undefined}
              defaultValue={
                state?.formData?.email || (isEdit ? guide?.email : "")
              }
              disabled={isEdit}
            />
            <InputFieldError state={state} field="email" />
          </Field>

          {!isEdit && (
            <>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  defaultValue={state?.formData?.password || ""}
                  placeholder="Enter password"
                />
                <InputFieldError state={state} field="password" />
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  defaultValue={state?.formData?.confirmPassword || ""}
                  placeholder="Confirm password"
                />
                <InputFieldError state={state} field="confirmPassword" />
              </Field>
            </>
          )}

          {/* Gender */}
          <Field>
            <FieldLabel htmlFor="gender">Gender</FieldLabel>
            <Input
              id="gender"
              name="gender"
              placeholder="Select gender"
              defaultValue={gender}
              // defaultValue={
              //   state?.formData?.gender || (isEdit ? doctor?.gender : "")
              // }
              type="hidden"
            />
            <Select
              value={gender}
              onValueChange={(value) => setGender(value as "MALE" | "FEMALE")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectContent>
            </Select>
            <InputFieldError state={state} field="gender" />
          </Field>

          {/* Languages */}

          <Field>
            <FieldLabel htmlFor="languages">Languages</FieldLabel>
            <Textarea
              name="languages"
              placeholder="English, Bangla, Hindi"
              defaultValue={
                state?.formData?.languages ||
                (isEdit ? guide?.languages.join(", ") : "")
              }
            />
            <InputFieldError state={state} field="languages" />
          </Field>

          {/* Contact */}
          <Field>
            <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
            <Input
              id="contactNumber"
              name="contactNumber"
              placeholder="+1234567890"
              // defaultValue={doctor?.contactNumber}
              defaultValue={
                state?.formData?.contactNumber ||
                (isEdit ? guide?.contactNumber : "")
              }
            />
            <InputFieldError state={state} field="contactNumber" />
          </Field>

          {/* Location */}
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input
              id="city"
              name="city"
              placeholder="city"
              defaultValue={guide?.city}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="country">Country</FieldLabel>
            <Input
              id="country"
              name="country"
              placeholder="country"
              defaultValue={guide?.country}
            />
          </Field>

          {/* Rate */}
          <Field>
            <FieldLabel htmlFor="dailyRate">Daily Rate (USD)</FieldLabel>
            <Input
              id="dailyRate"
              name="dailyRate"
              type="number"
              placeholder="60"
              // defaultValue={isEdit ? doctor?.dailyRate : undefined}
              defaultValue={
                state?.formData?.dailyRate || (isEdit ? guide?.dailyRate : "")
              }
              min="0"
            />
            <InputFieldError state={state} field="dailyRate" />
          </Field>

          {/* Experience */}
          <Field>
            <FieldLabel htmlFor="experience">Experience (in years)</FieldLabel>
            <Input
              id="experience"
              name="experience"
              type="number"
              placeholder="5"
              // defaultValue={isEdit ? doctor?.experience : undefined}
              defaultValue={
                state?.formData?.experience || (isEdit ? guide?.experience : "")
              }
              min="0"
            />
            <InputFieldError state={state} field="experience" />
          </Field>

          {/* Bio */}
          <Field>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Short bio about the guide"
              defaultValue={state?.formData?.bio || (isEdit ? guide?.bio : "")}
            />
            <InputFieldError state={state} field="bio" />
          </Field>

          {/* Categories */}
          <CategoryMultiSelect
            selectedCategoryIds={categorySelection.selectedCategoryIds}
            removedCategoryIds={categorySelection.removedCategoryIds}
            currentCategoryId={categorySelection.currentCategoryId}
            availableCategories={guideCategories}
            getCategoryTitle={getCategoryTitle}
            isEdit={isEdit}
            onCurrentCategoryChange={categorySelection.setCurrentCategoryId}
            onAddCategory={categorySelection.handleAddCategory}
            onRemoveCategory={categorySelection.handleRemoveCategory}
            // getCategoryTitle={getCategoryTitle}
            getNewCategories={categorySelection.getNewCategories}
          />
          <InputFieldError field="categories" state={state} />

          {/* Profile Photo */}
          {!isEdit && (
            <Field>
              <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
              {selectedFile && (
                <Image
                  //get from state if available
                  src={
                    typeof selectedFile === "string"
                      ? selectedFile
                      : URL.createObjectURL(selectedFile)
                  }
                  alt="Profile Photo Preview"
                  width={50}
                  height={50}
                  className="mb-2 rounded-full"
                />
              )}
              <Input
                ref={fileInputRef}
                id="file"
                name="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a profile photo for the guide
              </p>
              <InputFieldError state={state} field="profilePhoto" />
            </Field>
          )}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : isEdit ? "Update Guide" : "Create Guide"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GuideFormDialog;
