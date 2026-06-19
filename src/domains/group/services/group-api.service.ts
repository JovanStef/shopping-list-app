import { ApiService } from "../../shared/services";
import { GroupUtilService } from "./group-util.service";
import { GroupModel, IGroup } from "../models";

export class GroupApiService extends ApiService<IGroup> {
  protected readonly collectionName = "groups";
  private readonly groupUtilsService = new GroupUtilService();

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
      const items = await this.getAll();
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
}
