import { ICategory } from "./category.interface";
import { IGuide } from "./guide.interface";

export interface IGuideCategory {
  guideId: string;
  categoryId: string;

  guide?: IGuide;
  category?: ICategory;
}
