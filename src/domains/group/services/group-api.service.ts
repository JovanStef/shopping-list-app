import {
  ApiService,
  simulateHttpError,
  simulateHttpResponse,
} from "../../shared/services";
import { GroupUtilService } from "./group-util.service";
import { GroupModel, IGroup } from "../models";
import groups from "../data";

export class GroupApiService extends ApiService<IGroup> {
  protected readonly endpointUrl = "/api/groups";
  private readonly data = groups as IGroup[];
  private readonly groupUtilsService = new GroupUtilService();

  getAll(): Promise<IGroup[]> {
    return simulateHttpResponse(this.data);
  }

  async getItems({
    data,
    idMap,
    itemToGroupMap,
    error,
    loading,
  }: {
    data?: (items: IGroup[]) => void;
    idMap?: (enteties: Record<string, IGroup>) => void;
    itemToGroupMap?: (itemGroupMap: Record<string, number>) => void;
    error?: (msg: string) => void;
    loading?: (loading: boolean) => void;
  }): Promise<void> {
    try {
      const items = await simulateHttpResponse(this.data);
      const { transformedItems, enteties, indexedData } =
        this.groupUtilsService.transform<IGroup, Record<string, number>>(
          items,
          (item) => new GroupModel(item.id, item.name, item.items),
          (item, currentIndex) => {
            const map = currentIndex ?? {};
            item.items.forEach((itemId) => {
              map[itemId] = item.id;
            });
            return map;
          },
        );

      data?.(transformedItems);
      idMap?.(enteties);
      itemToGroupMap?.(indexedData ?? {});
    } catch (fetchError) {
      error?.(
        fetchError instanceof Error ? fetchError.message : String(fetchError),
      );
    } finally {
      loading?.(false);
    }
  }

  getById(id: number): Promise<IGroup> {
    const group = this.data.find((item) => item.id === id);

    if (!group) {
      return simulateHttpError(new Error("Group not found"));
    }

    return simulateHttpResponse(group);
  }

  create(payload: Omit<IGroup, "id"> | IGroup): Promise<IGroup> {
    return simulateHttpResponse({
      id: Math.max(...this.data.map((item) => item.id)) + 1,
      ...(payload as Omit<IGroup, "id">),
    });
  }

  update(id: number, payload: Partial<IGroup>): Promise<IGroup> {
    const group = this.data.find((item) => item.id === id);

    if (!group) {
      return simulateHttpError(new Error("Group not found"));
    }

    return simulateHttpResponse({ ...group, ...payload });
  }

  delete(id: number): Promise<void> {
    return simulateHttpResponse(undefined as void);
  }
}
