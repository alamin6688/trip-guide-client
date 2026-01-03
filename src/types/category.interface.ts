import { IGuideCategory } from "./guideCategory.interface";
import { IListing } from "./listing.interface";

export interface ICategory {
  id: string;
  title: string;
  icon: string;

    guideCategories?: IGuideCategory[];
  listings?: IListing[];
}