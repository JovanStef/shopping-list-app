import {
  ApiService,
  simulateHttpError,
  simulateHttpResponse,
} from "../../shared/services";
import { ICategory } from "../models";
import categories from "../data";

export class CategoryApiService extends ApiService<ICategory> {
  protected readonly endpointUrl = "/api/categories";
  private readonly data = categories as ICategory[];

  getAll(): Promise<ICategory[]> {
    return simulateHttpResponse(this.data);
  }

  getById(id: number): Promise<ICategory> {
    const category = this.data.find((item) => item.id === id);

    if (!category) {
      return simulateHttpError(new Error("Category not found"));
    }

    return simulateHttpResponse(category);
  }

  create(payload: Omit<ICategory, "id"> | ICategory): Promise<ICategory> {
    return simulateHttpResponse({
      id: Math.max(...this.data.map((item) => item.id)) + 1,
      ...(payload as Omit<ICategory, "id">),
    });
  }

  update(id: number, payload: Partial<ICategory>): Promise<ICategory> {
    const category = this.data.find((item) => item.id === id);

    if (!category) {
      return simulateHttpError(new Error("Category not found"));
    }

    return simulateHttpResponse({ ...category, ...payload });
  }

  delete(id: number): Promise<void> {
    return simulateHttpResponse(undefined as void);
  }
}
