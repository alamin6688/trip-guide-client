import { useEffect, useState } from "react";
import { IGuide } from "@/types/guide.interface";
import { IGuideCategory } from "@/types/guideCategory.interface";

interface UseCategorySelectionProps {
  guide?: IGuide; 
  isEdit: boolean; 
  open: boolean; 
}

interface UseCategorySelectionReturn {
  selectedCategoryIds: string[]; // Currently selected category IDs
  removedCategoryIds: string[]; // Categories removed in edit mode
  currentCategoryId: string; // Category being selected
  setCurrentCategoryId: (id: string) => void; // Setter for currentCategoryId
  handleAddCategory: () => void; // Add currentCategoryId to selected
  handleRemoveCategory: (id: string) => void; // Remove a category
  getNewCategories: () => string[]; // New categories added in edit
  getAvailableCategories: (allCategories: IGuideCategory[]) => IGuideCategory[]; // Filtered options
}

export const useCategorySelection = ({
  guide,
  isEdit,
  open,
}: UseCategorySelectionProps): UseCategorySelectionReturn => {
  // Initialize selected categories from guide if editing
  const getInitialCategoryIds = () => {
    if (isEdit && guide?.guideCategories) {
      return guide.guideCategories
        .map((gc) => gc.categoryId)
        .filter((id): id is string => !!id);
    }
    return [];
  };

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    getInitialCategoryIds
  );
  const [removedCategoryIds, setRemovedCategoryIds] = useState<string[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("");

  const handleAddCategory = () => {
    if (currentCategoryId && !selectedCategoryIds.includes(currentCategoryId)) {
      setSelectedCategoryIds([...selectedCategoryIds, currentCategoryId]);

      // If re-adding a previously removed category
      if (removedCategoryIds.includes(currentCategoryId)) {
        setRemovedCategoryIds(
          removedCategoryIds.filter((id) => id !== currentCategoryId)
        );
      }

      setCurrentCategoryId("");
    }
  };

  const handleRemoveCategory = (id: string) => {
    setSelectedCategoryIds(selectedCategoryIds.filter((catId) => catId !== id));

    // Track removed categories if in edit mode
    if (isEdit && guide?.guideCategories?.some((gc) => gc.categoryId === id)) {
      if (!removedCategoryIds.includes(id)) {
        setRemovedCategoryIds([...removedCategoryIds, id]);
      }
    }
  };

  const getNewCategories = () => {
    if (!isEdit || !guide?.guideCategories) return selectedCategoryIds;

    const originalIds = guide.guideCategories
      .map((gc) => gc.categoryId)
      .filter((id): id is string => !!id);

    return selectedCategoryIds.filter((id) => !originalIds.includes(id));
  };

  const getAvailableCategories = (allCategories: IGuideCategory[]) => {
    return allCategories.filter(
      (cat) => !selectedCategoryIds.includes(cat.categoryId)
    );
  };

  useEffect(() => {
    if (open) {
      setSelectedCategoryIds(getInitialCategoryIds());
      setRemovedCategoryIds([]);
      setCurrentCategoryId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, guide?.id]);

  return {
    selectedCategoryIds,
    removedCategoryIds,
    currentCategoryId,
    setCurrentCategoryId,
    handleAddCategory,
    handleRemoveCategory,
    getNewCategories,
    getAvailableCategories,
  };
};
