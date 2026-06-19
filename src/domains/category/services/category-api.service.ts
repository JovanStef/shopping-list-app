import { ApiService } from "../../shared/services";
import { ICategory } from "../models";

export class CategoryApiService extends ApiService<ICategory> {
  protected readonly collectionName = "categories";
}
