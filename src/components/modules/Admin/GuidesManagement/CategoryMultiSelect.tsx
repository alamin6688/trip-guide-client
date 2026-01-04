/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/types/category.interface";
import { X } from "lucide-react";

interface CategoryMultiSelectProps {
  selectedCategoryIds: string[];
  removedCategoryIds: string[];
  currentCategoryId: string;
  availableCategories: ICategory[];
  //   availableCategories: string[];
  isEdit: boolean;
  onCurrentCategoryChange: (id: string) => void;
  onAddCategory: () => void;
  onRemoveCategory: (id: string) => void;
  getCategoryTitle: (id: string) => string;
  getNewCategories: () => string[];
}

const CategoryMultiSelect = ({
  selectedCategoryIds,
  removedCategoryIds,
  currentCategoryId,
  availableCategories,
  isEdit,
  onCurrentCategoryChange,
  onAddCategory,
  onRemoveCategory,
  getCategoryTitle,
  getNewCategories,
}: CategoryMultiSelectProps) => {
  return (
    <Field>
      <FieldLabel htmlFor="categories">Guide Categories (Required)</FieldLabel>

      {/* Hidden Inputs for Form Submission */}
      <Input
        type="hidden"
        name="categories"
        value={JSON.stringify(
          isEdit ? getNewCategories() : selectedCategoryIds
        )}
      />
      {isEdit && (
        <Input
          type="hidden"
          name="removeCategories"
          value={JSON.stringify(removedCategoryIds)}
        />
      )}

      {/* Selected Categories Display */}
      {selectedCategoryIds?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 p-3 bg-muted rounded-lg">
          {selectedCategoryIds.map((id) => (
            <Badge key={id} variant="secondary" className="px-3 py-1.5 text-sm">
              {availableCategories.find((c) => c.id === id)?.icon}{" "}
              {getCategoryTitle(id)}
              <Button
                type="button"
                variant="link"
                onClick={() => onRemoveCategory(id)}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Add Category Selector */}
      <div className="flex gap-2">
        <Select
          value={currentCategoryId}
          onValueChange={onCurrentCategoryChange}
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select a category to add" />
          </SelectTrigger>
          <SelectContent>
            {availableCategories?.length > 0 ? (
              availableCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {/* ✅ Change: show icon + title in dropdown */}
                  <span className="mr-2">{category.icon}</span>
                  {category.title}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>
                {selectedCategoryIds.length > 0
                  ? "All categories selected"
                  : "No categories available"}
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        {currentCategoryId && (
          <div className="flex items-center gap-2 px-3 py-2">
            {availableCategories.find((c) => c.id === currentCategoryId)?.icon}{" "}
            {getCategoryTitle(currentCategoryId)}
          </div>
        )}

        <Button
          type="button"
          onClick={onAddCategory}
          disabled={!currentCategoryId}
          variant="outline"
        >
          Add
        </Button>
      </div>

      <p className="text-xs text-gray-500 mt-1">
        {isEdit
          ? "Add new categories or remove existing ones"
          : "Select at least one category for the guide"}
      </p>

      {/* Edit Mode: Show Changes */}
      {isEdit && (
        <div className="mt-2 space-y-1">
          {getNewCategories()?.length > 0 && (
            <p className="text-xs text-green-600">
              ✓ Will add: {getNewCategories().map(getCategoryTitle).join(", ")}
            </p>
          )}
          {removedCategoryIds?.length > 0 && (
            <p className="text-xs text-red-600">
              ✗ Will remove:{" "}
              {removedCategoryIds.map(getCategoryTitle).join(", ")}
            </p>
          )}
        </div>
      )}
    </Field>
  );
};

export default CategoryMultiSelect;
